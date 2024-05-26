import axios from "axios"
import { toast } from "react-toastify";
import { Everything } from "../models/Everything";

export const loginAPI = async (token: string) => {
    try {
        const response = await axios.get<Everything>(`https://newsapi.org/v2/everything?apiKey=${token}&q=bitcoin`);

        return response;
    } catch (error) {
        toast.warning("Login error occurred");
    }
};