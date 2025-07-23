import axios from "axios";

const apiClient = axios.create({
    baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:4000/':'/',
    headers: {
        'Content-type': 'application/json',
    },
})
const apiClientFormData = axios.create({
    baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:4000/':'/',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})
export { apiClientFormData };
export default apiClient;