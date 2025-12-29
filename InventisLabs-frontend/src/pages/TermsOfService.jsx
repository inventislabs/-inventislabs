import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

const Section = ({ title, icon: Icon, children }) => (
    <div className="policy-section mb-12">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Icon size={20} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">{title}</h2>
        </div>
        <div className="pl-0 md:pl-13 text-gray-600 dark:text-gray-400 leading-relaxed text-lg space-y-4">
            {children}
        </div>
    </div>
);

const TermsOfService = () => {
    const containerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".policy-header", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            gsap.from(".policy-section", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.3
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-white dark:bg-black transition-colors duration-500 font-display pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">

                <div className="policy-header text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 text-xs font-semibold uppercase tracking-wide mb-6">
                        <FileText className="w-3 h-3" />
                        <span>Legal</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        Terms of Service
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        These terms constitute a legally binding agreement made between you and Inventis Labs.
                    </p>
                    <p className="mt-4 text-sm text-gray-400">
                        Last Updated: December 24, 2024
                    </p>
                </div>

                <div className="policy-content">
                    <Section title="Agreement to Terms" icon={FileText}>
                        <p>
                            We are Inventis Labs ("Company", "we", "us", "our"), a company registered in India at Tech Park, Sector 62, Noida.
                        </p>
                        <p>
                            We operate the website http://www.inventislabs.in (the "Site"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").
                        </p>
                        <p>
                            You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                        </p>
                    </Section>

                    <Section title="Intellectual Property Rights" icon={Lock}>
                        <p>
                            We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").
                        </p>
                        <p>
                            Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
                        </p>
                    </Section>

                    <Section title="User Representations" icon={ShieldCheck}>
                        <p>
                            By using the Services, you represent and warrant that:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li>All registration information you submit will be true, accurate, current, and complete.</li>
                            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                            <li>You have the legal capacity and you agree to comply with these Legal Terms.</li>
                            <li>You are not a minor in the jurisdiction in which you reside.</li>
                        </ul>
                    </Section>

                    <Section title="Prohibited Activities" icon={Eye}>
                        <p>
                            You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                        </p>
                        <p>
                            Systematic retrieval of data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us is prohibited.
                        </p>
                    </Section>

                    <Section title="Contact Us" icon={ShieldCheck}>
                        <p>
                            In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
                        </p>
                        <address className="not-italic mt-4 text-gray-500 dark:text-gray-500">
                            Inventis Labs Pvt. Ltd.<br />
                            Tech Park, Sector 62, Noida<br />
                            <a href="mailto:info@inventislabs.in" className="text-blue-600 hover:underline">info@inventislabs.in</a>
                        </address>
                    </Section>
                </div>

            </div>
        </div>
    );
};

export default TermsOfService;
