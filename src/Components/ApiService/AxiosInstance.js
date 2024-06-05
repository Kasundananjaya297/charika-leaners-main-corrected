import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://172.16.16.115:8080/api/",
});

AxiosInstance.interceptors.request.use(
  (config) => {
    config.params = config.params || {};
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
