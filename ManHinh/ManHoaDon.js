import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from "react-redux";
import API from '../API';

const ManHoaDon = ({navigation}) => {
    const ipv4 = API+":3000";
    const [refreshing, setRefreshing] = useState(false);
    const [duLieuHoaDon , setDuLieuHoaDon] = useState([]);
    const [duLieuSanPham , setDuLieuSanPham] = useState([]);
    const theme = useSelector(state => state.theme.theme);

    const getDataHoaDon = async () => {
        try {
            setRefreshing(true);
            const res = await fetch('http://'+ipv4+'/HoaDon');
            const json = await res.json();

            setDuLieuHoaDon(json);
            setRefreshing(false);
        } catch (error) {
            console.log(error);
        }
    }

    

    useEffect(()=>{getDataHoaDon() },[]);

  return (
    <View style={{backgroundColor:theme ? 'black' : 'white',flex:1,padding:10}}>
        <Text  style={{fontSize:40,fontWeight:'bold',color:theme ? 'white' : 'black',alignSelf:'center'}}>Bill</Text>

        <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getDataHoaDon}/>}
            data={duLieuHoaDon}
            keyExtractor={item=>item.id}
            renderItem={({item})=> {


                
              
                return(
                    <View style={{backgroundColor:'gray',padding:10,borderRadius:10,marginBottom:20}}>
                        <Text  style={{fontSize:20,fontWeight:'bold',color:'white'}}>ID hóa đơn: {item.id}</Text>
                        
                        
                        {/* <Text style={{fontSize:20,fontWeight:'bold',color:'white',paddingBottom:10}}>Thứ {item.ngay} </Text> */}
                      
                        <FlatList
                            data={item.idSP}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => {
                                return(
                                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'black',padding:10,borderRadius:10,marginBottom:10}}>
                                        <Image style={{width:50,height:50}} source={{uri:item.anhSP}}/>
                                        <View>
                                            <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>{item.tenSP}</Text>
                                            <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>{item.soLuong}</Text>
                                        </View>
                                        
                                        <View>
                                             <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>{item.giaSP} <Icon style={{color:'rgba(202, 137, 2, 0.84)'}}  name="dollar" size={20} color="#900" /></Text>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                        <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Tổng tiền: {item.gia} <Icon style={{color:'rgba(202, 137, 2, 0.84)'}}  name="dollar" size={20} color="#900" /></Text>
                       

                    </View>
                )
            }}
        />

    </View>
  )
}

export default ManHoaDon

const styles = StyleSheet.create({})