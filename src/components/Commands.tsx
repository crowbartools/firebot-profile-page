import React from "react";
import { useObserver } from "mobx-react";
import { useStores } from "../stores";
import clsx from "clsx";
import { Pagination } from "./Pagination";
import { Tooltip } from "./Tooltip";

export const Commands = () => {
    const { profileStore, toastStore } = useStores();
    return useObserver(() => (
        <>
            <div className="bg-gray-500 rounded-md mb-16 md:mb-9">
                {profileStore.profileData &&
                    profileStore.currentCommands.map((c, i) => (
                        <div
                            key={c.trigger}
                            className={clsx("p-6", {
                                "border-t border-gray-700 border-solid": i > 0,
                            })}
                        >
                            <div className="text-xl">
                                <span>{c.trigger}</span>
                                <Tooltip content="Copy command">
                                    <button
                                        className="ml-1 text-blue-300 hover:text-blue-700"
                                        onClick={() => {
                                            navigator.clipboard.writeText(c.trigger);
                                            toastStore.addToast(
                                                `'${c.trigger}' copied to the clipboard!`
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
                            <div className="font-light text-gray-200">
                                {c.description ?? "No description."}
                            </div>
                        </div>
                    ))}
            </div>
            <div
                className="fixed flex items-center justify-center mb-8 md:mb-5 shadow-xl"
                style={{ bottom: 0, left: "50%", transform: "translateX(-50%)" }}
            >
                <Pagination
                    totalRecords={profileStore.filteredCommands.length}
                    currentPage={profileStore.commandsPagination.currentPage}
                    pageSize={profileStore.commandsPagination.pageSize}
                    onPageChanged={profileStore.setCurrentCommandsPage}
                />
            </div>
        </>
    ));
};
