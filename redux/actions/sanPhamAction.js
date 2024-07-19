
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addSanPham } from "../reducers/sanphamReducer";


const apiUrl = "http://192.168.1.4:3000/SanPham";

export const fetchSanPham = ( )=> {
  return async dispatch => {
    try {
      const response  = await fetch(apiUrl);
      const data = await response .json();
      // dữ liệu lấy được từ api về, duyệt mảng và lưu vào store của redux
      // console.log(data);
      data.forEach(item => {
          dispatch(addSanPham(item));
      });
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }
}