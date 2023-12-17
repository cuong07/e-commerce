import React from "react";

export interface CartLayoutProps {
  children: React.ReactNode;
}
const CartLayout = ({ children }: CartLayoutProps) => {
  return <div>{children}</div>;
};

export default CartLayout;
