import React, { useEffect, useState, useRef } from "react";
import indiaSvgUrl from "../assets/in.svg";
import sensorNodes from "./sensorData";

const StructuralMonitoringMap = () => {
  const [svgContent, setSvgContent] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch(indiaSvgUrl)
      .then((res) => res.text())
      .then((text) => {
        const cleanText = text
          .replace(/width="[^"]*"/, 'width="100%"')
          .replace(/height="[^"]*"/, 'height="100%"')
          .replace(/style="[^"]*"/g, "");
        setSvgContent(cleanText);
      })
      .catch((err) => console.error("Error loading India Map SVG:", err));
  }, []);

  useEffect(() => {
    if (!containerRef.current || !svgContent) return;

    // Map sensor locations to their state IDs in the SVG
    const activeStateIds = [
      "INDL",
      "INUT",
      "INAS",
      "INML",
      "INGJ",
      "INMH",
      "INMP",
    ];

    const allPaths = containerRef.current.querySelectorAll("path");

    allPaths.forEach((path) => {
      const isActiveNode = activeStateIds.includes(path.id);

      path.style.stroke = "#3b82f6";
      path.style.strokeWidth = "2";
      path.style.transition = "all 0.3s ease";
      path.style.cursor = "pointer";

      if (isActiveNode) {
        path.style.fill = "#10b981";
      }

      // Store original fill to restore later
      const originalFill = path.style.fill;

      // Add hover listeners
      const handleMouseEnter = () => {
        path.style.fill = "#f97316"; // Orange fill on hover
        path.style.strokeWidth = "3";
        path.style.opacity = "0.8";
      };

      const handleMouseLeave = () => {
        path.style.fill = originalFill; // Reset to original fill
        path.style.strokeWidth = "2";
        path.style.opacity = isActiveNode ? "0.6" : "1";
      };

      path.addEventListener("mouseenter", handleMouseEnter);
      path.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup function
      return () => {
        path.removeEventListener("mouseenter", handleMouseEnter);
        path.removeEventListener("mouseleave", handleMouseLeave);
      };
    });
  }, [svgContent]);

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-full flex items-center justify-center">
        {svgContent ? (
          <div
            ref={containerRef}
            className="w-full h-full [&_svg]:w-full [&_svg]:h-full [&_path]:fill-slate-200 dark:[&_path]:fill-zinc-800/50 [&_path]:transition-all [&_path]:duration-300"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Enhanced Legend */}
      <div className="absolute bottom-4 right-4 bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-zinc-900/95 dark:to-zinc-800/95 backdrop-blur-md px-5 py-4 rounded-xl shadow-2xl border-2 border-gray-200/50 dark:border-zinc-700/50">
        <div className="text-xs font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          Live Monitoring Sites
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4 text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-green-200 dark:ring-green-900/50"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Active Regions
              </span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">
              {sensorNodes.length}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full ring-2 ring-orange-200 dark:ring-orange-900/50"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Hover State
              </span>
            </div>
            <span className="font-bold text-orange-600 dark:text-orange-400">
              Orange
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full ring-2 ring-blue-200 dark:ring-blue-900/50"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Total Nodes
              </span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">
              {sensorNodes.reduce((sum, node) => sum + node.nodes, 0)}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-zinc-600 to-transparent my-3"></div>

        {/* Status */}
        <div className="text-[9px] text-center text-gray-500 dark:text-gray-400 font-medium">
          Last updated:{" "}
          <span className="text-blue-600 dark:text-blue-400">Just now</span>
        </div>
      </div>
    </div>
  );
};

export default StructuralMonitoringMap;
