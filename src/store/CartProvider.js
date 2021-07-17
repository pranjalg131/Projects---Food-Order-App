import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    let newItems;

    if (existingItemIndex !== -1) {
      const existingItem = state.items[existingItemIndex];
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };

      newItems = [...state.items];
      newItems[existingItemIndex] = updatedItem;
    } else {
      newItems = state.items.concat(action.item);
    }

    return {
      items: newItems,
      totalAmount: newTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const currItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const currItem = state.items[currItemIndex];

    const newTotalAmount = state.totalAmount - currItem.price;

    let newItems = [...state.items];
    if (currItem.amount > 1) {
      const updatedItem = { ...currItem, amount: currItem.amount - 1 };
      newItems[currItemIndex] = updatedItem;
    } else {
      newItems.splice(currItemIndex, 1);
    }

    return {
      items: newItems,
      totalAmount: newTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
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

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItems: addItemToCartHandler,
    removeItems: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
