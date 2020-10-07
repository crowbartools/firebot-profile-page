import React from "react";
import { Command } from "../types";
import { ClockIcon } from "./icons/Clock";
import { GlobeIcon } from "./icons/Globe";
import { LockIcon } from "./icons/Lock";
import { UserIcon } from "./icons/User";
import { Tooltip } from "./Tooltip";

export const CooldownsAndPermissions: React.FC<{
    cooldowns?: Command["cooldown"];
    permissions?: Command["permissions"];
    rootPermissions?: Command["permissions"];
}> = ({ cooldowns, permissions, rootPermissions }) =>
    (!!cooldowns?.global ||
        !!cooldowns?.user ||
        !!permissions?.roles.length ||
        !!rootPermissions?.roles.length) && (
        <div className="flex items-center text-sm mt-1">
            {(!!cooldowns?.global || !!cooldowns?.user) && (
                <>
                    <ClockIcon className="text-gray-200 mr-1" />
                    {cooldowns?.global > 0 && (
                        <Tooltip content="Global cooldown">
                            <span className="bg-gray-300 flex items-center px-1 rounded mr-1 text-xs text-gray-200">
                                <GlobeIcon className="text-gray-200" />
                                <span className="ml-1">{cooldowns.global}s</span>
                            </span>
                        </Tooltip>
                    )}
                    {cooldowns?.user > 0 && (
                        <Tooltip content="User cooldown">
                            <span className="bg-gray-300 flex items-center px-1 rounded mr-1 text-xs text-gray-200">
                                <UserIcon className="text-gray-200" />
                                <span className="ml-1">{cooldowns.user}s</span>
                            </span>
                        </Tooltip>
                    )}
                </>
            )}

            {(!!permissions?.roles.length || !!rootPermissions?.roles.length) && (
                <Tooltip content="Permissions">
                    <span className="flex items-center">
                        <LockIcon className="text-gray-200 mr-1" />
                        {(permissions ?? rootPermissions).roles.map((r) => (
                            <span
                                key={r}
                                className="bg-gray-300 px-1 rounded mr-1 text-xs text-gray-200"
                            >
                                {r}
                            </span>
                        ))}
                    </span>
                </Tooltip>
            )}
        </div>
    );
