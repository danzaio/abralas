"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const EtherealCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* Main Cursor Dot - INSTANT */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center mix-blend-screen"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            >
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_1px_rgba(239,68,68,1)]" />
            </motion.div>

            {/* Trailing Ghost - LAGGING */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] rounded-full border border-red-500/30 bg-red-900/5 blur-[1px]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            />
        </>
    );
};
