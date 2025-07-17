import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000/",

});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config, "Config resp");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // Do something before request is sent
    // console.log(response.data, "response resp");
    return response;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
