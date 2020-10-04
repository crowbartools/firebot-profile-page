import { motion, useViewportScroll } from "framer-motion";
import React from "react";

export default function ScrollIndicatorArrow() {
    const { scrollYProgress } = useViewportScroll();

    return (
        <svg
            fill="none"
            className="w-7 h-7"
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M 9 11 L 12 8 M 12 8 L 15 11 M 12 8 L 12 16"
            />
            <motion.path
                strokeWidth="1.5"
                strokeDasharray="0 1"
                style={{
                    pathLength: scrollYProgress || 0,
                }}
                d="M 12 3 C 18.928 3 23.258 10.5 19.794 16.5 C 18.187 19.285 15.215 21 12 21 C 5.072 21 0.742 13.5 4.206 7.5 C 5.813 4.715 8.785 3 12 3 Z"
            />
        </svg>
    );
}
