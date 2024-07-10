import axios from "axios";

const loginAPI = (loginDTO) =>{
    return axios.post(`http://localhost:8080/api/auth/login`, loginDTO);
}

const registerAPI = (registerDTO) =>{
    return axios.post(`http://localhost:8080/api/auth/register`, registerDTO);
}

export {loginAPI, registerAPI};