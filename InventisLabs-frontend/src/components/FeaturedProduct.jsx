import React from 'react';
import { ArrowRight, Siren } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

                    {/* Optional: Add a small product image or graphic here if desired. Using a stylized icon for now. */}
                    <div className="relative w-full max-w-xs md:max-w-sm aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-8">
                        <div className="absolute inset-0 bg-orange-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                        <Siren className="w-32 h-32 text-orange-500 opacity-80" />
                        <div className="absolute bottom-6 left-6 right-6 text-center text-xs text-gray-500 font-mono">
                            Model: EQA-PRO-V2 <br /> Industrial Grade
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturedProduct;
