import axios from "axios";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "https://e-commerce-backend-tau-ten.vercel.app",
	withCredentials: true, // Critical for sending cookies
	headers: {
		"Content-Type": "application/json",
	}
});

// Add interceptor to handle 401 responses and refresh token
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		
		// If the error is 401 and we haven't tried to refresh the token yet
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			
			try {
				// Try to refresh the token
				await axiosInstance.post("/auth/refresh-token");
				// Retry the original request
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login
				window.location.href = "/login";
				return Promise.reject(refreshError);
			}
		}
		
		return Promise.reject(error);
	}
);

export default axiosInstance;
