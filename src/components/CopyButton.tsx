import React from "react";
import { useStores } from "../stores";
import { Tooltip } from "./Tooltip";

export const CopyButton: React.FC<{ tooltipText: string; copyText: string }> = ({
    tooltipText,
    copyText,
}) => {
    const { toastStore } = useStores();
    return (
        <Tooltip content={tooltipText}>
            <button
                className="ml-1 text-blue-300 hover:text-blue-700"
                onClick={() => {
                    navigator.clipboard.writeText(copyText);
                    toastStore.addToast(`'${copyText}' copied to the clipboard!`);
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                </svg>
            </button>
        </Tooltip>
    );
};
