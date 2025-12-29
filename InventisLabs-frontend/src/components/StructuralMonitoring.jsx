import React, { useState } from 'react';
import { Building2, Radio, CheckCircle2, TrendingUp, BarChart3, WifiOff, Smartphone } from 'lucide-react';
import IndiaMap from './IndiaMap';

const StructuralMonitoring = () => {
    const [activeTab, setActiveTab] = useState('infrastructure');

    return (
        <section className="py-24 bg-[#F5F5F7] dark:bg-zinc-900 transition-colors duration-500 font-display border-t border-gray-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6">

                {/* Intro Block */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-wide mb-6">
                        <Radio className="w-4 h-4" /> Section B
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Structural & Geotechnical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Monitoring</span>
                    </h2>

                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        Real-time health monitoring of critical infrastructure using <span className="font-semibold text-gray-900 dark:text-white">advanced IoT sensors and AI-driven analytics</span>.
                    </p>

                    <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                        Our structural monitoring systems provide continuous surveillance of bridges, buildings, dams, and industrial foundations—enabling early detection of stress, deformation, and potential failures before they become catastrophic.
                    </p>
                </div>

                {/* Map Visualization Section */}
                <div className="mb-20">
                    <div className="bg-white dark:bg-zinc-950 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden">

                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Regional Sensor Network Coverage
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">1,300+ active monitoring nodes across India</p>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                    <span className="text-gray-600 dark:text-gray-400">High Risk (Zone V)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                                    <span className="text-gray-600 dark:text-gray-400">Medium-High (Zone IV)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <span className="text-gray-600 dark:text-gray-400">Moderate (Zone III)</span>
                                </div>
                            </div>
                        </div>

                        {/* Map Container */}
                        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 rounded-2xl p-8 md:p-16 min-h-[500px] overflow-hidden">

                            {/* India Map Component */}
                            <div className="absolute inset-0 p-8">
                                <IndiaMap />
                            </div>

                            {/* Location Markers - Regional Coverage */}
                            <div className="relative z-10">

                                {/* Northern Region (Zone IV-V) - Himalayan Belt */}
                                <div className="absolute top-[15%] left-[47%] transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="relative group cursor-pointer">
                                        {/* Cluster of dots representing node density */}
                                        <div className="relative w-20 h-20 flex items-center justify-center">
                                            <div className="w-6 h-6 rounded-full bg-red-500 border-4 border-white dark:border-zinc-900 shadow-lg animate-pulse"></div>
                                            <div className="absolute top-0 right-2 w-3 h-3 rounded-full bg-red-400 border-2 border-white dark:border-zinc-900 shadow-lg animate-pulse"></div>
                                            <div className="absolute bottom-1 left-0 w-3 h-3 rounded-full bg-orange-500 border-2 border-white dark:border-zinc-900 shadow-lg animate-pulse"></div>
                                            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-orange-400 border-2 border-white dark:border-zinc-900 shadow-lg animate-pulse"></div>
                                        </div>
                                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 px-4 py-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-200 dark:border-white/10 z-50 min-w-[280px]">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">Northern Region (Zone IV-V)</p>
                                            <p className="text-xs text-red-600 dark:text-red-400 font-semibold mb-2">450+ Nodes</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">Critical coverage for the Himalayan belt, including Delhi NCR, Uttarakhand, and Himachal Pradesh.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Western Region (Zone III-IV) - Gujarat/Kutch */}
                                <div className="absolute top-[35%] left-[20%] transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="relative group cursor-pointer">
                                        {/* Cluster of dots */}
                                        <div className="relative w-20 h-20 flex items-center justify-center">
                                            <div className="w-5 h-5 rounded-full bg-orange-500 border-4 border-white dark:border-zinc-900 shadow-lg animate-pulse"></div>
                                            <div className="absolute top-1 right-1 w-3 h-3 rounded-full bg-orange-400 border-2 border-white dark:border-zinc-900 shadow-lg animate-pulse"></div>
                                            <div className="absolute bottom-2 left-1 w-3 h-3 rounded-full bg-yellow-500 border-2 border-white dark:border-zinc-900 shadow-lg"></div>
                                            <div className="absolute top-3 left-0 w-2.5 h-2.5 rounded-full bg-orange-300 border-2 border-white dark:border-zinc-900 shadow-lg animate-pulse"></div>
                                        </div>
                                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 px-4 py-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-200 dark:border-white/10 z-50 min-w-[280px]">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">Western Region (Zone III-IV)</p>
                                            <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold mb-2">350+ Nodes</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">Extensive sensor grid covering Kutch, Gujarat, extending down to Mumbai and Pune.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Eastern Region (Zone V) - Northeast (Assam/Meghalaya) */}
                                <div className="absolute top-[22%] left-[78%] transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="relative group cursor-pointer">
                                        {/* Cluster of dots */}
                                        <div className="relative w-20 h-20 flex items-center justify-center">
                                            <div className="w-5 h-5 rounded-full bg-red-500 border-4 border-white dark:border-zinc-900 shadow-lg animate-pulse"></div>
                                            <div className="absolute top-0 right-1 w-3 h-3 rounded-full bg-red-400 border-2 border-white dark:border-zinc-900 shadow-lg animate-pulse"></div>
                                            <div className="absolute bottom-1 left-2 w-3 h-3 rounded-full bg-red-500 border-2 border-white dark:border-zinc-900 shadow-lg animate-pulse"></div>
                                            <div className="absolute top-2 left-0 w-2.5 h-2.5 rounded-full bg-red-400 border-2 border-white dark:border-zinc-900 shadow-lg animate-pulse"></div>
                                        </div>
                                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 px-4 py-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-200 dark:border-white/10 z-50 min-w-[280px]">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">Eastern Region (Zone V)</p>
                                            <p className="text-xs text-red-600 dark:text-red-400 font-semibold mb-2">300+ Nodes</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">High-density deployment in Assam, Meghalaya, and the Shillong Plateau.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Central Region (Zone III) - MP/Maharashtra Border */}
                                <div className="absolute top-[50%] left-[42%] transform -translate-x-1/2 -translate-y-1/2">
                                    <div className="relative group cursor-pointer">
                                        {/* Cluster of dots */}
                                        <div className="relative w-16 h-16 flex items-center justify-center">
                                            <div className="w-4 h-4 rounded-full bg-yellow-500 border-3 border-white dark:border-zinc-900 shadow-lg"></div>
                                            <div className="absolute top-0 right-1 w-2.5 h-2.5 rounded-full bg-yellow-400 border-2 border-white dark:border-zinc-900 shadow-lg"></div>
                                            <div className="absolute bottom-1 left-0 w-2.5 h-2.5 rounded-full bg-yellow-500 border-2 border-white dark:border-zinc-900 shadow-lg"></div>
                                        </div>
                                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 px-4 py-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-200 dark:border-white/10 z-50 min-w-[280px]">
                                            <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">Central Region (Zone III)</p>
                                            <p className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold mb-2">200+ Nodes</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">Monitoring the Narmada-Son lineament and seismically active zones in MP/Maharashtra border.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Stats Overlay */}
                            <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-white/10 shadow-lg">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">1,300+</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Total Nodes</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">4</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">Regions</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">59%</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">India Coverage</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Architecture Illustration */}
                <div className="mb-20">
                    <div className="bg-gradient-to-br from-white to-indigo-50/30 dark:from-zinc-800 dark:to-indigo-950/20 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/10 shadow-xl">

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            System Architecture
                        </h3>

                        {/* Flow Visualization - Single Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative">

                            {/* Connecting Line (hidden on mobile) */}
                            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700 -translate-y-1/2 z-0" style={{ top: '60px' }} />

                            {/* Step 1: Smart Sensors */}
                            <div className="relative z-10">
                                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border border-indigo-200 dark:border-indigo-900/30 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-4 mx-auto">
                                        <Radio className="w-7 h-7 text-white" />
                                    </div>
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1 text-center">Smart Sensors</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                                        Vibration & Strain Gauges
                                    </p>
                                </div>
                            </div>

                            {/* Step 2: Real-Time Analytics */}
                            <div className="relative z-10">
                                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border border-purple-200 dark:border-purple-900/30 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 mx-auto">
                                        <BarChart3 className="w-7 h-7 text-white" />
                                    </div>
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1 text-center">Real-Time Analytics</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                                        AI-Powered Diagnostics
                                    </p>
                                </div>
                            </div>

                            {/* Step 3: Alert Dashboard */}
                            <div className="relative z-10">
                                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border border-pink-200 dark:border-pink-900/30 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-4 mx-auto">
                                        <Smartphone className="w-7 h-7 text-white" />
                                    </div>
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1 text-center">Alert Dashboard</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                                        Web & Mobile Interface
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-gray-100 dark:bg-zinc-900 rounded-2xl p-2 gap-2 border border-gray-200 dark:border-white/10">
                        <button
                            onClick={() => setActiveTab('infrastructure')}
                            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'infrastructure'
                                ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-lg'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <Building2 className="w-4 h-4" />
                            For Infrastructure & Public Works
                        </button>
                        <button
                            onClick={() => setActiveTab('industrial')}
                            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'industrial'
                                ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-lg'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <TrendingUp className="w-4 h-4" />
                            For Industrial Facilities
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="max-w-5xl mx-auto">
                    {activeTab === 'infrastructure' && (
                        <div className="bg-gradient-to-br from-white to-indigo-50/30 dark:from-zinc-900 dark:to-indigo-950/10 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/10 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    Infrastructure & Public Works
                                </h3>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Monitor the structural health of bridges, flyovers, tunnels, dams, and public buildings with 24/7 automated surveillance.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Bridge & Flyover Monitoring</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Track vibrations, load stress, and structural deformation in real-time to prevent collapses.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">High-Rise Building Health</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Continuous assessment of foundation settlement, tilt, and structural integrity for skyscrapers.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Dam & Reservoir Safety</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Sensor networks for early detection of seepage, cracks, and pressure anomalies.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Predictive Maintenance Alerts</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">AI-driven forecasting of maintenance needs based on sensor trend analysis.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'industrial' && (
                        <div className="bg-gradient-to-br from-white to-purple-50/30 dark:from-zinc-900 dark:to-purple-950/10 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/10 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    Industrial Facilities
                                </h3>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Ensure the reliability of industrial foundations, machinery, and geotechnical structures with continuous monitoring solutions.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Foundation Settlement Tracking</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Monitor soil subsidence and foundation shifts for heavy industrial plants and refineries.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Machinery Vibration Analysis</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Detect abnormal vibrations in rotating equipment to prevent failures and downtime.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Geotechnical Slope Monitoring</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Real-time surveillance of slopes, embankments, and retaining walls near mining sites.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Environmental Stress Tracking</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Assess impact of temperature, humidity, and external loads on structural components.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default StructuralMonitoring;
