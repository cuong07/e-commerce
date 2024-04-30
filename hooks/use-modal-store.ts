import { OrderData, ProductImage } from '@/type';
import { create } from 'zustand';

export type ModalType = 'error' | 'image' | 'order-detail';

interface IModalData {
    message?: string;
    code?: number;
    productImage?: ProductImage[];
    order?: OrderData;
}

interface IModalStore {
    data: IModalData;
    isOpen: boolean;
    type: ModalType | null;
    onOpen: (type: ModalType, data?: IModalData) => void;
    onClose: () => void;
}

export const useModalStore = create<IModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set((state) => ({ ...state, isOpen: true, data, type })),
    onClose: () => set((state) => ({ ...state, isOpen: false })),
}));
