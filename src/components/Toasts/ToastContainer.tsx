import React from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";

export type ToastContainerProps = {
    children?: React.ReactNode;
};
export function ToastContainer({ children }: ToastContainerProps) {
    return createPortal(
        <ul
            className={clsx("box-border max-h-full mt-20 fixed list-none flex flex-col")}
            // position toasts in the top center
            style={{
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 999,
            }}
        >
            {children}
        </ul>,
        document.body
    );
}
