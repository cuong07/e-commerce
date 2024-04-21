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
    note: string | undefined;
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

export type LocationStoreData = {
    lng: number;
    lat: number;
    name: string;
    image: string;
    addess: string;
};

export enum OrderStatus {
    PENDING = 'pending',
    PROCESSING = 'processing',
    SHOPPED = 'shopped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

export interface OrderPayment extends BaseData {
    id: number;
    user: UserData;
    note: string;
    total: number;
    paymentTime: Date;
    transactionId: string;
    isActive: boolean;
}

export type OrderDetailData = {
    id: number;
    product: ProductData;
    price: number;
    numberOfProducts: number;
    totalMoney: number;
    color: string;
};

export type OrderData = {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    note: string;
    orderDate: Date;
    status: OrderStatus;
    totalMoney: number;
    shippingMethod: string;
    shippingAddress: string;
    shippingDate: Date;
    trackingNumber: number;
    paymentMethod: string;
    active: boolean;
    orderPayment: OrderPayment;
    userAddress: UserAddress;
    orderDetails: OrderDetailData[];
};
