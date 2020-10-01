import { useObserver } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";
import { useStores } from "../stores";
import { Commands } from "./Commands";
import { Quotes } from "./Quotes";
import { Searchbar } from "./Searchbar";
import { Tabs } from "./Tabs";

export const App: React.FC = () => {
    const { profileStore } = useStores();

    useEffect(() => {
        profileStore.getProfileData();
    }, []);

    return useObserver(() => (
        <div className="w-full h-full text-white">
            <div className="mb-5">
                <h2 className="text-6xl text-white leading-normal tracking-wide">
                    {profileStore.profileData?.owner}
                </h2>
            </div>
            <div>
                <Tabs
                    activeTabIndex={profileStore.activeTabIndex}
                    onTabClick={profileStore.setActiveTabIndex}
                    config={{
                        Commands: {
                            content: <Commands />,
                            searchbar: <Searchbar onSearch={profileStore.setCommandQuery} />,
                        },
                        Quotes: {
                            content: <Quotes />,
                            searchbar: <Searchbar onSearch={profileStore.setQuoteQuery} />,
                        },
                    }}
                />
            </div>
        </div>
    ));
};
