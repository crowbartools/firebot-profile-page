import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useHover, useWindowScroll } from "react-use";

interface Props {
    children: React.ReactElement;
    /**
     * The text shown in the tooltip
     */
    content: string | React.ReactNode;
    wrapperClassName?: string;
}

const OFFSET = 10;
const ARROW_SIZE = 10;

const placements = {
    bottom: {
        arrow: {
            borderBottom: `${ARROW_SIZE}px solid`,
            borderLeft: `${ARROW_SIZE}px solid transparent`,
            borderRight: `${ARROW_SIZE}px solid transparent`,
            left: `calc(50% - ${ARROW_SIZE}px)`,
            top: `-${ARROW_SIZE / 1.5}px`,
        },
        container: {
            left: "50%",
            top: `calc(100% + ${OFFSET}px)`,
            transform: "translateX(-50%)",
        },
    },
    top: {
        arrow: {
            borderLeft: `${ARROW_SIZE}px solid transparent`,
            borderRight: `${ARROW_SIZE}px solid transparent`,
            borderTop: `${ARROW_SIZE}px solid`,
            bottom: `-${ARROW_SIZE / 1.5}px`,
            left: `calc(50% - ${ARROW_SIZE}px)`,
        },
        container: {
            bottom: `calc(100% + ${OFFSET}px)`,
            left: "50%",
            transform: "translateX(-50%)",
        },
    },
};

export const Tooltip: React.FC<Props> = ({ children, content, wrapperClassName }) => {
    // if we don't wrap the children, useHover breaks
    // when root child is a custom component
    const target = <span>{children}</span>;
    const [hoverable, hovered] = useHover(target);

    const tooltipRef = useRef<HTMLDivElement>();

    const [placement, setPlacement] = useState<keyof typeof placements>("top");

    const { y } = useWindowScroll();

    useEffect(() => {
        setPlacement("top");
    }, [content, y]);
    useLayoutEffect(() => {
        setTimeout(() => {
            const rect = tooltipRef.current?.getBoundingClientRect();
            if (placement === "top" && hovered) {
                setPlacement(rect?.top >= 0 ? "top" : "bottom");
            }
        }, 1);
    });

    return (
        <div className={clsx("relative inline-flex", wrapperClassName)}>
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        ref={tooltipRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.1,
                        }}
                        className="absolute text-center pointer-events-none z-50 shadow-lg text-sm"
                        style={placements[placement].container}
                    >
                        <>
                            <div className="p-2 w-32 bg-blue-500 text-white rounded">{content}</div>
                            <span
                                style={placements[placement].arrow}
                                className="w-0 h-0 absolute text-blue-500"
                            />
                        </>
                    </motion.div>
                )}
            </AnimatePresence>
            {hoverable}
        </div>
    );
};
