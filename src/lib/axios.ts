import axios from "axios";

const axiosInstance = axios.create({
  // আপনার Backend API এর URL
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  // Better Auth এর কুকি শেয়ারিং এর জন্য এটি অবশ্যই লাগবে
  withCredentials: true, 
});

// Response Interceptor (Error handling এর জন্য)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // যদি ৪০১ (Unauthorized) এরর আসে, তবে লগআউট লজিক এখানে দিতে পারেন
    if (error.response?.status === 401) {
      console.error("User is unauthorized. Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;