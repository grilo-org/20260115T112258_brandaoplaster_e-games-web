import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Category from "@/dtos/category";

const categorySlice = createSlice({
  name: "category",
  initialState: null,
  reducers: {
    setCategoryToEdit(state: null | Category, action: PayloadAction<Category>): void {
      state = action.payload;
    },
    clearCategoryToEdit(state: null | Category) {
      return state = null;
    }
  }
})

export const { setCategoryToEdit, clearCategoryToEdit } = categorySlice.actions;
export default categorySlice.reducer;