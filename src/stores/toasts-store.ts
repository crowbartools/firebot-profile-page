import { action, observable } from "mobx";
import { v4 as uuid } from "uuid";

type Appearance = "error" | "success";

export type Options = {
    appearance: Appearance;
    autoDismiss?: boolean;
    autoDismissTimeout?: number;
};

export type Toast = Options & {
    appearance: Appearance;
    id: string;
    message: string;
};

class ToastStore {
    @observable toasts: Toast[] = [];

    @action.bound
    addToast(message: string, options?: Options) {
        const defaultOptions: Options = {
            appearance: "success",
            autoDismiss: true,
        };

        options = options ?? defaultOptions;

        const id = uuid();

        // update the toast stack
        const newToast = { id, message, ...(options ?? defaultOptions) };

        this.toasts.push(newToast);

        if (this.toasts.length > 3) {
            this.toasts.shift();
        }

        if (options.autoDismiss) {
            setTimeout(() => {
                this.removeToast(id);
            }, options.autoDismissTimeout ?? 5000);
        }
    }

    @action.bound
    removeToast(id: string) {
        const index = this.toasts.findIndex((t) => t.id === id);
        if (index > -1) {
            this.toasts.splice(index, 1);
        }
    }
}

export const toastStore = new ToastStore();
