import { action, computed, observable, reaction, toJS } from "mobx";
import moment from "moment";
import { ChannelInfo, ProfileData } from "../types";
import { getChannelInfo, getProfileData } from "../utils";

class ProfileStore {
    @observable profileData: ProfileData = null;
    @observable channelInfo: ChannelInfo = null;
    @observable isLoading: boolean = true;
    @observable unableToLoad: boolean = false;
    @observable activeTabIndex: number = 0;

    @observable quotesPagination = {
        currentPage: 1,
        pageSize: 10,
    };

    @observable commandsPagination = {
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

        reaction(
            () => this.commandQuery,
            () => {
                this.commandsPagination.currentPage = 1;
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
    get currentCommands() {
        const offset = (this.commandsPagination.currentPage - 1) * this.commandsPagination.pageSize;
        return this.filteredCommands.slice(offset, offset + this.commandsPagination.pageSize);
    }

    @computed({ keepAlive: true })
    get filteredQuotes() {
        const normalizedQuery = this.quoteQuery.trim().toLowerCase();
        const queryIsNum = /^\d+$/.test(normalizedQuery);
        return (
            this.profileData?.quotes.quotes.filter((c) =>
                queryIsNum
                    ? c.text.toLowerCase().includes(normalizedQuery) ||
                      c._id.toString() === normalizedQuery
                    : c.text.toLowerCase().includes(normalizedQuery) ||
                      c.originator.toLowerCase().includes(normalizedQuery) ||
                      c.game.toLowerCase().includes(normalizedQuery) ||
                      moment(c.createdAt).format("M/D/YYYY").includes(normalizedQuery)
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
    setCurrentCommandsPage(page: number) {
        this.commandsPagination.currentPage = page;
    }

    @action.bound
    setCurrentQuotesPage(page: number) {
        this.quotesPagination.currentPage = page;
    }

    @action.bound
    setProfileData(profileData: ProfileData) {
        if (profileData != null) {
            this.profileData = profileData;
            this.profileData.quotes.quotes = toJS(this.profileData.quotes.quotes).reverse();
        } else {
            this.unableToLoad = true;
        }
        this.isLoading = false;
    }

    @action.bound
    setChannelInfo(channelInfo: ChannelInfo) {
        this.channelInfo = channelInfo;
    }

    @action.bound
    getProfileData() {
        this.isLoading = true;
        this.unableToLoad = false;
        getProfileData().then((profileData) => {
            getChannelInfo(profileData.owner).then((channelInfo) => {
                this.setChannelInfo(channelInfo);
                this.setProfileData(profileData);
            });
        });
    }
}

export const profileStore = new ProfileStore();
