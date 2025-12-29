import React from 'react';
import Footer from '../components/Footer';
import { Target, Users, Award, Zap, Shield, Globe, TrendingUp, Lightbulb } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-white font-display transition-colors duration-500">

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                        About InventisLabs
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
                        Indigenous deep-tech innovation meets disaster resilience engineering.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 px-6 bg-[#F5F5F7] dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
                    <div className="bg-white dark:bg-zinc-950 rounded-3xl p-10 border border-gray-200 dark:border-white/10">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6">
                            <Target className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            To democratize access to life-saving early warning technology and build a resilient India through indigenous innovation. We're committed to protecting lives and infrastructure in seismically vulnerable regions.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-950 rounded-3xl p-10 border border-gray-200 dark:border-white/10">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6">
                            <Globe className="w-7 h-7 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            To establish India as a global leader in earthquake early warning systems and structural monitoring, setting new standards for disaster preparedness in emerging economies worldwide.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                            Born from Necessity & Innovation
                        </h2>
                        <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            <p>
                                InventisLabs is not a typical Silicon Valley-style startup. We are a <span className="font-semibold text-gray-900 dark:text-white">deep-tech company rooted in Uttar Pradesh</span>, driven by the reality of India's seismic vulnerability.
                            </p>
                            <p>
                                Seeing the gaps in existing disaster management infrastructure, we set out to build a solution that is not only technologically advanced but also <span className="font-semibold text-gray-900 dark:text-white">economically viable for mass deployment</span> in Indian cities.
                            </p>
                            <p>
                                Working closely with research guidance from <span className="font-semibold text-gray-900 dark:text-white">IIT Roorkee's Earthquake Engineering experts</span>, we have developed a system that rivals global standards while being 100% indigenous.
                            </p>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-zinc-900 dark:to-blue-950/10 rounded-3xl p-10 border border-gray-200 dark:border-white/10">
                        <h3 className="text-2xl font-bold mb-8">Our Journey</h3>
                        <div className="relative border-l-2 border-gray-300 dark:border-zinc-700 space-y-10 pl-8">
                            <div className="relative">
                                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-blue-600 border-4 border-white dark:border-zinc-900"></div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">2021</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Concept & Early R&D. Validating MEMS sensor feasibility for Indian conditions.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-indigo-600 border-4 border-white dark:border-zinc-900"></div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">2023</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Field-ready prototypes & lab testing at IIT Roorkee. First successful pilot deployments.</p>
                            </div>
                            <div className="relative">
                                <div className="absolute -left-[41px] top-1 w-6 h-6 rounded-full bg-purple-600 border-4 border-white dark:border-zinc-900 animate-pulse"></div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">2024 - Present</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Commercial launch of EQ-Alert, policy engagement, and expansion to 1,300+ sensor nodes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 px-6 bg-[#F5F5F7] dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Core Values</h2>
                        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">The principles that guide everything we do.</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Safety First</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Every decision we make is driven by our commitment to protecting lives and critical infrastructure.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                                <Lightbulb className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Innovation</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                We push the boundaries of what's possible with indigenous technology and engineering excellence.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Scalability</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Building solutions that can be deployed nationwide without compromising on quality or performance.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Excellence</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                We maintain the highest standards in engineering, testing, and deployment of our systems.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Our Impact</h2>
                        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">Making India safer, one sensor at a time.</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-3xl p-8 border border-gray-200 dark:border-white/10 text-center">
                            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">1,300+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Active Sensor Nodes</div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-3xl p-8 border border-gray-200 dark:border-white/10 text-center">
                            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">4</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Seismic Regions Covered</div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-3xl p-8 border border-gray-200 dark:border-white/10 text-center">
                            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">12</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">States & UTs</div>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 rounded-3xl p-8 border border-gray-200 dark:border-white/10 text-center">
                            <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">100M+</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">People Under Coverage</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 px-6 bg-[#F5F5F7] dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Leadership Team</h2>
                        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
                            A diverse team of engineers, researchers, and innovators committed to disaster resilience.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Rahul Singh",
                                role: "Co-founder & EEW Systems Lead",
                                bio: "Ex-IoT Engineer with 8+ years in sensor networks. Leading EQ-Alert architecture and deployment strategy.",
                                icon: <Zap className="w-6 h-6" />
                            },
                            {
                                name: "Priya Sharma",
                                role: "Head of Operations",
                                bio: "Driving public-private partnerships and government liaisons. Former consultant at NITI Aayog.",
                                icon: <Users className="w-6 h-6" />
                            },
                            {
                                name: "Amit Verma",
                                role: "Lead Firmware Engineer",
                                bio: "Embedded systems expert specializing in real-time processing. IIT Roorkee alumnus with edge computing expertise.",
                                icon: <Shield className="w-6 h-6" />
                            }
                        ].map((member, i) => (
                            <div key={i} className="bg-white dark:bg-zinc-950 rounded-3xl p-8 border border-gray-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-500 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                    {member.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                                <div className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-wide mb-4">{member.role}</div>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ecosystem Section */}
            <section className="py-20 px-6 border-t border-gray-100 dark:border-white/5">
                <div className="max-w-6xl mx-auto text-center">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-12">Ecosystem & Partners</h3>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                        {/* Partner logos/text */}
                        <div className="text-2xl font-bold text-gray-300 dark:text-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">IIT Roorkee</div>
                        <div className="text-2xl font-bold text-gray-300 dark:text-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">ASSOCHAM</div>
                        <div className="text-2xl font-bold text-gray-300 dark:text-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">IIIT Lucknow</div>
                        <div className="text-2xl font-bold text-gray-300 dark:text-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">Startup India</div>
                        <div className="text-2xl font-bold text-gray-300 dark:text-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer">NDMA</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Us in Building a Safer India</h2>
                    <p className="text-xl mb-10 opacity-90">
                        Whether you're a government body, enterprise, or research institution, let's collaborate to protect lives and infrastructure.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="/contact"
                            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-xl"
                        >
                            Get in Touch
                        </a>
                        <a
                            href="/careers"
                            className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
                        >
                            Join Our Team
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutPage;
