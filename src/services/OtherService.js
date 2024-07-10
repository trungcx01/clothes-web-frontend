import axios from "axios";

const fetchAllProvinces = () =>{
    return axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`, {
        headers:{
            'token': 'a6179b3d-ba69-11ee-8529-6a2e06bbae55'
        }
    });
}

const fetchAllDistricts = (province_id) =>{
    return axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,{
        params: {
            province_id: province_id
        },
        headers:{
            'token': 'a6179b3d-ba69-11ee-8529-6a2e06bbae55'
        }
    });
}

const fetchAllVillages = (district_id) => {
    return axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`, {
        params: {
            district_id: district_id
        },
        headers: {
            'token': 'a6179b3d-ba69-11ee-8529-6a2e06bbae55'
        }
    });
}


export {fetchAllProvinces, fetchAllDistricts, fetchAllVillages};