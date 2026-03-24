import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    theme: themeReducer,
  },
});
