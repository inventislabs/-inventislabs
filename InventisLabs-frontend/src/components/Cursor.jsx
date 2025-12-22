import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Cursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // Move cursor and follower
        const onMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        // Hover Effect Logic
        const onMouseEnterLink = () => setIsHovering(true);
        const onMouseLeaveLink = () => setIsHovering(false);

        // Attach event listeners to all clickable elements
        const addHoverListeners = () => {
            const clickableElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
            clickableElements.forEach(el => {
                el.addEventListener('mouseenter', onMouseEnterLink);
                el.addEventListener('mouseleave', onMouseLeaveLink);
            });
        };

        // Initial setup
        window.addEventListener('mousemove', onMouseMove);
        addHoverListeners();

        // Re-attach listeners when DOM changes (simple observer or just re-run periodically could work, but let's stick to initial + window load for now or MutationObserver if rigorous)
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
            const clickableElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
            clickableElements.forEach(el => {
                el.removeEventListener('mouseenter', onMouseEnterLink);
                el.removeEventListener('mouseleave', onMouseLeaveLink);
            });
        };
    }, []);

    useEffect(() => {
        // Animate based on hover state
        if (isHovering) {
            gsap.to(cursorRef.current, { scale: 0.5, duration: 0.2 });
            gsap.to(followerRef.current, { scale: 3, backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: 'transparent', duration: 0.2 });
        } else {
            gsap.to(cursorRef.current, { scale: 1, duration: 0.2 });
            gsap.to(followerRef.current, {
                scale: 1,
                backgroundColor: 'transparent',
                duration: 0.2,
                clearProps: 'borderColor' // Allow CSS to take over for theme switching
            });
        }
    }, [isHovering]);

    return (
        <>
            {/* Main Dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#1d1d1f] dark:bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block transition-colors duration-500" // Hidden on mobile
            />
            {/* Follower Ring */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-[#1d1d1f] dark:border-white rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-colors duration-500 hidden md:block" // Hidden on mobile
            />
        </>
    );
};

export default Cursor;
