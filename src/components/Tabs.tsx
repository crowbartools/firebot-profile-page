import clsx from "clsx";
import React, { cloneElement } from "react";
interface Props {
    activeTabIndex: number;
    config: Record<string, React.ReactElement>;
    onTabClick: (tabIndex: number) => void;
}
export const Tabs: React.FC<Props> = ({
    activeTabIndex,
    config,
    onTabClick,
}) => (
    <>
        <div className="border-b border-gray-700 px-6">
            <nav className="-mb-px flex">
                {Object.keys(config).map((tabName, index) => (
                    <a
                        key={index}
                        aria-current={
                            index === activeTabIndex ? "page" : "false"
                        }
                        onClick={() => onTabClick(index)}
                        className={clsx(
                            "whitespace-no-wrap py-4 px-1 border-b-2 border-transparent",
                            "font-medium text-sm leading-5 text-gray-500",
                            "hover:text-gray-700 hover:border-gray-600",
                            "focus:outline-none focus:text-gray-700",
                            "focus:border-gray-300 cursor-pointer",
                            {
                                "border-blue-400 text-blue-300":
                                    index === activeTabIndex,
                                "focus:text-blue-600 focus:border-blue-500":
                                    index === activeTabIndex,
                                "ml-8": index > 0,
                            }
                        )}
                    >
                        {tabName}
                    </a>
                ))}
            </nav>
        </div>
        <div className="p-6">
            {Object.entries(config).map(
                ([, Component], index) =>
                    index === activeTabIndex &&
                    cloneElement(Component, { key: index })
            )}
        </div>
    </>
);
