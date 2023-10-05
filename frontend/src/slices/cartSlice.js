import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "" };

const addDemicals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

console.log('hi');

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate item's price
      state.itemsPrice = addDemicals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      //Calculate shipping price
      state.shippingPrice = addDemicals(state.itemsPrice > 100 ? 0 : 100);

      // Calculate tax price
      state.taxPrice = addDemicals(
        Number((0.15 * state.itemsPrice).toFixed(2))
      );

      // Calculate total price
      state.totalPrice = addDemicals(
        Number(state.itemsPrice) +
          Number(state.shippingPrice) +
          Number(state.taxPrice)
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
