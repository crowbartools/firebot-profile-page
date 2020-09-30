import axios from "axios";
import { ProfileData } from "../types";

export async function getProfileData() {
    const urlParams = new URLSearchParams(window.location.search);

    const binId = urlParams.get("id");

    if (binId == null) return null;

    const response = await axios.get<ProfileData>(
        `https://bytebin.lucko.me/${binId}`
    );

    if (response.status === 200) {
        return response.data;
    }

    return null;
}
