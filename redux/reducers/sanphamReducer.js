import { createSlice } from "@reduxjs/toolkit";
  // import { addTodoAPI,  updateTodoApi,toggleTodoApi, deleteSanPhamApi } from "../actions/sanPhamAction";

//1. khai báo khởi tạo state
const initialState = {
   listSanPham: [], // chứa danh sách công việc
  
}


//2. thiết lập cho reducer và định nghĩa các action
const sanPhamSlice = createSlice({
   name: 'SanPham',
   initialState,
   reducers: {
     // làm việc cục bộ
       addSanPham(state, action) {
        state.listSanPham.splice(0, state.listSanPham.length -1);
         state.listSanPham.push(action.payload);
     },
   },

   reducerPath: buider =>{
       // đây là chỗ để viết các thao tác mở rộng, xử lý các trạng thái của promise


   },
   





       // Xử lý các action rejected hoặc pending nếu cần
  
})


// export các thành phần để bên screen có thể sử dụng
export const { addSanPham } = sanPhamSlice.actions;
export default sanPhamSlice.reducer;
