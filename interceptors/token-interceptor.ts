import { AxiosInstance } from 'axios';
import { request } from '@/lib/axios';
import useAuthStore from '@/hooks/use-auth-store';

const requsetInstance: AxiosInstance = request;
requsetInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().loginData?.token;
    console.log(token);

    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});

export default requsetInstance;
