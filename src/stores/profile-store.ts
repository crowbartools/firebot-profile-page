import { action, computed, observable, reaction } from "mobx";
import { ProfileData } from "../types";
import { getProfileData } from "../utils";

class ProfileStore {
    @observable profileData: ProfileData = null;
    @observable isLoading: boolean = false;

    @observable unableToLoad: boolean = false;

    @observable activeTabIndex: number = 0;

    @observable quotesPagination = {
        currentPage: 1,
        pageSize: 10,
    };

    @observable commandQuery: string = "";
    @observable quoteQuery: string = "";

    constructor() {
        reaction(
            () => this.quoteQuery,
            () => {
                this.quotesPagination.currentPage = 1;
            }
        );
    }

    @action.bound
    setCommandQuery(query: string) {
        this.commandQuery = query;
    }

    @action.bound
    setQuoteQuery(query: string) {
        this.quoteQuery = query;
    }

    @computed({ keepAlive: true })
    get filteredCommands() {
        return (
            this.profileData?.commands.allowedCmds.filter((c) =>
                c.trigger.toLowerCase().includes(this.commandQuery.toLowerCase())
            ) ?? []
        );
    }

    @computed({ keepAlive: true })
    get filteredQuotes() {
        const normalizedQuery = this.quoteQuery.toLowerCase();
        return (
            this.profileData?.quotes.quotes.filter(
                (c) =>
                    c.text.toLowerCase().includes(normalizedQuery) ||
                    c.originator.toLowerCase().includes(normalizedQuery) ||
                    c.game.toLowerCase().includes(normalizedQuery)
            ) ?? []
        );
    }

    @computed({ keepAlive: true })
    get currentQuotes() {
        const offset = (this.quotesPagination.currentPage - 1) * this.quotesPagination.pageSize;
        return this.filteredQuotes.slice(offset, offset + this.quotesPagination.pageSize);
    }

    @action.bound
    setActiveTabIndex(index: number) {
        this.activeTabIndex = index;
    }

    @action.bound
    setCurrentQuotesPage(page: number) {
        this.quotesPagination.currentPage = page;
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
