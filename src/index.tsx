import * as React from "react";
import * as ReactDOM from "react-dom";

import "./index.css";

import { App } from "./components/App";
import { initialStore, Provider as StoreProvider } from "./stores";
import { ToastProvider } from "./components/Toasts";

ReactDOM.render(
    <StoreProvider value={initialStore}>
        <ToastProvider>
            <App />
        </ToastProvider>
    </StoreProvider>,
    document.getElementById("firebot-profile-app")
);
