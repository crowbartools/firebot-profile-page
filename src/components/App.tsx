import { useObserver } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";
import { useStores } from "../stores";
import { Commands } from "./Commands";
import { Quotes } from "./Quotes";
import { Tabs } from "./Tabs";

export const App: React.FC = () => {
    const { profileStore } = useStores();

    useEffect(() => {
        profileStore.getProfileData();
    }, []);

    return useObserver(() => (
        <div className="w-full h-full bg-gray-800 text-white px-10">
            <div className="p-8 bg-gray-900 sticky top-0 z-50">
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
                        Quotes: <Quotes />,
                    }}
                />
            </div>
        </div>
    ));
};
