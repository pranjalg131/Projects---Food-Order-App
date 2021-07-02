import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [buttonIsHighlighted, setButtonIsHighlighted] = useState(false);

  const numberOfItems = cartCtx.items.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${
    buttonIsHighlighted ? classes.bump : ""
  }`;

  const { items } = cartCtx;

  useEffect(() => {
    if (items.length === 0) return;
    setButtonIsHighlighted(true);
    const timer = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
