export const userV1 = {
    USER_LOGIN: '/users/login',
    USER_REGISTER: '/users/register',
    GET_CURRENT_USER: '/users/current-user',
};

export const userAddressV1 = {
    CREATE_USER_ADDRESS: '/address/create',
    DELETE_USER_ADDRESS: '/address/delete/',
    UPDATE_USER_ADDRESS: '/address/update/',
};

export const productV1 = {
    GET_PRODUCTS: '/products',
    GET_DETAILS_PRODUCT: '/products/',
    CREATE_PRODUCT: '/products',
    PRODUCT_UPLOAD_IMAGES: '/products/uploads/',
};

export const categoryV1 = {
    GET_CATEGORIES: '/categories',
};

export const CartV1 = {
    GET_CART_BY_USER: '/carts',
};

export const CartDetailV1 = {
    UPDATE_CART_DETAIL: '/cart-details/',
    UPDATE_QUANTITY_CART_DETAIL: '/cart-details/update-number-of-product',
    DELETE_CART_DETAIL: '/cart-details/',
    CREATE_CART_DETAIL: '/cart-details',
};

export const OrderV1 = {
    GET_ORDER_PAYMENT_NVPAY: '/payments/submit-order',
    GET_PAYMENT_VNPAY_STATUS: '/payments/status/nvpay-payment',
    CREATE_ORDER_PAYMENT_NVPAY: '/payments/nvpay-payment/order-success',
    CREATE_ORDER_COD: '/orders/cod',
    GET_ALL_ORDER_BY_USER: '/orders/user/all',
    GET_ORDERS: '/orders',
};

export const ReviewV1 = {
    GET_REVIEWS_BY_PRODUCT: '/reviews/product/',
};
