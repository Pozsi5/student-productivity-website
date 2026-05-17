import axios from 'axios';
import { useAuth } from 'react-oidc-context';
import { useEffect, useMemo } from 'react';

const useAxios = () => {
    const auth = useAuth();

    const axiosInstance = useMemo(() => axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
        headers: {
            'Content-Type': 'application/json',
        },
    }), []);

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                // Ha be vagyunk lépve és van token, rátesszük a kérésre
                if (auth.isAuthenticated && auth.user?.access_token) {
                    config.headers.Authorization = `Bearer ${auth.user.access_token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
        };
    }, [auth.isAuthenticated, auth.user, axiosInstance]);

    return axiosInstance;
};

export default useAxios;