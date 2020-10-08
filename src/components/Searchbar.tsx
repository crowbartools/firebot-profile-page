import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDebounce } from "react-use";

interface Props {
    onSearch: (query: string) => void;
}

export const Searchbar: React.FC<Props> = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    const [isFocused, setIsFocused] = useState(false);

    useDebounce(
        () => {
            setDebouncedQuery(query);
        },
        300,
        [query]
    );

    useEffect(() => {
        onSearch(debouncedQuery);
    }, [debouncedQuery]);

    const variants = {
        notFocused: { scale: 1, boxShadow: "none" },
        focused: {
            scale: 1.02,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        },
    };

    return (
        <div className="order-last">
            <motion.div
                variants={variants}
                whileHover={variants.focused}
                animate={isFocused ? "focused" : "notFocused"}
            >
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-200"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        id="search"
                        className={clsx(
                            "block w-full pl-10 pr-3 py-3 rounded-lg text-white",
                            "leading-5 bg-gray-400 placeholder-gray-200",
                            "outline-none text-base focus:shadow-focus border-none"
                        )}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search"
                        type="text"
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </div>
            </motion.div>
        </div>
    );
};
