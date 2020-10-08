import axios from "axios";
import { ChannelInfo, ProfileData } from "../types";

export async function getProfileData(): Promise<ProfileData> {
    const urlParams = new URLSearchParams(window.location.search);

    const binId = urlParams.get("id");

    if (binId == null) return null;

    const response = await axios.get<ProfileData>(`https://bytebin.lucko.me/${binId}`);

    if (response.status === 200) {
        return JSON.parse(unescape(JSON.stringify(response.data)));
    }

    return null;
}

export async function getChannelInfo(channelName: string): Promise<ChannelInfo> {
    if (channelName == null) {
        return null;
    }

    const response = await axios.get<ChannelInfo>(
        `https://api.firebot.app/v1/channel/${channelName}`
    );

    if (response.status === 200) {
        return response.data;
    }

    return null;
}

type FirebotRole =
    | "ChannelEditor"
    | "mod"
    | "Mod"
    | "sub"
    | "vip"
    | "broadcaster"
    | "Streamer"
    | "Owner";

const knownRoles: Array<FirebotRole | string> = [
    "ChannelEditor",
    "mod",
    "Mod",
    "sub",
    "vip",
    "broadcaster",
    "Streamer",
    "Owner",
];

export default function getMappedRoles(roleIds: string[]) {
    return [
        ...new Set(
            roleIds
                .filter((r) => knownRoles.includes(r))
                .map((r) => {
                    switch (r as FirebotRole) {
                        case "broadcaster":
                        case "Streamer":
                        case "Owner":
                        case "ChannelEditor":
                        case "Mod":
                        case "mod":
                            return "Mods";
                        case "sub":
                            return "Subs";
                        case "vip":
                            return "VIPs";
                    }
                })
        ),
    ];
}
