import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import AboutImage from '../assets/About.png';

const About = () => {
    // Parallax logic for right side visual
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yMove = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const rotateMove = useTransform(scrollYProgress, [0, 1], [0, 5]); // Reduced rotation for image

    // Smooth opacity for items
    const springConfig = { stiffness: 100, damping: 20, mass: 1 };

    const fadeInUpVariant = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    return (
        <section id="about" ref={containerRef} className="relative py-32 bg-white dark:bg-black overflow-hidden transition-colors duration-500">
            {/* Background Texture - Dot Matrix */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)', backgroundSize: '32px 32px' }}>
            </div>
            {/* Invert dots for dark mode if possible, but opacity on black bg works differently. Let's make dots white in dark mode: radial-gradient(circle at 1px 1px, currentColor 1px...) and set text color?
               Actually just swapping #000 to currentColor and adding text-black dark:text-white to container works.
               Or explicitly:
            */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:hidden"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)', backgroundSize: '32px 32px' }}>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] hidden dark:block"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={staggerContainer}
                    className="grid lg:grid-cols-2 gap-20 items-center"
                >

                    {/* Left Side - Content */}
                    <div className="relative order-2 lg:order-1">
                        <motion.div variants={fadeInUpVariant} className="inline-flex items-center gap-3 mb-8">
                            <span className="w-12 h-[2px] bg-gradient-to-r from-blue-600 to-indigo-600"></span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold uppercase tracking-widest">
                                The Inventis Difference
                            </span>
                        </motion.div>

                        <motion.h2 variants={fadeInUpVariant} className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-[1.1] tracking-tight transition-colors">
                            Pioneering <span className="text-gray-400 dark:text-gray-500">IoT Safety</span> <br />
                            For A Safer Tomorrow.
                        </motion.h2>

                        <div className="space-y-6 text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-light transition-colors">
                            <motion.p variants={fadeInUpVariant}>
                                <strong className="text-gray-900 dark:text-white font-semibold">Inventis Labs</strong> is a pioneering technology company focused on developing innovative IoT solutions that address critical safety challenges in India and beyond.
                            </motion.p>
                            <motion.p variants={fadeInUpVariant}>
                                Our team of experts combines seismology knowledge with cutting-edge IoT technology to create India's first mass earthquake early warning system.
                            </motion.p>
                            <motion.p variants={fadeInUpVariant}>
                                Founded in 2018, we're on a mission to use technology to save lives.
                            </motion.p>
                        </div>

                        <motion.div variants={fadeInUpVariant} className="grid sm:grid-cols-2 gap-6 mt-12">
                            {['Expert Team', 'Innovation'].map((title, idx) => (
                                <motion.div
                                    key={title}
                                    whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
                                    className="group relative p-8 rounded-3xl bg-gray-50/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-gray-100 dark:border-white/10 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 shadow-sm flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 transition-colors">
                                            {idx === 0 ? (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                            ) : (
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                            )}
                                        </div>
                                        <h3 className="text-gray-900 dark:text-white font-bold text-xl mb-1 transition-colors">{title}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">{idx === 0 ? "Engineers & Scientists" : "Patented Technology"}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Side - Image with Parallax */}
                    <div className="relative hidden lg:block perspective-1000 order-1 lg:order-2 h-full min-h-[500px]">
                        <motion.div
                            style={{ y: yMove, rotateY: rotateMove }}
                            className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl"
                        >
                            <img
                                src={AboutImage}
                                alt="Inventis Labs Team"
                                className="w-full h-full object-cover"
                            />
                            {/* Overlay for text readability if needed or just aesthetic tint */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-multiply" />
                        </motion.div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default About;
