import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";

const wrap = (min, max, v) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxText({ children, baseVelocity = 100 }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    // Seamless loop for 4 copies: wrap between 0% and -25%
    const x = useTransform(baseX, (v) => `${wrap(0, -25, v)}%`);

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        // Apply scroll velocity to the movement
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="parallax overflow-hidden w-full m-0 whitespace-nowrap flex flex-nowrap py-2">
            <motion.div className="scroller font-bold uppercase text-3xl sm:text-5xl md:text-7xl lg:text-8xl flex whitespace-nowrap flex-nowrap" style={{ x }}>
                <span className="block mr-8 md:mr-24">{children}</span>
                <span className="block mr-8 md:mr-24">{children}</span>
                <span className="block mr-8 md:mr-24">{children}</span>
                <span className="block mr-8 md:mr-24">{children}</span>
            </motion.div>
        </div>
    );
}

const TechBanner = () => {
    return (
        <section className="py-10 md:py-20 bg-white dark:bg-black relative overflow-hidden flex flex-col gap-6 md:gap-10 transition-colors duration-500">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white dark:from-black to-transparent z-10 transition-colors" />
                <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white dark:from-black to-transparent z-10 transition-colors" />
            </div>

            <div className="relative z-0 text-gray-900/90 dark:text-white/90 hover:text-gray-900 dark:hover:text-white transition-colors duration-500">
                <ParallaxText baseVelocity={-3}>
                    Real-time Detection <span className="text-blue-600 dark:text-blue-500 inline-block mx-2 md:mx-4">•</span> Instant Alerts <span className="text-blue-600 dark:text-blue-500 inline-block mx-2 md:mx-4">•</span> Mass Coverage <span className="text-blue-600 dark:text-blue-500 inline-block mx-2 md:mx-4">•</span>
                </ParallaxText>
            </div>

            <div className="relative z-0 text-gray-800 dark:text-gray-300 transition-colors">
                <ParallaxText baseVelocity={3}>
                    IoT Sensors <span className="text-purple-600 dark:text-purple-500 inline-block mx-2 md:mx-4">✦</span> AI Analysis <span className="text-purple-600 dark:text-purple-500 inline-block mx-2 md:mx-4">✦</span> Critical Warning <span className="text-purple-600 dark:text-purple-500 inline-block mx-2 md:mx-4">✦</span>
                </ParallaxText>
            </div>
        </section>
    );
};

export default TechBanner;
