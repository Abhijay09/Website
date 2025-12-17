import React, { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom'; // <--- Added Import
import PageLayout from '../components/PageLayout';
import { TeamMember } from '../types';
import TeamMemberDetail from '../components/TeamMemberDetails';

// --- Data with Local Images ---
const teamMembers: TeamMember[] = [
  { 
    id: 2, 
    name: 'Mayank P. Srivastava', 
    role: 'Writer – Editor – Film Director', 
    imageUrl: '/team/2.png',
    bio: `A one-man army in filmmaking, Mayank integrates all aspects of the craft with professional finesse. With over 25 years in electronic media, he left a UN position to pursue his passion, founding a production house and creating a wide range of content.\nHe has a passion for exploring new ideas and transforming them into compelling stories. He is also a guest faculty in Mass Communications at many universities, having mentored over 800 students.`,
    projects: ['Love Hackers (Crime Thriller)', 'Kala Sach – The Black Truth (Docu-drama)', 'Creative campaigns for Skill India Mission']
  },
  { 
    id: 1, 
    name: 'Brijesh Srivastava', 
    role: 'Creative & Executive Producer', 
    imageUrl: '/team/1.png',
    bio: `With a professional journey of over 20 years starting with Aaj Tak and DD News, Brijesh has a strong background in creative and managerial roles. As a founding partner at ABHILASHA GROUP, he handled major responsibilities in Editorials, Media Management, and Film Productions.\nHe has successfully managed productions in Russia, France, and Bangkok, and his work on "Aadhi Abadi" was appreciated in the Parliament of India.`,
    projects: ['LOVE HACKERS (Executive Producer)', 'Kala Sach-The Black Truth (Executive Producer)', 'TV Shows: AAP KI BAAT, BAATEIN CAREER KI', 'Campaigns for Skill India & Beti Bachayo-Beti Padayo']
  },
  { 
    id: 7, 
    name: 'Jeevesh Mukut', 
    role: 'Financial Consultant', 
    imageUrl: '/team/7.png',
    bio: `With a keen interest in Finance and Management, Jeevesh pursued his education from reputed universities in India (Christ University) and Singapore (NUS Business School). His experience in multinationals like HSBC and Welspun has equipped him with the required skillset and knowledge in the dynamic market.`,
    projects: ['Assurance Associate at PwC Singapore', 'M.Sc. Management @NUS Business School']
  },
  { 
    id: 5, 
    name: 'Abhijay Shrivastava', 
    role: 'Director: 2D & 3D Animation', 
    imageUrl: '/team/5.png',
    bio: `Abhijay is a 2D & 3D Animator and software programmer with expertise in sketching and visualization. He has created numerous published illustrations and has won three Hackathons. Currently pursuing B.Tech at Manipal University, he is the head of the Graphic Design Club and a programmer at Solocursor Studio.`,
    projects: ['Love Hackers (Lead Animator)'],
    skills: ['Blender', 'Aseprite', 'Inkscape', 'DaVinci Resolve', 'Clip Studio Paint', 'Photoshop', 'HTML', 'Java', 'JavaScript', 'Python', 'C++', 'CSS', 'C#', 'GDScript']
  },
  { 
    id: 6, 
    name: 'Lokesh Sonkar', 
    role: 'VFX Director', 
    imageUrl: '/team/6re.png',
    bio: `Lokesh has extensive experience heading VFX direction and creation at various studios. His expertise has been crucial in numerous high-profile commercials and series.`,
    projects: ['Sultan of Delhi', 'Duranga 2', 'Rocket Boys', 'Attack', 'Love Hackers (Upcoming)', 'The Privet Eye (Hollywood, Upcoming)'],
    skills: ['Autodesk MAYA/MAX', 'Arnold', 'V-Ray', 'Houdini', 'UNREAL', 'Nuke-X', 'Flame', 'AI Graphic Tools']
  },
  { 
    id: 3, 
    name: 'Rahul Desai', 
    role: 'CG / VFX Supervisor', 
    imageUrl: '/team/3re.png',
    bio: `A seasoned CG/VFX Supervisor with over 18 years of high-end experience in animation and visual effects, including AI-driven VFX integration. He has a proven expertise in overseeing all phases of production from bidding to final delivery at globally recognized studios.`,
    projects: ['Transformers: Rise of the Beasts', 'Sonic The Hedgehog 2', 'KGF', 'Pathaan', 'RRR', 'Tanhaji: The Unsung Warrior'],
    skills: ['MAYA/MAX', 'Arnold', 'V-Ray', 'Houdini', 'UNREAL', 'Nuke-X', 'Flame', 'Generative AI']
  },
  { 
    id: 4, 
    name: 'Vinod A Gundre', 
    role: 'Shoot VFX Supervisor', 
    imageUrl: '/team/4.png',
    bio: `With 20 years of experience in the field of VFX, Vinod has handled numerous jobs with reputed companies in Bollywood. He has a strong background in heading departments, quality control, client communication, and on-set shoot supervision.`,
    projects: ['Heading Roto, Paint, Match move & Compositing at various studios', 'Shoot Supervisor for numerous Bollywood Movies & Web Series'],
    skills: ['Nuke', 'Silhouette', 'Photoshop', '3D Equalizer', 'VFX Paint', 'Compositing', 'Python']
  },
];

const TeamMemberCard: React.FC<{
  member: TeamMember;
  index: number;
  onClick: () => void;
}> = ({ member, index, onClick }) => {
    
    const isOdd = index % 2 !== 0;

    const cardVariants: Variants = {
        hidden: { opacity: 0, x: isOdd ? 150 : -150, y: 150, rotateY: isOdd ? -20 : 20, rotateX: 10 },
        visible: { opacity: 1, x: 0, y: 0, rotateY: 0, rotateX: 0, transition: { type: 'spring', stiffness: 50, damping: 16, mass: 1.2 } },
    };

    return (
        <motion.div
            className="w-full max-w-sm"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            onClick={onClick}
            style={{ perspective: 800 }}
        >
            <motion.div 
                layoutId={`card-container-${member.id}`}
                className="relative group overflow-hidden rounded-lg shadow-2xl cursor-pointer bg-zinc-900"
                whileHover={{ y: -10, scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
            >
                <motion.img 
                  layoutId={`card-image-${member.id}`} 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    // Fallback if local image is not found
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500?text=Image+Not+Found';
                  }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <motion.h3 layoutId={`card-name-${member.id}`} className="text-white text-2xl font-bold">{member.name}</motion.h3>
                    <motion.p layoutId={`card-role-${member.id}`} className="text-zinc-200 text-sm mt-1">{member.role}</motion.p>
                </div>
            </motion.div>
        </motion.div>
    );
};


const TeamPage: React.FC = () => {
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const location = useLocation(); // <--- Get Router Location

    // --- HANDLE AUTOMATIC POPUP FROM HOMEPAGE ---
    useEffect(() => {
        // If state exists and has selectedMemberId
        if (location.state && location.state.selectedMemberId) {
            const memberId = location.state.selectedMemberId;
            const member = teamMembers.find(m => m.id === memberId);
            
            if (member) {
                // Slight delay to allow page transition to finish before popup
                setTimeout(() => {
                    setSelectedMember(member);
                    // Optional: Scroll the specific card into view if needed
                    // const element = document.getElementById(`member-${memberId}`);
                    // if(element) element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
            
            // Clear state so it doesn't reopen on refresh (React Router handles this automatically mostly, 
            // but replacing state is safer if you want it to be one-time)
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    useEffect(() => {
        if (selectedMember) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedMember]);

    return (
        <PageLayout>
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6 md:px-12 lg:px-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-brand-dark">
                            Our Creative Force
                        </h1>
                        <p className="text-lg md:text-xl max-w-3xl mx-auto mt-4 text-brand-gray">
                            A harmonious blend of rich experience and young technocrats, dedicated to quality and innovation.
                        </p>
                    </motion.div>
                    
                    <div className="space-y-12 md:space-y-20">
                        {/* First Row: 2 Members */}
                        <div className="flex flex-wrap justify-center gap-12">
                            {teamMembers.slice(0, 2).map((member, index) => (
                               <TeamMemberCard key={member.id} member={member} index={index} onClick={() => setSelectedMember(member)} />
                            ))}
                        </div>
                        
                        {/* Second Row: 3 Members */}
                        <div className="flex flex-wrap justify-center gap-12">
                             {teamMembers.slice(2, 5).map((member, index) => (
                               <TeamMemberCard key={member.id} member={member} index={index + 2} onClick={() => setSelectedMember(member)} />
                            ))}
                        </div>

                        {/* Third Row: 2 Members */}
                         <div className="flex flex-wrap justify-center gap-12">
                            {teamMembers.slice(5, 7).map((member, index) => (
                               <TeamMemberCard key={member.id} member={member} index={index + 5} onClick={() => setSelectedMember(member)} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedMember && (
                    <TeamMemberDetail member={selectedMember} onClose={() => setSelectedMember(null)} />
                )}
            </AnimatePresence>
        </PageLayout>
    );
};

export default TeamPage;