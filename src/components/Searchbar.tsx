import clsx from "clsx";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDebounce } from "react-use";

interface Props {
    onSearch: (query: string) => void;
}

export const Searchbar: React.FC<Props> = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = React.useState("");

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

    return (
        <div className="flex-1 inline-flex justify-center">
            <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        id="search"
                        className={clsx(
                            "block w-full pl-10 pr-3 py-2 border border-transparent rounded-md",
                            "leading-5 bg-cool-gray-600 text-gray-300 placeholder-gray-400",
                            "focus:outline-none sm:text-sm",
                            "transition duration-150 ease-in-out"
                        )}
                        placeholder="Search"
                        type="search"
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};
