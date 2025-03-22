import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "https://e-commerce-backend-tau-ten.vercel.app" + "/api",
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;
