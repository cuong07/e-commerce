import CartDetails from "@/components/cart/cart-details";

export interface Props {}
const CartPage = (props: Props) => {
  return (
    <div className="container">
      <CartDetails />
    </div>
  );
};

export default CartPage;
