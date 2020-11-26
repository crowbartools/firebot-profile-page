import React from "react";
import { useObserver } from "mobx-react";
import { useStores } from "../stores";
import clsx from "clsx";
import { Pagination } from "./Pagination";
import { Tooltip } from "./Tooltip";
import { Subcommands } from "./Subcommands";
import { CooldownsAndPermissions } from "./CooldownsAndPermissions";
import { CopyButton } from "./CopyButton";

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
                                <CopyButton tooltipText="Copy command" copyText={c.trigger} />
                                <div className="font-light text-gray-200 text-sm block md:inline">
                                    <span className="hidden lg:inline-block mx-2">&#8212;</span>
                                    <span>
                                        {c.baseCommandDescription
                                            ? c.baseCommandDescription
                                            : c.description ?? "No description."}
                                    </span>
                                </div>
                            </div>
                            <CooldownsAndPermissions
                                cooldowns={c.cooldown}
                                permissions={c.permissions}
                            />
                            <Subcommands command={c} />
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
