import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cart/cartSlices";
import brandsReducer from "../slices/categories/brandsSlice";
import categoryReducer from "../slices/categories/categoriesSlice";
import colorsReducer from "../slices/categories/colorsSlice";
import couponsReducer from "../slices/coupons/couponsSlice";
import ordersReducer from "../slices/orders/ordersSlices";
import productReducer from "../slices/products/productSlices";
import reviewsReducer from "../slices/reviews/reviewsSlice";
import usersReducer from "../slices/users/usersSlice";

//store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandsReducer,
    colors: colorsReducer,
    carts: cartReducer,
    coupons: couponsReducer,
    orders: ordersReducer,
    reviews: reviewsReducer,
  },
});

export default store;
