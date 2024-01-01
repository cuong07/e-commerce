import { ProductImage } from '@/type';
import { create } from 'zustand';

export type AlertType = 'error' | 'success' | 'warning';

interface IAlertData {
    link?: string;
    message?: string;
    description?: string;
}

interface IAlertStore {
    data: IAlertData;
    isOpen: boolean;
    type: AlertType | null;
    onOpen: (type: AlertType, data?: IAlertData) => void;
    onClose: () => void;
}

export const useAlertStore = create<IAlertStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set((state) => ({ ...state, isOpen: true, data, type })),
    onClose: () => set((state) => ({ ...state, isOpen: false })),
}));
