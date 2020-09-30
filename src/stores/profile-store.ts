import { action, computed, observable } from "mobx";
import { ProfileData } from "../types";
import { getProfileData } from "../utils";

class ProfileStore {
    @observable profileData: ProfileData = null;
    @observable isLoading: boolean = false;

    @observable unableToLoad: boolean = false;

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
