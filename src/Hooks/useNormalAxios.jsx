import axios from "axios";

export const normalAxios = axios.create({
    baseURL: 'http://localhost:8080',
});


const useNormalAxios = () => {
    return {normalAxios}
};

export default useNormalAxios;