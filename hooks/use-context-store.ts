import { create } from 'zustand';
interface ContextStore {
    contextImgageUrl: string;
}

const useContextStore = create<ContextStore>((set) => ({
    contextImgageUrl: process.env.NEXT_PUBLIC_BASE_URL + '',
}));

export default useContextStore;
