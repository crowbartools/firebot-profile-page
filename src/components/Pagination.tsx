import clsx from "clsx";
import React from "react";

const SPILL = -1;

const range = (from: number, to: number) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += 1;
    }

    return range;
};

function generatePageNumbers(totalPages: number, currentPage: number, pageNeighbors: number) {
    const totalNumbers = pageNeighbors * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
        const startPage = Math.max(2, currentPage - pageNeighbors);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);
        let pages = range(startPage, endPage);

        const hasLeftSpill = startPage > 2;
        const hasRightSpill = totalPages - endPage > 1;
        const spillOffset = totalNumbers - (pages.length + 1);

        switch (true) {
            case hasLeftSpill && !hasRightSpill: {
                const extraPages = range(startPage - spillOffset, startPage - 1);
                pages = [SPILL, ...extraPages, ...pages];
                break;
            }

            case !hasLeftSpill && hasRightSpill: {
                const extraPages = range(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, SPILL];
                break;
            }

            case hasLeftSpill && hasRightSpill:
            default: {
                pages = [SPILL, ...pages, SPILL];
                break;
            }
        }

        return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
}

interface Props {
    currentPage: number;
    pageSize: number;
    totalRecords: number;
    onPageChanged: (newPage: number) => void;
}

const NEIGHBORS = 1;

export const Pagination: React.FC<Props> = ({
    currentPage,
    pageSize,
    totalRecords,
    onPageChanged,
}) => {
    const totalPages = Math.ceil(totalRecords / pageSize);

    if (!totalRecords || totalPages === 1) return null;
    const pages = generatePageNumbers(totalPages, currentPage, NEIGHBORS);

    return (
        <div>
            <nav className="relative z-0 inline-flex shadow-sm">
                <a
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-900 bg-cool-gray-600  text-sm leading-5 font-medium text-white hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-cool-gray-500 active:text-gray-500 transition ease-in-out duration-150"
                    aria-label="Previous"
                    onClick={() => onPageChanged(Math.max(1, currentPage - 1))}
                >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </a>
                {pages.map((page, index) => {
                    if (page === SPILL) {
                        return (
                            <span
                                key={index}
                                className={clsx(
                                    "-ml-px relative inline-flex items-center px-4 py-2 border",
                                    "border-gray-900 bg-cool-gray-600 text-sm leading-5 font-medium",
                                    "text-white"
                                )}
                            >
                                ...
                            </span>
                        );
                    }
                    return (
                        <a
                            key={index}
                            onClick={() => onPageChanged(page)}
                            className={clsx(
                                "cursor-pointer hidden md:inline-flex -ml-px relative items-center",
                                "px-4 py-2 border border-gray-900 bg-cool-gray-600 text-sm leading-5",
                                "font-medium text-white hover:text-gray-500 focus:z-10 focus:outline-none",
                                "focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100",
                                "active:text-gray-700 transition ease-in-out duration-150",
                                {
                                    "border-blue-300 z-10": page === currentPage,
                                }
                            )}
                        >
                            {page}
                        </a>
                    );
                })}
                <a
                    className="cursor-pointer -ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-900 bg-cool-gray-600 text-sm leading-5 font-medium text-white hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
                    aria-label="Next"
                    onClick={() => onPageChanged(Math.min(totalPages, currentPage + 1))}
                >
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </a>
            </nav>
        </div>
    );
};