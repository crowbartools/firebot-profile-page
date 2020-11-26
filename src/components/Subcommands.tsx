import clsx from "clsx";
import { AnimatePresence, motion, Variants } from "framer-motion";
import React from "react";
import { useToggle } from "react-use";
import { ProfileData } from "../types";
import { CooldownsAndPermissions } from "./CooldownsAndPermissions";
import { CopyButton } from "./CopyButton";
import { ChevronDownIcon } from "./icons/ChevronDown";
import { ChevronRightIcon } from "./icons/ChevronRight";

export const Subcommands: React.FC<{ command: ProfileData["commands"]["allowedCmds"][0] }> = ({
    command,
}) => {
    const [open, toggleOpen] = useToggle(false);

    const variantType = {
        hidden: "hidden",
        visible: "visible",
    };

    const subCommandVariants: Variants = {
        [variantType.hidden]: {
            opacity: 0,
            x: 15,
        },
        [variantType.visible]: (index: number) => ({
            opacity: 1,
            transition: {
                delay: index * 0.05 + 0.1,
            },
            x: 0,
        }),
    };

    return (
        command.subCommands?.length > 0 && (
            <div className="mt-2">
                <a
                    className="cursor-pointer text-sm inline-flex items-center hover:text-gray-200"
                    onClick={toggleOpen}
                >
                    Subcommands {!open ? <ChevronRightIcon /> : <ChevronDownIcon />}
                </a>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            className="bg-gray-700 py-3 px-4 mt-2"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "max-content", overflow: "visible", opacity: 1 }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                overflow: "hidden",
                                transition: { duration: 0.2 },
                            }}
                        >
                            {command.subCommands.map((sc, index) => (
                                <motion.div
                                    className={clsx({
                                        "mb-3": index !== command.subCommands.length - 1,
                                    })}
                                    custom={index}
                                    variants={subCommandVariants}
                                    initial={variantType.hidden}
                                    animate={variantType.visible}
                                >
                                    <span className="text-base">{`${command.trigger} ${
                                        sc.usage?.length > 0 ? sc.usage : sc.arg
                                    }`}</span>
                                    <CopyButton
                                        tooltipText="Copy subcommand"
                                        copyText={`${command.trigger} ${
                                            sc.regex ? sc.usage : sc.arg
                                        }`}
                                    />
                                    <div className="font-light text-gray-200 text-sm block md:inline">
                                        <span className="hidden lg:inline-block mx-2">&#8212;</span>
                                        <span>{sc.description ?? "No description."}</span>
                                    </div>
                                    <CooldownsAndPermissions
                                        cooldowns={sc.cooldown}
                                        permissions={sc.permissions}
                                        rootPermissions={command.permissions}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    );
};
