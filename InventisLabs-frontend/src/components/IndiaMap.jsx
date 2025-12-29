import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import indiaSvgUrl from '../assets/in.svg'; // Import URL

const REGION_MAPPING = {
    "north": ["INJK", "INLA", "INPB", "INHP", "INHR", "INDL", "INUT", "INUP", "INCH"],
    "west": ["INRJ", "INGJ", "INMH", "INGA", "INDH"],
    "east": ["INBR", "INJH", "INWB", "INOR", "INSK", "INAS", "INAR", "INNL", "INMN", "INMZ", "INTR", "INML"],
    "central": ["INMP", "INCT"],
    // Southern states included for map completeness, even if not a tab
    "south": ["INAP", "INTG", "INKA", "INKL", "INTN", "INPY", "INLD", "INAN"]
};

// Map centroids for the pulsing dots (pre-calculated or approximate)
// These match the SVG's 1000x1000 coordinate space roughly
const REGION_CENTROIDS = {
    "north": { x: 350, y: 250 },
    "west": { x: 250, y: 550 },
    "east": { x: 750, y: 450 },
    "central": { x: 450, y: 500 }
};

const IndiaMap = ({ hoveredRegion }) => {
    const [svgContent, setSvgContent] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        fetch(indiaSvgUrl)
            .then(res => res.text())
            .then(text => {
                // Basic cleanup to ensure we can control size
                const cleanText = text
                    .replace(/width="[^"]*"/, 'width="100%"')
                    .replace(/height="[^"]*"/, 'height="100%"')
                    // Ensure viewBox is preserved but remove hardcoded w/h if valid
                    .replace(/style="[^"]*"/g, '');
                setSvgContent(cleanText);
            })
            .catch(err => console.error("Error loading India Map SVG:", err));
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        if (!hoveredRegion) {
            // Reset all if no region hovered
            const allPaths = containerRef.current.querySelectorAll('path');
            allPaths.forEach(p => {
                p.style.fill = '';
                p.style.filter = '';
                p.style.opacity = '';
            });
            return;
        }

        const targetIds = REGION_MAPPING[hoveredRegion] || [];
        const allPaths = containerRef.current.querySelectorAll('path');

        allPaths.forEach(path => {
            if (targetIds.includes(path.id)) {
                // Highlight color - Blue 500/600 equivalent
                path.style.fill = '#3b82f6';
                path.style.transition = 'all 0.3s ease';
                path.style.filter = 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))';
                path.style.opacity = '1';
            } else {
                // Dim others slightly
                path.style.fill = '';
                path.style.transition = 'all 0.3s ease';
                path.style.filter = '';
                path.style.opacity = '0.3';
            }
        });

    }, [hoveredRegion, svgContent]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {svgContent ? (
                <div
                    ref={containerRef}
                    className="w-full h-full [&_svg]:w-full [&_svg]:h-full [&_path]:fill-slate-300 dark:[&_path]:fill-zinc-700/50 [&_path]:stroke-white dark:[&_path]:stroke-zinc-500 [&_path]:stroke-[1.5] [&_path]:transition-all [&_path]:duration-300"
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                />
            ) : (
                <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <AnimatePresence>
                {hoveredRegion && REGION_CENTROIDS[hoveredRegion] && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute pointer-events-none"
                        style={{
                            display: 'none'
                        }}
                    >
                        <div className="relative">
                            <div className="w-4 h-4 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 z-10 relative"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-400/30 rounded-full animate-ping"></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute inset-0 pointer-events-none bg-[url('/grid.svg')] opacity-10 bg-center bg-cover mix-blend-overlay"></div>
        </div>
    );
};

export default IndiaMap;
