import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Sparkles } from 'lucide-react';
import AboutImage from '../assets/About.png';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            // Content Stagger
            tl.from(".about-content-item", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            });

            // Image Reveal
            gsap.from(imageRef.current, {
                scrollTrigger: {
                    trigger: imageRef.current,
                    start: "top 85%",
                },
                scale: 0.95,
                opacity: 0,
                duration: 1.2,
                ease: "power2.out"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={containerRef} className="relative py-24 md:py-32 bg-white dark:bg-black overflow-hidden transition-colors duration-500 font-display">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Side - Content */}
                    <div ref={contentRef} className="order-2 lg:order-1">
                        <div className="about-content-item mb-8 inline-flex items-center gap-2">
                            <span className="w-12 h-[2px] bg-blue-600 dark:bg-blue-500"></span>
                            <span className="text-blue-600 dark:text-blue-500 text-sm font-bold uppercase tracking-widest">
                                The Inventis Difference
                            </span>
                        </div>

                        <h2 className="about-content-item text-4xl md:text-6xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-8 leading-[1.05]">
                            Pioneering IoT Safety <br />
                            <span className="text-gray-500 dark:text-gray-500">For A Safer Tomorrow.</span>
                        </h2>

                        <div className="space-y-6 text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                            <p className="about-content-item">
                                <strong className="text-gray-900 dark:text-white">Inventis Labs</strong> is a pioneering technology company focused on developing innovative IoT solutions that address critical safety challenges in India and beyond.
                            </p>
                            <p className="about-content-item">
                                Our team of experts combines seismology knowledge with cutting-edge IoT technology to create India's first mass earthquake early warning system.
                            </p>
                            <p className="about-content-item">
                                Founded in 2018, we're on a mission to use technology to save lives.
                            </p>
                        </div>

                        <div className="about-content-item grid sm:grid-cols-2 gap-6 mt-12">
                            <div className="group p-6 rounded-3xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-white/10 hover:shadow-lg transition-all duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 transition-transform">
                                    <Users className="w-6 h-6" />
                                </div>
                                <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-1">Expert Team</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Engineers & Scientists</p>
                            </div>

                            <div className="group p-6 rounded-3xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-white/10 hover:shadow-lg transition-all duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center mb-4 text-amber-500 dark:text-amber-400 shadow-sm group-hover:scale-110 transition-transform">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-1">Innovation</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Patented Technology</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Image (Visible on Mobile) */}
                    <div ref={imageRef} className="order-1 lg:order-2 relative group">
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto lg:h-[600px] w-full">
                            <img
                                src={AboutImage}
                                alt="Inventis Labs Team"
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                            <div className="absolute bottom-8 left-8 text-white">
                                <p className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-80">Our People</p>
                                <h3 className="text-2xl font-bold">Inventis Labs Team</h3>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
