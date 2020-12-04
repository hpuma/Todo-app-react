import axios from 'axios';

//check env for baseUrl
const API_URL =  (process.env.NODE_ENV === "production") ? "https://api.lunchbox.dev/todo/" : "http://localhost:5000/todo/";

//create instance
const AxiosInstance = axios.create({
    baseURL: API_URL,  
});

//authtoken in header
AxiosInstance.interceptors.request.use((config) => {
    const currentUser = localStorage !== null && JSON.parse(localStorage.getItem('currentUser'));
    const token = (currentUser ? currentUser.authtoken : '');
    config.headers.authorization = (token ? `Bearer ${token}` : '');
    return config;
});

const getAPI = (apiUrl) => AxiosInstance.get(apiUrl);

const postAPI = (apiUrl, data) => AxiosInstance.post(apiUrl, data);

const putAPI = (apiUrl, data) => AxiosInstance.put(apiUrl, data);

const deleteAPI = (apiUrl) => AxiosInstance.delete(apiUrl);

export { 
    postAPI,
    getAPI,
    putAPI,
    deleteAPI 
};
export default AxiosInstance;