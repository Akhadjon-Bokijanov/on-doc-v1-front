
import axios from "axios";
import {API_HOST} from "../env";

export const axiosInstanceWthoutToken = axios.create({
    baseURL:API_HOST
});