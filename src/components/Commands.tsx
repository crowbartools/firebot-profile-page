import React from "react";
import { useObserver } from "mobx-react";
import { useStores } from "../stores";
import clsx from "clsx";
import { Searchbar } from "./Searchbar";

export const Commands = () => {
    const { profileStore } = useStores();
    return useObserver(() => (
        <>
            <Searchbar onSearch={profileStore.setCommandQuery} />
            <div className="bg-gray-700 rounded-md shadow overflow-hidden mt-2">
                {profileStore.profileData &&
                    profileStore.filteredCommands.map((c, i) => (
                        <div
                            key={c.trigger}
                            className={clsx("p-3", {
                                "border-t border-gray-800": i > 0,
                            })}
                        >
                            <div className="text-xl">{c.trigger}</div>
                            <div className="font-light text-gray-300">
                                {c.description ?? "No description."}
                            </div>
                        </div>
                    ))}
            </div>
        </>
    ));
};
