import * as React from "react";
import * as ReactDOM from "react-dom";

import "./index.css";

import { App } from "./components/App";
import { initialStore, Provider as StoreProvider } from "./stores";

ReactDOM.render(
    <StoreProvider value={initialStore}>
        <App />
    </StoreProvider>,
    document.getElementById("firebot-profile-app")
);
