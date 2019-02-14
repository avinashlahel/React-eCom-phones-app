import React from "react";
import CartItem from "./CartItem";

export default function CartList({ value }) {
  const { cart } = value;

  let cartItemsJSX = cart.map(item => {
    return <CartItem key={item.id} value={value} item={item} />;
  });

  return <div className="container-fluid">{cartItemsJSX}</div>;
}
