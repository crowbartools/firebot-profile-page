import { createContext, useContext } from "react";

import { profileStore } from "./profile-store";
import { toastStore } from "./toasts-store";

export const initialStore = {
    profileStore,
    toastStore,
};

const RootStoreContext = createContext(initialStore);

export const { Provider } = RootStoreContext;

export const useStores = () => {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error("Store was null, ensure you're within a <Provider />");
    }
    return store;
};
