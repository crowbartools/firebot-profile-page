import React from "react";
import { useObserver } from "mobx-react";
import { useStores } from "../stores";
import clsx from "clsx";
import { Pagination } from "./Pagination";

export const Commands = () => {
    const { profileStore } = useStores();
    return useObserver(() => (
        <>
            <div className="bg-gray-500 rounded-md overflow-hidden mb-16 md:mb-9">
                {profileStore.profileData &&
                    profileStore.currentCommands.map((c, i) => (
                        <div
                            key={c.trigger}
                            className={clsx("p-6", {
                                "border-t border-gray-700 border-solid": i > 0,
                            })}
                        >
                            <div className="text-xl">{c.trigger}</div>
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
