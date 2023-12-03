import { create } from "zustand";

export type ModalType = "error";

interface IModalData {
  message?: string;
  code?: number;
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
  onOpen: (type, data = {}) =>
    set((state) => ({ ...state, isOpen: true, data, type })),
  onClose: () => set((state) => ({ ...state, isOpen: false })),
}));
