import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
    children: ReactNode;
    isOpen: boolean;
    onClickAway: () => void;
    onClose: () => void;
}

export const Modal: React.FC<Props> = ({ children, isOpen, onClickAway, onClose }) => {
    const modalRef = useRef<HTMLDivElement>();

    if (isOpen) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "unset";
    }

    const onBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!modalRef.current.contains(event.target as Node)) {
            onClickAway();
        }
    };

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ backgroundColor: "rgba(0,0,0, 0.0)" }}
                    animate={{
                        backgroundColor: "rgba(0,0,0, 0.5)",
                        transition: { duration: 0.2 },
                    }}
                    exit={{
                        backgroundColor: "rgba(0,0,0, 0.0)",
                        transition: { duration: 0.2 },
                    }}
                    className={clsx(
                        "fixed top-0 bottom-0 left-0 right-0",
                        "z-50 overflow-auto flex justify-center items-center"
                    )}
                    onClick={onBackdropClick}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: { damping: 30, stiffness: 500, type: "spring" },
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.8,
                            transition: { damping: 30, stiffness: 500, type: "spring" },
                        }}
                        className="w-96 relative shadow"
                    >
                        <div ref={modalRef} className="bg-gray-700 rounded-lg mb-10 relative">
                            <button
                                className={clsx(
                                    "bg-green-500 text-white rounded-full w-8 h-8 absolute right-0",
                                    "top-0 transform -translate-y-2 translate-x-2 hover:bg-",
                                    "flex justify-center items-center leading-none text-xl"
                                )}
                                type="button"
                                onClick={() => onClose()}
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </span>
                            </button>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
        "report-modal"
    );
};
