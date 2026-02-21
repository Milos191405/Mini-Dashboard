import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product, ProductDetails, ProductState } from "./types";

// Fetch products list
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://dummyjson.com/products`);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      return data.products;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return rejectWithValue(message);
    }
  },
);

// Fetch product by ID
export const fetchProductById = createAsyncThunk<ProductDetails, number>(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch product details");
      }
      const data = await res.json();
      return data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return rejectWithValue(message);
    }
  },
);

const initialState: ProductState = {
  products: [],
  selectedProduct: undefined,
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.products = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchProductById.fulfilled,
        (state, action: PayloadAction<ProductDetails>) => {
          state.status = "succeeded";
          state.selectedProduct = action.payload;
        },
      )
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;
