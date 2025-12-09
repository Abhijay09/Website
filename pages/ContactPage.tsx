import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '../components/PageLayout';

// --- CONFIGURATION ---
// REPLACE THIS WITH YOUR EMAIL ADDRESS
const RECIPIENT_EMAIL = "films@miraclestar.co.in"; 
// ---------------------

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Sending data to FormSubmit.co
      const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...formData,
            _subject: `New Inquiry from ${formData.name}`, // Custom subject line
            _template: 'table' // Formats email as a nice table
        })
      });

      if (response.ok) {
          setSubmitted(true);
          // Reset form after success state is shown
          setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', company: '', message: '' });
          }, 5000);
      } else {
          setError("Something went wrong. Please try again later.");
      }
    } catch (err) {
        setError("Failed to connect. Please check your internet connection.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen w-full bg-[#F0EEE9] flex items-center relative overflow-hidden">
        
        {/* Background Decorative Blob for the Right Side */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block overflow-hidden pointer-events-none">
             <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-zinc-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
             <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-zinc-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-24 lg:py-0">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
            
            {/* --- LEFT COLUMN: COPY --- */}
            <motion.div 
              className="w-full lg:w-1/2 z-10"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-brand-dark leading-[1.1] mb-6">
                The right creative partner for your next masterpiece.
              </h1>

              <p className="text-lg md:text-xl text-brand-gray max-w-lg leading-relaxed">
                We’re experts in visual storytelling. Over the years, we’ve crafted an ecosystem tailored from concept to the silver screen.
              </p>
            </motion.div>

            {/* --- RIGHT COLUMN: FLOATING FORM CARD --- */}
            <motion.div 
              className="w-full lg:w-[45%] z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 relative">
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-brand-dark">Request a proposal</h3>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-20 text-center"
                    >
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <h4 className="text-xl font-bold text-brand-dark">Message Sent!</h4>
                      <p className="text-brand-gray mt-2">We'll be in touch within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-sm font-medium text-brand-dark mb-1.5">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent transition-all"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-brand-dark mb-1.5">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent transition-all"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-brand-dark mb-1.5">Phone <span className="text-gray-400 font-normal">(Optional)</span></label>
                            <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-brand-dark mb-1.5">Company <span className="text-gray-400 font-normal">(Optional)</span></label>
                            <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Studio Name"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent transition-all"
                            />
                        </div>
                      </div>

                      <div>
                         <label className="block text-sm font-medium text-brand-dark mb-1.5">Tell us about your project</label>
                         <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            placeholder="We are looking to produce..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-dark focus:border-transparent transition-all resize-none"
                            required
                         />
                      </div>

                      {/* Hidden Input for FormSubmit HoneyPot (Spam Protection) */}
                      <input type="text" name="_honey" style={{display: 'none'}} />

                      {error && (
                          <div className="text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg">
                              {error}
                          </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-zinc-800 transition-all transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                      >
                        {loading ? 'Sending...' : 'Send Message ->'}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ContactPage;