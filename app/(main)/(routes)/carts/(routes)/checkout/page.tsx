'use client';
import CartCheckout from '@/components/cart/cart-checkout';
import CartDetails from '@/components/cart/cart-details';
import CartPayment from '@/components/cart/cart-payment';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

const CartPage = () => {
    const pathName = useSearchParams();
    const step = pathName.get('step');

    return (
        <div className="container">
            {step && parseInt(step) === 1 && <CartDetails />}
            {step && parseInt(step) === 2 && <CartCheckout />}
            {step && parseInt(step) === 3 && <CartPayment />}
        </div>
    );
};

export default CartPage;
