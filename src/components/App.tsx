import { useObserver } from "mobx-react";
import * as React from "react";
import { useEffect } from "react";
import { useStores } from "../stores";

export const App: React.FC = () => {
    const { profileStore } = useStores();

    useEffect(() => {
        profileStore.getProfileData();
    }, []);

    return useObserver(() => <div>{profileStore.profileData?.owner}</div>);
};
