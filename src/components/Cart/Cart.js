import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const checkoutCartHandler = () => {
    setIsCheckout(true);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItems({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItems(id);
  };

  const submitCartHandler = async (userData) => {
    const data = {
      userData,
      cartItems: cartCtx.items,
    };
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-a9bfa-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
      }
    );
    cartCtx.clearCart();
    setIsSubmitting(false);
    setDidSubmit(true);
  };

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartIsNotEmpty = cartCtx.items.length > 0;

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {cartIsNotEmpty && (
        <button className={classes.button} onClick={checkoutCartHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onCancel={props.onClose} onSubmit={submitCartHandler} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingContent = <p>Processing your order...</p>;

  const didSubmitContent = (
    <React.Fragment>
      <p>Successfully placed your order...</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartContent}
      {isSubmitting && !didSubmit && isSubmittingContent}
      {didSubmit && !isSubmitting && didSubmitContent}
    </Modal>
  );
};

export default Cart;
