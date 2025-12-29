import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const MarqueeRow = ({ children, direction = "left", speed = 25 }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;

        // Clone content for seamless loop
        const contentWidth = content.offsetWidth;
        const clonesNeeded = Math.ceil(window.innerWidth / contentWidth) + 2;

        // Clean up previous clones to avoid accumulation on re-renders if utilizing React Strict Mode heavily without cleanup
        // But since this is appendChild, we should be careful. 
        // A better React way is to use state for clones, but for pure DOM manipulation efficiency:
        while (container.children.length > 1) {
            container.removeChild(container.lastChild);
        }

        for (let i = 0; i < clonesNeeded; i++) {
            const clone = content.cloneNode(true);
            container.appendChild(clone);
        }

        let ctx = gsap.context(() => {
            gsap.to(container, {
                x: direction === "left" ? -contentWidth : 0,
                duration: contentWidth / speed,
                ease: "none",
                repeat: -1,
                // If moving right, we start at -contentWidth and move to 0
                // If moving left, we start at 0 and move to -contentWidth
                startAt: { x: direction === "left" ? 0 : -contentWidth },
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % contentWidth)
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [direction, speed]);

    return (
        <div className="overflow-hidden whitespace-nowrap flex w-full relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div ref={containerRef} className="flex will-change-transform">
                <div ref={contentRef} className="flex-shrink-0 flex items-center pr-8 md:pr-16">
                    {children}
                </div>
            </div>
        </div>
    );
};

// Simplified Continuous Slider Component
const ContinuousSlider = ({ children, reverse = false, duration = 40 }) => {
    const rowRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const el = rowRef.current;
            // The first child is one set of content
            const distance = -el.firstElementChild.offsetWidth;

            if (reverse) {
                gsap.set(el, { x: distance });
            }

            gsap.to(el, {
                x: reverse ? 0 : distance,
                duration: duration,
                ease: "none",
                repeat: -1
            });
        }, rowRef);
        return () => ctx.revert();
    }, [reverse, duration]);

    return (
        <div className="flex overflow-hidden relative w-full select-none" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
            <div ref={rowRef} className="flex flex-nowrap w-max will-change-transform">
                {/* 4 Copies ensures coverage for wide screens */}
                <div className="flex items-center shrink-0 pr-12 md:pr-24">{children}</div>
                <div className="flex items-center shrink-0 pr-12 md:pr-24">{children}</div>
                <div className="flex items-center shrink-0 pr-12 md:pr-24">{children}</div>
                <div className="flex items-center shrink-0 pr-12 md:pr-24">{children}</div>
            </div>
        </div>
    );
};

const TechBanner = () => {
    return (
        <section className="py-12 md:py-24 bg-white dark:bg-black overflow-hidden flex flex-col gap-10 md:gap-16 transition-colors duration-500 font-display">

            {/* Top Row - Moves Left */}
            <ContinuousSlider duration={35}>
                <span className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-500 to-gray-900 dark:from-white dark:via-gray-500 dark:to-white">
                    Real-time Detection <span className="text-blue-600 dark:text-blue-500 mx-6 md:mx-12">•</span> Instant Alerts <span className="text-blue-600 dark:text-blue-500 mx-6 md:mx-12">•</span> Mass Coverage <span className="text-blue-600 dark:text-blue-500 mx-6 md:mx-12">•</span>
                </span>
            </ContinuousSlider>

            {/* Bottom Row - Moves Right */}
            <ContinuousSlider reverse={true} duration={45}>
                <span className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-gray-900 to-gray-500 dark:from-gray-500 dark:via-white dark:to-gray-500">
                    IoT Sensors <span className="text-purple-600 dark:text-purple-500 mx-6 md:mx-12">✦</span> AI Analysis <span className="text-purple-600 dark:text-purple-500 mx-6 md:mx-12">✦</span> Critical Warning <span className="text-purple-600 dark:text-purple-500 mx-6 md:mx-12">✦</span>
                </span>
            </ContinuousSlider>

        </section>
    );
};

export default TechBanner;
