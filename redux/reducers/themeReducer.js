import { createSlice } from "@reduxjs/toolkit";
  // import { addTodoAPI,  updateTodoApi,toggleTodoApi, deleteSanPhamApi } from "../actions/sanPhamAction";

//1. khai báo khởi tạo state
const initialState = {
   theme: true, // chứa danh sách công việc
  
}

//2. thiết lập cho reducer và định nghĩa các action
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      // làm việc cục bộ
        doiTheme(state, action) {
          state.theme = !action.payload;
      },
    },
 
 
 
 
 
        // Xử lý các action rejected hoặc pending nếu cần
   
 })

 // export các thành phần để bên screen có thể sử dụng
export const { doiTheme } = themeSlice.actions;
export default themeSlice.reducer;