import axios from "axios";
import { toast } from "react-toastify";
import * as userService from "./userService";

axios.defaults.headers.common["x-auth-token"] = userService.getJwt();

let access = new Headers();
access.append('Access-Control-Allow-Origin', 'https://localhost:3000');
access.append('Access-Control-Allow-Credentials', 'true');
axios.defaults.headers.common["access"] = access;


axios.interceptors.response.use(null, error => {
    const expectedError = !!error.response?.status;
    expectedError && toast.error(`error ${error.response.statusText} ${error.response.status}`);
    return Promise.reject(error);
})

const exportedObject = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete,
};
export default exportedObject;
