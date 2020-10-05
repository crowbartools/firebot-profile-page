import clsx from "clsx";
import { useObserver } from "mobx-react";
import moment from "moment";
import React from "react";
import { useStores } from "../stores";
import { Pagination } from "./Pagination";
import { Tooltip } from "./Tooltip";

export const Quotes = () => {
    const { profileStore, toastStore } = useStores();
    return useObserver(() => (
        <>
            <div className="bg-gray-500 rounded-md overflow-hidden mt-2 mb-16 md:mb-9">
                {profileStore.profileData &&
                    profileStore.currentQuotes.map((q, i) => (
                        <div
                            key={q._id}
                            className={clsx("p-6", {
                                "border-t border-gray-700 border-solid": i > 0,
                            })}
                        >
                            <div className="text-2xl italic font-hairline mb-2 break-words">
                                {q.text}
                            </div>
                            <div>
                                &#8212; <span>{q.originator}</span>,{" "}
                                <span className="font-thin">
                                    {moment(q.createdAt).format("M/D/YYYY")}
                                </span>
                                <span className="text-sm text-gray-200 ml-2">({q.game})</span>
                            </div>
                            <div className="text-gray-200 tracking-wide mt-2">
                                <span>#{q._id}</span>
                                <Tooltip content="Copy quote command">
                                    <button
                                        className="ml-1 text-blue-300 hover:text-blue-700"
                                        onClick={() => {
                                            const commandToCopy = `!quote ${q._id}`;
                                            navigator.clipboard.writeText(commandToCopy);
                                            toastStore.addToast(
                                                `'${commandToCopy}' copied to the clipboard!`
                                            );
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
                            </div>
                        </div>
                    ))}
            </div>
            <div
                className="fixed flex items-center justify-center mb-8 md:mb-5 shadow-xl"
                style={{ bottom: 0, left: "50%", transform: "translateX(-50%)" }}
            >
                <Pagination
                    totalRecords={profileStore.filteredQuotes.length}
                    currentPage={profileStore.quotesPagination.currentPage}
                    pageSize={profileStore.quotesPagination.pageSize}
                    onPageChanged={profileStore.setCurrentQuotesPage}
                />
            </div>
        </>
    ));
};
