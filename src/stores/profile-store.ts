import { action, computed, observable } from "mobx";
import { ProfileData } from "../types";
import { getProfileData } from "../utils";

class ProfileStore {
    @observable profileData: ProfileData = null;
    @observable isLoading: boolean = false;

    @observable unableToLoad: boolean = false;

    @observable activeTabIndex: number = 0;

    @observable commandQuery: string = "";

    @action.bound
    setCommandQuery(query: string) {
        this.commandQuery = query;
    }

    @computed({ keepAlive: true })
    get filteredCommands() {
        return (
            this.profileData?.commands.allowedCmds.filter((c) =>
                c.trigger.toLowerCase().includes(this.commandQuery.toLowerCase())
            ) ?? []
        );
    }

    @action.bound
    setActiveTabIndex(index: number) {
        this.activeTabIndex = index;
    }

    @action.bound
    setProfileData(profileData: ProfileData) {
        if (profileData != null) {
            this.profileData = profileData;
        } else {
            this.unableToLoad = true;
        }
        this.isLoading = false;
    }

    @action.bound
    getProfileData() {
        if (this.isLoading) return;
        this.isLoading = true;
        this.unableToLoad = false;
        getProfileData().then((data) => {
            this.setProfileData(data);
        });
    }
}

export const profileStore = new ProfileStore();
