// VideoScrubberUltra.optimized.tsx
import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import { createPortal } from "react-dom"; // Added to render outside stacking contexts
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAME_COUNT = 447;
// --- ADJUSTED CONSTANTS FOR LONGER DURATION ---
const PIXELS_PER_UNIT = 200; 
const RELATIVE_DURATION_UNITS = 40; 
const TOTAL_SCROLL_PIXELS = RELATIVE_DURATION_UNITS * PIXELS_PER_UNIT;
const FRAME_PATH = (index: number) => `/frames/${String(index + 1).padStart(4, "0")}.webp`;

const clamp = (v: number, a = 0, b = FRAME_COUNT - 1) => Math.max(a, Math.min(b, v));

const DEFAULT_CONCURRENCY = 6;

const safeCreateImageBitmap = async (blob: Blob): Promise<ImageBitmap | undefined> => {
  // Try native createImageBitmap first
  if ((window as any).createImageBitmap) {
    try {
      return await (window as any).createImageBitmap(blob);
    } catch (e) {
      // fallthrough to img fallback
    }
  }

  // Fallback: <img> decode path
  return await new Promise<ImageBitmap | undefined>(async (resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;
    img.decoding = "async";
    try {
      await img.decode();
    } catch {
      // If decode fails, still attempt onload/onerror fallback
      await new Promise((res, rej) => {
        img.onload = () => res(null);
        img.onerror = () => rej(new Error("img load fail"));
      }).catch(() => {});
    }

    // draw to OffscreenCanvas if available (and create bitmap)
    try {
      if ((window as any).OffscreenCanvas) {
        const oc = new OffscreenCanvas(img.naturalWidth || img.width, img.naturalHeight || img.height);
        const ctx = oc.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const bmp = oc.transferToImageBitmap();
          URL.revokeObjectURL(url);
          resolve(bmp);
          return;
        }
      }

      // Last resort: draw to a normal canvas and create bitmap via convertToBlob() if available
      const c = document.createElement("canvas");
      c.width = img.naturalWidth || img.width;
      c.height = img.naturalHeight || img.height;
      const cctx = c.getContext("2d")!;
      cctx.drawImage(img, 0, 0);
      // try createImageBitmap on canvas first
      try {
        const bmp = await (window as any).createImageBitmap(c);
        URL.revokeObjectURL(url);
        resolve(bmp);
        return;
      } catch {
        // nothing else we can do
      }
    } catch (e) {
      // ignored
    } finally {
      URL.revokeObjectURL(url);
    }

    resolve(undefined);
  });
};

const VideoScrubberUltraOptimized: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // store bitmaps; always close them on cleanup
  const bitmapsRef = useRef<Array<ImageBitmap | undefined>>(new Array(FRAME_COUNT));
  const loadedSetRef = useRef<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);
  const [domReady, setDomReady] = useState(false);

  // Check if document is available for Portal
  useEffect(() => {
    setDomReady(true);
  }, []);

  // --- Disable scrolling while loading ---
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  // loader effect (concurrency-controlled)
  useEffect(() => {
    let cancelled = false;
    const controllers: AbortController[] = [];
    let inFlight = 0;
    let nextIndex = 0;
    let loadedCount = 0;
    const concurrency = DEFAULT_CONCURRENCY;

    const updateProgress = () => {
      const percent = Math.round((loadedCount / FRAME_COUNT) * 100);
      // throttle visual updates to avoid too many re-renders
      setProgress((p) => (Math.abs(p - percent) >= 1 ? percent : p));
    };

    const loadOne = async (i: number) => {
      const controller = new AbortController();
      controllers.push(controller);
      try {
        const res = await fetch(FRAME_PATH(i), { signal: controller.signal });
        if (!res.ok) throw new Error("bad response");
        const blob = await res.blob();
        if (cancelled) return;
        const bmp = await safeCreateImageBitmap(blob);
        if (cancelled) {
          if (bmp && (bmp as any).close) (bmp as any).close();
          return;
        }
        bitmapsRef.current[i] = bmp;
        if (bmp) loadedSetRef.current.add(i);
      } catch {
        // mark as attempted (keep undefined)
      } finally {
        loadedCount++;
        updateProgress();
        inFlight--;
        scheduleNext();
      }
    };

    const scheduleNext = () => {
      if (cancelled) return;
      while (inFlight < concurrency && nextIndex < FRAME_COUNT) {
        loadOne(nextIndex);
        inFlight++;
        nextIndex++;
      }

      if (loadedCount >= FRAME_COUNT) {
        // finished
        setTimeout(() => {
          if (!cancelled) {
            setLoading(false);
            setProgress(100);
          }
        }, 60);
      }
    };

    scheduleNext();

    return () => {
      cancelled = true;
      controllers.forEach((c) => c.abort());
      // close any created imagebitmaps right away and drop references
      try {
        bitmapsRef.current.forEach((b) => {
          if (b && (b as any).close) {
            try {
              (b as any).close();
            } catch {}
          }
        });
      } catch {}
      bitmapsRef.current = [];
      loadedSetRef.current.clear();
    };
  }, []);

  // useLayoutEffect for sizing so ScrollTrigger sees correct height before paint
  useLayoutEffect(() => {
    const compute = () => {
      setContainerHeight(TOTAL_SCROLL_PIXELS + window.innerHeight);
    };
    compute();

    let t: any = 0;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        compute();
      }, 120);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // main rendering + GSAP timeline
  useLayoutEffect(() => {
    if (loading) return;
    if (!canvasRef.current || !containerRef.current || !stickyRef.current) return;
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { desynchronized: true });
    if (!ctx) return;

    // DPR-correct sizing using setTransform + clear using CSS pixel coords
    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const cssW = Math.floor(window.innerWidth);
      const cssH = Math.floor(window.innerHeight);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      // set a transform so drawing coordinates are in CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let resizeTimer: any = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 120);
    };
    window.addEventListener("resize", onResize);

    // frame state and interpolation
    const frameState = { frame: 0 };
    let targetFrame = 0;
    let currentFrame = 0;
    const interpolation = 0.28; // keep but it's configurable; set to 1 for no lerp

    const findNearestBitmap = (idx: number): { bmp?: ImageBitmap; foundIndex?: number } => {
      if (bitmapsRef.current[idx]) return { bmp: bitmapsRef.current[idx], foundIndex: idx };
      // search outward but limited
      const maxLook = Math.max(12, Math.floor(FRAME_COUNT * 0.02));
      for (let d = 1; d <= maxLook; d++) {
        const b = idx - d;
        const f = idx + d;
        if (b >= 0 && bitmapsRef.current[b]) return { bmp: bitmapsRef.current[b], foundIndex: b };
        if (f < FRAME_COUNT && bitmapsRef.current[f]) return { bmp: bitmapsRef.current[f], foundIndex: f };
      }
      return { bmp: undefined };
    };

    const drawFrame = (index: number) => {
      const idx = clamp(index);
      const { bmp } = findNearestBitmap(idx);
      if (!bmp) {
        // clear full physical canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      const vw = canvas.width / (window.devicePixelRatio || 1);
      const vh = canvas.height / (window.devicePixelRatio || 1);
      const hRatio = vw / bmp.width;
      const vRatio = vh / bmp.height;
      const ratio = Math.max(hRatio, vRatio);
      const drawW = bmp.width * ratio;
      const drawH = bmp.height * ratio;
      const offsetX = (vw - drawW) / 2;
      const offsetY = (vh - drawH) / 2;

      // clearing in physical canvas coordinates
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bmp, 0, 0, bmp.width, bmp.height, offsetX, offsetY, drawW, drawH);
    };

    let rafId = 0;
    const rafLoop = () => {
      // lerp the currentFrame toward targetFrame
      currentFrame += (targetFrame - currentFrame) * interpolation;
      const frameToDraw = Math.round(currentFrame);
      drawFrame(frameToDraw);
      rafId = requestAnimationFrame(rafLoop);
    };
    rafLoop();

    // create GSAP timeline + capture its ScrollTrigger so we can kill only ours
    const totalTL = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${TOTAL_SCROLL_PIXELS}`,
        scrub: true,
        pin: stickyRef.current,
        anticipatePin: 1,
      },
    });

    const updateTarget = () => {
      targetFrame = clamp(Math.floor(frameState.frame));
    };

    totalTL.to(frameState, { 
        frame: FRAME_COUNT - 1, 
        onUpdate: updateTarget 
    });


    // ensure ScrollTrigger layout is correct (we set height earlier in useLayoutEffect)
    try {
      ScrollTrigger.refresh();
    } catch {}

    targetFrame = clamp(Math.floor(frameState.frame));
    currentFrame = targetFrame;

    canvas.style.willChange = "transform";
    canvas.style.pointerEvents = "none";

    const st = totalTL.scrollTrigger;

    return () => {
      try {
        if (totalTL) totalTL.kill();
      } catch {}
      try {
        if (st && typeof st.kill === "function") st.kill();
      } catch {}
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [loading, containerHeight]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: containerHeight ? `${containerHeight}px` : `${TOTAL_SCROLL_PIXELS + 800}px` }}
    >
      {loading && domReady && createPortal(
        // UPDATED: Used createPortal to render this directly into the body, 
        // ensuring it sits above all other stacking contexts (like headers or transforms).
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-white text-black z-[9999]">
          <div className="text-2xl font-bold mb-4">Loading Cinematic Experience...</div>
          <div className="w-1/2 max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-black"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.12 }}
            />
          </div>
        </div>,
        document.body
      )}

      <div ref={stickyRef} className="sticky top-0 w-full h-screen">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
};

export default VideoScrubberUltraOptimized;