import React from 'react';
import { ArrowRight, Activity, TrendingUp, Layers, AlertCircle, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MonitoringImage from '../assets/e.png';

const StructuralMonitoring = () => {
    const navigate = useNavigate();

    const features = [
        { icon: <Activity className="w-5 h-5" />, label: "Tilt & Vibration Sensing" },
        { icon: <Layers className="w-5 h-5" />, label: "Foundation Settlement Monitoring" },
        { icon: <AlertCircle className="w-5 h-5" />, label: "Crack Detection" },
        { icon: <TrendingUp className="w-5 h-5" />, label: "Load Monitoring" },
    ];

    return (
        <section className="py-20 relative z-20 font-display bg-white dark:bg-zinc-950 transition-colors duration-500 border-t border-gray-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16">

                {/* Left Content */}
                <div className="flex-1 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wide mb-6 border border-indigo-200 dark:border-indigo-800">
                        <Building2 className="w-3 h-3" /> Smart Infrastructure
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
                        Structural & <span className="text-indigo-600 dark:text-indigo-500">Geotechnical Monitoring</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        Continuous, intelligent sensing for bridges, high-rise buildings, dams, and industrial foundations. Our systems detect tilt, vibration, and stress anomalies before they become critical failures.
                    </p>
                    <div className="text-base text-gray-500 dark:text-gray-400 mb-8 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border-l-4 border-indigo-500">
                        Fully integrable with the EQ-Alert network to provide automated structural soundness assessments post-earthquake.
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {features.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-gray-700 dark:text-gray-200 font-medium">
                                <div className="p-2 rounded-lg bg-indigo-50 dark:bg-white/5 text-indigo-600 dark:text-indigo-400">
                                    {item.icon}
                                </div>
                                {item.label}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => navigate('/solutions/structural-monitoring')}
                        className="inline-flex items-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1 group"
                    >
                        Learn more about Structural Monitoring <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Right Image */}
                <div className="flex-1 w-full max-w-xl">
                    <div className="relative group">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>

                        {/* Image Container */}
                        <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl hover:scale-[1.02] transition-transform duration-500">
                            <img
                                src={MonitoringImage}
                                alt="Structural Monitoring Dashboard"
                                className="w-full h-auto object-cover"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default StructuralMonitoring;
