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
    err: any;
    login: (data: loginResponse) => void;
    register: (fullName: string, phoneNumber: string, id: number) => void;
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
    login: (data: loginResponse) => {
        set((state) => ({ ...state, data }));
        if (data.token !== null) {
            localStorage.setItem('token', data.token);
        }
    },
    register: (fullName, phoneNumber, id) => set((state) => ({ ...state, fullName, phoneNumber, id })),
    error: (err) => set((state) => ({ ...state, err })),
}));

export default useAuthStore;
