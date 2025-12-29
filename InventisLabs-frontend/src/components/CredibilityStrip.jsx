import React from 'react';
import { BadgeCheck, Building2, Landmark } from 'lucide-react';

const CredibilityStrip = () => {
    return (
        <section className="bg-white dark:bg-black border-b border-gray-100 dark:border-white/5 py-8 transition-colors duration-500 font-display">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

                    {/* Item 1 */}
                    <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-1 text-gray-400 dark:text-gray-500">
                            <Building2 size={20} />
                        </div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                            Developed with research guidance from <span className="font-semibold text-gray-900 dark:text-gray-200">IIT Roorkee</span> (Earthquake Engineering).
                        </p>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-1 text-gray-400 dark:text-gray-500">
                            <BadgeCheck size={20} />
                        </div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                            Engaging with chambers and ministries on disaster resilience and early warning pilots.
                        </p>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-start gap-3">
                        <div className="shrink-0 mt-1 text-gray-400 dark:text-gray-500">
                            <Landmark size={20} />
                        </div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 leading-relaxed">
                            Aligned with <span className="font-semibold text-gray-900 dark:text-gray-200">Prime Minister’s call</span> for indigenous EEW systems (IMD 150th Foundation Day).
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CredibilityStrip;
