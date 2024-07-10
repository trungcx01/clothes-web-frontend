import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401){
      localStorage.removeItem("token");
      window.location.href = '/login';
    }
    let res = {}
    if (error.response) {
      res.data = error.response.data;
      res.status = error.response.status;
      res.headers = error.response.headers
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    return res;
  }
);

instance.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + String(localStorage.getItem("token"));
  return config;
});

export default instance;
