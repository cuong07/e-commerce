export type ActionType = {
    title: string;
    link: string;
    type: string;
};

export type UserLoginType = {
    phoneNumber: string;
    password: string;
};

export type UserRegisterType = {
    fullName: string;
    password: string;
    retypePassword: string;
    roleId: number;
    address: string;
    facebookAccountId: number;
    googleAccountId: number;
    dateOfBirth: Date;
    phoneNumber: string;
};

export type ProductData = {
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    description: string;
    categoryId: number;
    url: string;
    productImages: ProductImage[];
};

export type ProductImage = {
    id: number;
    imageUrl: string;
};

export type CategoryData = {
    id: string;
    name: string;
};

export type CartDetailsData = {
    id: number;
    cartId: number;
    product: ProductData;
    numberOfProduct: number;
    price: number;
    totalMoney: number;
    color: string;
};

export type CartData = {
    id: number;
    userId: number;
    note: string;
    cartDetails: CartDetailsData[];
    isActive: boolean;
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
    createdAt: number[];
    updatedAt: number[];
    message: string;
    status: string;
};

export type Role = {
    id: number;
    name: string;
};

export type UserAddress = {
    id: number;
    addressOne: string;
    addressSecond: string;
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
    fullName: string;
    phoneNumber: string;
    dateOfBirth: Date;
    facebookAccountId: number;
    googleAccountId: number;
    role: Role;
    userAddresses: UserAddress[];
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

export interface ReviewData extends BaseData {
    content: string;
    id: number;
    isEdited: boolean;
    rating: number;
    user: UserData;
}
