import axios from "axios";
import { getToken } from "../services/tokenService";

const api = axios.create({
    baseURL:"https://pet-alerta-backend.vercel.app/api"
});

api.interceptors.request.use(config => {

    const token = getToken();

    if(token){

        config.headers.Authorization = `Bearer ${token}`;

    }

    return config;

});

export default api;