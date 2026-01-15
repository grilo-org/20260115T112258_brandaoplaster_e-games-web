import Product from "@/dtos/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "product",
  initialState: null as Product | null,
  reducers: {
    setProductToEdit(state, action: PayloadAction<Product>) {
      return (state = action.payload);
    },
    clearProductToEdit(state) {
      return (state = null);
    },
  },
});

export const { setProductToEdit, clearProductToEdit } = ProductSlice.actions;
export default ProductSlice.reducer;
