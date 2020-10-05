import React, { useContext } from "react";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { observer } from "mobx-react";
import { useStores } from "../../stores";
import { Options } from "../../stores/toasts-store";
import { ToastContainer } from "./ToastContainer";

type Context = {
    add: (message: string, options?: Options) => void;
    remove: (id: string) => void;
};

export const ToastContext = React.createContext<Context>(null);
const { Provider } = ToastContext;

export const ToastProvider = observer(({ children }) => {
    const { toastStore } = useStores();
    const add: Context["add"] = toastStore.addToast;
    const remove: Context["remove"] = toastStore.removeToast;
    return (
        <Provider value={{ add, remove }}>
            {children}

            <ToastContainer>
                <AnimatePresence initial={false}>
                    {[...toastStore.toasts].reverse().map(({ appearance, id, message }) => (
                        <motion.li
                            key={id}
                            layout
                            initial={{ opacity: 0, scale: 0.3, y: -25 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 25, transition: { duration: 0.2 } }}
                            onClick={() => remove(id)}
                            className={clsx(
                                "text-white p-2 px-4 rounded-lg shadow-lg min-w-44",
                                "flex justify-center items-center mb-2",
                                {
                                    "bg-green-600": appearance === "success",
                                    "bg-red-500 ": appearance === "error",
                                }
                            )}
                        >
                            <span className="w-full text-center mr-6">{message}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ToastContainer>
        </Provider>
    );
});

export const useToasts = () => {
    const ctx = useContext(ToastContext);

    if (!ctx) {
        throw Error(
            "The `useToasts` hook must be called from a descendent of the `ToastProvider`."
        );
    }

    return {
        addToast: ctx.add,
        removeToast: ctx.remove,
    };
};
