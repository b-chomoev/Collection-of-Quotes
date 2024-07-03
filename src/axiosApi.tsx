import axios from "axios";

const axiosApi = axios.create({
  baseURL: 'https://beksultanchomoevjs-25-default-rtdb.firebaseio.com/',
});

export default axiosApi;