import React from 'react';
import EarlyWarning from '../components/EarlyWarning';
import Footer from '../components/Footer';

const EQAlertPage = () => {
    return (
        <div className="relative min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-white transition-colors duration-500">
            <main className="pt-20">
                {/* Hero Section - Minimal */}
                <section className="py-32 bg-white dark:bg-black">
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
                            Earthquake Early Warning System
                        </p>
                        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-[0.95] tracking-tight">
                            EQ-Alert
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                            Seconds of advance notice to save lives and protect critical infrastructure across India's most vulnerable seismic zones.
                        </p>
                    </div>
                </section>

                {/* Main Content - EarlyWarning Component */}
                <EarlyWarning />

                {/* CTA Section - Minimal */}
                <section className="py-24 bg-[#F5F5F7] dark:bg-zinc-900">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
                            Deploy EQ-Alert
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 font-light">
                            Contact us to discuss pilot programs for your region or facility.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="/contact"
                                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full transition-all duration-300 hover:scale-[1.02]"
                            >
                                Request Pilot Program
                            </a>
                            <a
                                href="/contact"
                                className="px-8 py-4 bg-transparent text-gray-900 dark:text-white font-medium rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition-all duration-300"
                            >
                                Schedule Demo
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default EQAlertPage;
