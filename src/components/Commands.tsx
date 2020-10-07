import React from "react";
import { useObserver } from "mobx-react";
import { useStores } from "../stores";
import clsx from "clsx";
import { Pagination } from "./Pagination";
import { Tooltip } from "./Tooltip";
import { ClockIcon } from "./icons/Clock";
import { GlobeIcon } from "./icons/Globe";
import { UserIcon } from "./icons/User";
import { LockIcon } from "./icons/Lock";

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
                                <span className="font-light text-gray-200 ml-2 text-base">
                                    &#8212; {c.description ?? "No description."}
                                </span>
                            </div>
                            <div className="flex items-center text-sm mt-2">
                                {c.cooldown?.global > 0 && (
                                    <Tooltip content="Global cooldown">
                                        <span className="flex items-center mr-2">
                                            <GlobeIcon className="text-gray-200" />
                                            <span>{c.cooldown.global}s</span>
                                        </span>
                                    </Tooltip>
                                )}
                                {c.cooldown?.user > 0 && (
                                    <Tooltip content="User cooldown">
                                        <span className="flex items-center mr-2">
                                            <UserIcon className="text-gray-200" />
                                            <span>{c.cooldown.user}s</span>
                                        </span>
                                    </Tooltip>
                                )}
                                {c.permissions?.roles.length > 0 && (
                                    <Tooltip content="Permissions">
                                        <span className="flex items-center">
                                            <LockIcon className="text-gray-200 mr-1" />
                                            {c.permissions.roles.map((r) => (
                                                <span
                                                    key={r}
                                                    className="bg-gray-300 px-1 rounded mr-1 text-xs"
                                                >
                                                    {r}
                                                </span>
                                            ))}
                                        </span>
                                    </Tooltip>
                                )}
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
