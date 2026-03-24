import { createSlice } from "@reduxjs/toolkit";

const CART_STORAGE_KEY = "foodify_cart";

const loadCart = () => {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch (error) {
    console.warn("Failed to load cart from storage:", error);
    return null;
  }
};

const saveCart = (state) => {
  try {
    const payload = {
      items: state.items,
      restaurantId: state.restaurantId,
    };
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("Failed to save cart to storage:", error);
  }
};

const baseState = {
  items: [],
  restaurantId: null,
  totalItems: 0,
  subtotal: 0,
  deliveryFee: 2.0, // Default delivery fee
  taxRate: 0.05, // 5% tax
  tax: 0,
  totalAmount: 0,
};

const calculateTotals = (state) => {
  state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
  state.subtotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  state.tax = state.subtotal * state.taxRate;
  state.totalAmount =
    state.subtotal > 0 ? state.subtotal + state.deliveryFee + state.tax : 0;
  saveCart(state);
};

const initialState = (() => {
  const persisted = loadCart();
  if (!persisted) return { ...baseState };
  const state = {
    ...baseState,
    items: Array.isArray(persisted.items) ? persisted.items : [],
    restaurantId: persisted.restaurantId || null,
  };
  calculateTotals(state);
  return state;
})();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, restaurant_id, price } = action.payload;

      // If adding from a different restaurant, clear cart first (standard food delivery behavior)
      if (state.restaurantId && state.restaurantId !== restaurant_id) {
        state.items = [];
      }

      state.restaurantId = restaurant_id;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      calculateTotals(state);
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id,
          );
        }
      }

      if (state.items.length === 0) {
        state.restaurantId = null;
      }

      calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
      calculateTotals(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }

      if (state.items.length === 0) {
        state.restaurantId = null;
      }

      calculateTotals(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
