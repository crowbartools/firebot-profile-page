import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { cloneElement } from "react";

interface Props {
    activeTabIndex: number;
    config: Record<
        string,
        {
            content: React.ReactElement;
            searchbar: React.ReactElement;
        }
    >;
    onTabClick: (tabIndex: number) => void;
}
export const Tabs: React.FC<Props> = ({ activeTabIndex, config, onTabClick }) => (
    <>
        <nav className="flex justify-center md:justify-start">
            {Object.entries(config).map(([tabName, { searchbar }], index) => (
                <>
                    <a
                        key={index}
                        aria-current={index === activeTabIndex ? "page" : "false"}
                        onClick={() => onTabClick(index)}
                        className={clsx(
                            `text-2xl font-light relative py-2 cursor-pointer hover:text-white select-none`,
                            {
                                "text-gray-200": index !== activeTabIndex,
                                "text-white": index === activeTabIndex,
                                "ml-14": index > 0,
                            }
                        )}
                    >
                        {tabName}
                        <div className="absolute bottom-0 left-0 w-full flex justify-center">
                            <AnimatePresence>
                                {index === activeTabIndex && (
                                    <motion.span
                                        className="rounded h-1 bg-blue-300"
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        exit={{ width: 0 }}
                                        transition={{ ease: "easeOut", duration: 0.05 }}
                                    ></motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </a>

                    {index === activeTabIndex && (
                        <div key={tabName} className="order-last ml-auto w-96 md:block hidden">
                            {searchbar}
                        </div>
                    )}
                </>
            ))}
        </nav>
        {Object.entries(config).map(
            ([tabName, { searchbar }], index) =>
                index === activeTabIndex && (
                    <div key={tabName} className="md:hidden block mt-4">
                        {searchbar}
                    </div>
                )
        )}
        <div className="mt-4 md:mt-10">
            {Object.entries(config).map(
                ([, { content }], index) =>
                    index === activeTabIndex && cloneElement(content, { key: index })
            )}
        </div>
    </>
);
