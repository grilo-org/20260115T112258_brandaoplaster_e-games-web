import { combineReducers } from "redux";
import authReducer from "@/store/modules/auth";
import searchReducer from "@/store/modules/admin/shared/search/reducer";
import categoryReducer from "@/store/modules/admin/category/reducer";
import productReducer from "@/store/modules/admin/product/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
  category: categoryReducer,
  product: productReducer,
});

export default rootReducer;
