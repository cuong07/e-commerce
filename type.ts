import { number } from 'zod';

export type ActionType = {
    title: string;
    link: string;
    type: string;
};

export type UserLoginType = {
    phone_number: string;
    password: string;
};

export type UserRegisterType = {
    fullname: string;
    password: string;
    retype_password: string;
    role_id: number;
    address: string;
    facebook_account_id: number;
    google_account_id: number;
    date_of_birth: Date;
    phone_number: string;
};

export type ProductData = {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    category_id: number;
    url: string;
    product_images: ProductImage[];
};

export type ProductImage = {
    id: number;
    image_url: string;
};

export type CategoryData = {
    id: string;
    name: string;
};

export type CartDetailsData = {
    id: number;
    cart_id: number;
    product: ProductData;
    number_of_product: number;
    price: number;
    total_money: number;
    color: string;
};

export type CartData = {
    id: number;
    user_id: number;
    note: string;
    cart_details: CartDetailsData[];
    is_active: boolean;
};

export type CartDetailDTO = {
    cart_id: number;
    product_id: number;
    number_of_product: number;
    price: number;
    total_money: number;
    color: string;
};
