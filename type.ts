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

export type BaseData = {
    created_at: number[];
    updated_at: number[];
    message: string;
    status: string;
};

export type Role = {
    id: number;
    name: string;
};

export type UserAddress = {
    id: number;
    address_one: string;
    address_second: string;
    city: string;
    province: string;
    country: string;
};
export type AddressDTO = {
    address_one: string;
    address_second: string;
    city: string;
    province: string;
    country: string;
};

export interface UserData extends BaseData {
    id: number;
    full_name: string;
    phone_number: string;
    date_of_birth: Date;
    facebook_account_id: number;
    google_account_id: number;
    role: Role;
    user_addresses: UserAddress[];
}

export type OrderDTO = {
    fullname: string;
    email: string;
    phone_number: string;
    note: string;
    total_money: number;
    shipping_method: string;
    shipping_address: string;
    payment_method: string;
    address_id: number;
};
