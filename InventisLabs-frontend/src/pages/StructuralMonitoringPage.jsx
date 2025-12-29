import React from "react";
import Footer from "../components/Footer";

const StructuralMonitoringPage = () => {
    return (
        <div className="relative min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-white transition-colors duration-500">
            <main className="pt-20">

                {/* ================= HERO ================= */}
                <section className="py-32 bg-white dark:bg-black">
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6">
                            Infrastructure Health Monitoring
                        </p>
                        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-8 leading-[0.95] tracking-tight">
                            Structural Monitoring
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                            Real-time surveillance of bridges, buildings, dams, and industrial foundations using
                            AI-powered diagnostics and predictive analytics.
                        </p>
                    </div>
                </section>

                {/* ================= WHAT IT DOES ================= */}
                <section className="py-28 bg-[#F5F5F7] dark:bg-zinc-900">
                    <div className="max-w-5xl mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-8 tracking-tight">
                            Always-On Structural Intelligence
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                            Structural Monitoring systems continuously measure vibration, strain, tilt, displacement,
                            and environmental stress across critical assets. By combining high-precision IoT sensors
                            with AI models trained on structural behavior, the system detects anomalies long before
                            visible damage appears.
                        </p>
                    </div>
                </section>

                {/* ================= USE CASES ================= */}
                <section className="py-28 bg-white dark:bg-black">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-16 tracking-tight">
                            Built for Critical Infrastructure
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {[
                                {
                                    title: "Bridges & Flyovers",
                                    desc: "Continuous vibration and load monitoring to detect fatigue, resonance, and structural stress before failure."
                                },
                                {
                                    title: "High-Rise Buildings",
                                    desc: "Foundation settlement, tilt detection, and seismic response analysis for residential and commercial towers."
                                },
                                {
                                    title: "Dams & Reservoirs",
                                    desc: "Early detection of seepage, micro-cracks, and pressure anomalies to prevent catastrophic breaches."
                                },
                                {
                                    title: "Industrial Foundations",
                                    desc: "Monitoring heavy machinery bases, refineries, and power plants exposed to cyclic loads and seismic forces."
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="border-t border-gray-200 dark:border-white/10 pt-6">
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= HOW IT WORKS ================= */}
                <section className="py-28 bg-[#F5F5F7] dark:bg-zinc-900">
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-16 tracking-tight">
                            How the System Works
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {[
                                {
                                    step: "01",
                                    title: "Edge Sensors",
                                    desc: "High-resolution accelerometers, strain gauges, and geotechnical sensors installed on structures."
                                },
                                {
                                    step: "02",
                                    title: "Secure Transmission",
                                    desc: "Resilient data pipelines stream sensor data in real time from the field."
                                },
                                {
                                    step: "03",
                                    title: "AI Analytics",
                                    desc: "Machine-learning models detect abnormal behavior and long-term degradation patterns."
                                },
                                {
                                    step: "04",
                                    title: "Actionable Alerts",
                                    desc: "Engineers receive clear alerts, health scores, and trend insights via dashboards."
                                }
                            ].map((item, idx) => (
                                <div key={idx}>
                                    <div className="text-sm text-gray-400 mb-2">{item.step}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ================= WHY IT MATTERS ================= */}
                <section className="py-28 bg-white dark:bg-black">
                    <div className="max-w-5xl mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-10 tracking-tight">
                            Why Structural Monitoring Matters
                        </h2>
                        <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
                            <li>• Prevents sudden structural failures</li>
                            <li>• Extends asset lifespan and safety margins</li>
                            <li>• Reduces manual inspection and downtime costs</li>
                            <li>• Enables predictive, evidence-based maintenance</li>
                            <li>• Improves public safety and regulatory compliance</li>
                        </ul>
                    </div>
                </section>

                {/* ================= CTA ================= */}
                <section className="py-24 bg-[#F5F5F7] dark:bg-zinc-900">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight">
                            Protect Your Infrastructure
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 font-light">
                            Get a customized monitoring solution designed for your asset type and risk profile.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="/contact"
                                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full transition-all duration-300 hover:scale-[1.02]"
                            >
                                Request Assessment
                            </a>
                            <a
                                href="/contact"
                                className="px-8 py-4 bg-transparent text-gray-900 dark:text-white font-medium rounded-full border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition-all duration-300"
                            >
                                View Case Studies
                            </a>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default StructuralMonitoringPage;
