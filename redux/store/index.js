import { configureStore } from "@reduxjs/toolkit";
import sanphamReducer from "../reducers/sanphamReducer";
import themeReducer from "../reducers/themeReducer";

export default configureStore({
    reducer:{
        listSanPham: sanphamReducer,
        theme:themeReducer
    }
})