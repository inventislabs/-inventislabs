import React, { useRef } from 'react';
import { useInView, motion, useSpring, useTransform } from 'framer-motion';

const StatItem = ({ value, label, suffix = '', prefix = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Parse the numeric part of the value (handling numbers like "826" or "15.0")
    const numericValue = parseFloat(value.toString().replace(/[^0-9.]/g, ''));

    const count = useSpring(0, {
        stiffness: 50,
        damping: 20,
        duration: 2.5
    });

    if (isInView) {
        count.set(numericValue);
    }

    // Create a display value that blends the number with suffix/prefix
    const displayValue = useTransform(count, (latest) => {
        if (numericValue % 1 !== 0) {
            return `${prefix}${latest.toFixed(1)}${suffix}`;
        }
        return `${prefix}${Math.round(latest)}${suffix}`;
    });

    return (
        <div ref={ref} className="flex flex-col items-center text-center group">
            <div className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight transition-colors">
                <motion.span>{displayValue}</motion.span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase text-sm md:text-base transition-colors">
                {label}
            </p>
        </div>
    );
};

const Stats = () => {
    return (
        <section className="py-24 bg-gray-50 dark:bg-zinc-950 border-y border-gray-100 dark:border-white/10 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight transition-colors">
                        Making a Difference
                    </h2>
                    <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed transition-colors">
                        Our advanced warning system provides critical time to take protective action before earthquake waves arrive.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                    <StatItem
                        value={30}
                        label="Seconds of advance warning"
                    />
                    <StatItem
                        value={826}
                        suffix="+"
                        label="Sensors deployed across India"
                    />
                    <StatItem
                        value={99.9}
                        suffix="%"
                        label="Detection accuracy"
                    />
                    <StatItem
                        value={12}
                        label="States covered"
                    />
                </div>

            </div>
        </section>
    );
};

export default Stats;
