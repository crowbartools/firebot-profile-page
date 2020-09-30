import { useObserver } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";
import { useStores } from "../stores";
import { Commands } from "./Commands";
import { Tabs } from "./Tabs";

export const App: React.FC = () => {
    const { profileStore } = useStores();

    useEffect(() => {
        profileStore.getProfileData();
    }, []);

    return useObserver(() => (
        <div className="w-full h-full bg-gray-800 text-white">
            <div className="p-8 bg-gray-900">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
                            {profileStore.profileData?.owner}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <Tabs
                    activeTabIndex={profileStore.activeTabIndex}
                    onTabClick={profileStore.setActiveTabIndex}
                    config={{
                        Commands: <Commands />,
                        Quotes: <div>quotes</div>,
                    }}
                />
            </div>
        </div>
    ));
};
