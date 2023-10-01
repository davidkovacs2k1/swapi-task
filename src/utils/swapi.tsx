import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const swapiInstance: AxiosInstance = axios.create({
    baseURL: "https://swapi.dev/api/",
});

export default swapiInstance;
