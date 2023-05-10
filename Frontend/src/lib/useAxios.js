import axios from 'axios';

const baseUrl = "http://localhost:4000";

const useAxios = axios.create({
    baseURL: baseUrl,
});

export default useAxios;