import React from 'react';
import { ArrowRight, Siren } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeroImage from '../assets/Hero.jpeg';

const FeaturedProduct = () => {
    const navigate = useNavigate();

    return (
        <section className="py-0 relative z-20 font-display">
            <div className="w-full bg-[#1d1d1f] text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">

                    <div className="flex-1 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-wide mb-6 border border-white/10">
                            <Siren className="w-3 h-3 text-orange-500" /> Flagship Product
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                            EQ-Alert: <span className="text-gray-400">Indigenous Earthquake Early Warning System</span>
                        </h2>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-xl">
                            A modular EEW kit with sensors, sirens, and control interfaces for campuses, plants, and smart cities.
                        </p>

                        <button
                            onClick={() => navigate('/solutions')}
                            className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2 group"
                        >
                            See how EQ-Alert works <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Hero Image */}
                    <div className="relative group w-full max-w-md md:max-w-lg">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-orange-500/30 blur-3xl rounded-3xl group-hover:blur-[100px] transition-all duration-500"></div>

                        {/* Image container */}
                        <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl hover:scale-105 transition-transform duration-500">
                            <img
                                src={HeroImage}
                                alt="EQ-Alert System"
                                className="w-full h-auto object-cover"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                            {/* Badge overlay */}
                            <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                                <p className="text-sm font-semibold text-white">Model: EQA-PRO-V2</p>
                                <p className="text-xs text-gray-300">Industrial Grade System</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturedProduct;
