import { UserData } from '@/type';
import { create } from 'zustand';

type loginResponse = {
    message: string;
    token: string | null;
};

type RegisterResponse = {
    fullName: string;
    phoneNumber: string;
    id: number;
    message: string;
};

interface IAuthStore {
    loginData: loginResponse | null;
    registerData: RegisterResponse;
    currentUser: UserData | null;
    err: any;
    login: (data: loginResponse) => void;
    register: (fullName: string, phoneNumber: string, id: number) => void;
    setCurrentUser: (data: UserData) => void;
    error: (error: any) => void;
}

const useAuthStore = create<IAuthStore>((set) => ({
    loginData: {
        message: '',
        token: localStorage.getItem('token') || null,
    },
    registerData: {
        fullName: '',
        id: 0,
        phoneNumber: '',
        message: '',
    },
    err: null,
    currentUser: null,
    login: (data) => {
        set((state) => ({ ...state, data }));
        if (data.token !== null) {
            localStorage.setItem('token', data.token);
        }
    },
    register: (fullName, phoneNumber, id) => set((state) => ({ ...state, fullName, phoneNumber, id })),
    error: (err) => set((state) => ({ ...state, err })),
    setCurrentUser: (data) => set((state) => ({ ...state, currentUser: data })),
}));

export default useAuthStore;
