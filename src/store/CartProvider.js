import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // Finding the index of item if it exists already.
    const idx = state.items.findIndex((item) => item.id === action.item.id);
    let newItems, newTotalAmount;

    if (idx !== -1) {
      newItems = state.items[idx].amount + 1;
      newTotalAmount = state.totalAmount + action.item.price;
    } else {
      newItems = state.items.concat(action.item);
      newTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
    }

    return {
      items: newItems,
      totalAmount: newTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItems: addItemToCartHandler,
    removeItems: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
