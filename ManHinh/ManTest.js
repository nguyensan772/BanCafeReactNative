import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchSanPham } from '../redux/actions/sanPhamAction';

const ManTest = ({navigation}) => {
    //lấy  danh sách dữ liệu từ store của redux
    const listSanPham = useSelector(state => state.listSanPham.listSanPham);
     // lấy đối tượng để điều khiển các action
     const dispatch = useDispatch();

     // khi vào ứng dụng sẽ gọi action fetchSanPham để kéo dữ liệu từ API về store của redux

     useEffect(()=>{dispatch(fetchSanPham())},[dispatch])
     console.log(listSanPham);

  return (
    <View>
        <Text>Hello</Text>
        {

            listSanPham.map(row=>(
                <View key={row.id}>
                        <Text>{row.id}</Text>
                </View>
            ))
        }

    </View>
  )
}

export default ManTest

const styles = StyleSheet.create({})