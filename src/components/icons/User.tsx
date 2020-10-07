import React from "react";
import clsx from "clsx";

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={clsx("inline-block w-4 h-4", className)}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
        </svg>
    </div>
);
