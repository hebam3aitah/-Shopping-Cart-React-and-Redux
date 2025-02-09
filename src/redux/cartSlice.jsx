// import { createSlice } from "@reduxjs/toolkit";

// const getCartFromLocalStorage = () => {
//   const cart = localStorage.getItem("cart");
//   return cart ? JSON.parse(cart) : [];
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cartItems: getCartFromLocalStorage(),
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
//       if (itemIndex >= 0) {
//         state.cartItems[itemIndex].quantity += 1;
//       } else {
//         state.cartItems.push({ ...action.payload, quantity: 1 });
//       }
//       localStorage.setItem("cart", JSON.stringify(state.cartItems));
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
//       localStorage.setItem("cart", JSON.stringify(state.cartItems));
//     },
//     updateQuantity: (state, action) => {
//       const item = state.cartItems.find(item => item.id === action.payload.id);
//       if (item) {
//         item.quantity = action.payload.quantity;
//       }
//       localStorage.setItem("cart", JSON.stringify(state.cartItems));
//     }
//   }
// });

// export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ جلب المنتجات من ملف JSON باستخدام createAsyncThunk
export const fetchProducts = createAsyncThunk("cart/fetchProducts", async () => {
  const response = await fetch("/products.json");
  const data = await response.json();
  return data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    products: [], // 🆕 تخزين المنتجات من JSON
    status: "idle", // 🆕 حالة التحميل (idle, loading, succeeded, failed)
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload; // 🆕 حفظ المنتجات من JSON
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
