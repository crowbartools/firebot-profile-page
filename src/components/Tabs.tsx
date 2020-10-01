import clsx from "clsx";
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
        <div className="">
            <nav className="flex">
                {Object.entries(config).map(([tabName, { searchbar }], index) => (
                    <>
                        <a
                            key={index}
                            aria-current={index === activeTabIndex ? "page" : "false"}
                            onClick={() => onTabClick(index)}
                            className={clsx(
                                `text-2xl font-light relative py-2 cursor-pointer hover:text-white`,
                                {
                                    "text-gray-200": index !== activeTabIndex,
                                    "text-white": index === activeTabIndex,
                                    "ml-14": index > 0,
                                }
                            )}
                        >
                            {tabName}
                            {index === activeTabIndex && (
                                <span className="absolute w-full rounded h-1 bg-blue-300 bottom-0 left-0"></span>
                            )}
                        </a>
                        {index === activeTabIndex && (
                            <div className="order-last w-96 ml-auto">{searchbar}</div>
                        )}
                    </>
                ))}
            </nav>
        </div>
        <div className="pt-10">
            {Object.entries(config).map(
                ([, { content }], index) =>
                    index === activeTabIndex && cloneElement(content, { key: index })
            )}
        </div>
    </>
);
