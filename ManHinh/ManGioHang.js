import { FlatList,  Image,  ImageBackground,  Pressable,  RefreshControl,  ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {  useSelector } from "react-redux";
import API from '../API';

const ManGioHang = () => {
    const ipv4 = API+":3000";
   
    const [duLieu ,setDuLieu] = useState([]);
    const [index, setIndex] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const theme = useSelector(state => state.theme.theme);
    
    const getDuLieu = async ( ) => {
      setRefreshing(true);
      const res = await fetch('http://'+ipv4+'/SanPham');
        const json = await res.json();
  
        
  
        const citrusFruits = json.filter((item) => item.gioHang == true);
        setDuLieu(citrusFruits);
  
        setIndex(citrusFruits.length)
        setRefreshing(false);
    }

    const hienThiGia = () => {
      let index = 0;
      let tong = 0;
      duLieu.forEach((item)=>{

           tong = (Number(item.giaSP) * Number(item.soLuong));
          index = tong + index ;

      })
      return ''+index ;
    }

    const muaHang = () => {
             


               let day = new Date().getDay();
               let date = new Date().getDate();
               let month = new Date().getMonth();
               let year = new Date().getFullYear();
              
               let fullDay = `${day},${date},${month},${year}`
               
              const newHoaDon = {
                idSP:duLieu,
                gia:Number(hienThiGia()),
                ngay:fullDay

              }

              fetch('http://'+ipv4+'/HoaDon', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newHoaDon),
            });
    }

    const deleteGioHang = (idSPMuonXoa) => {
        fetch('http://'+ipv4+'/SanPham/'+idSPMuonXoa,{
          method:'PATCH',
          body:JSON.stringify({gioHang : false}),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then(res=>res?getDuLieu():console.log('lỗi'));
    }

    useEffect(()=> {getDuLieu()},[]);
    if(duLieu.length>0){
        return (
          <View style={
              {height: '100%',
             
              backgroundColor:theme ? 'black' : 'white'}
          }>
            
            <View style={{height: '90%'}}>
                          <Text style={[styles.textItem,{fontSize:40,fontWeight:'bold',padding:'5%',alignSelf:'center',color:theme ? 'white' : 'black'}]}>Cart</Text>
                    
                    {/* Danh Sách */}
                    <FlatList 

                      style={{alignSelf:'center',width:'90%'}}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getDuLieu}/>}
                    data={duLieu}
                    extraData={index}
                    renderItem={({ item }) =>    {
                          
                            return(
                                <View style={{width:'100%',backgroundColor:'gray',marginBottom:20,borderRadius:20,padding:20}}>
                                        <View style={{flexDirection:'row'}}>
                                          
                                                <Image source={{uri:item.anhSP}} style={{width:100,height:100,borderRadius:20}}/>
                                          
                                          
                                                <View>

                                                <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}> {item.tenSP}</Text>
                                               
                                                 <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}> <Icon style={{color:'rgba(202, 137, 2, 0.84)'}}  name="dollar" size={20} color="#900" /> {item.giaSP}</Text>
                                                 <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}> Số lượng: {item.soLuong}</Text>
                                                </View>

                                                <Pressable onPress={()=>{deleteGioHang(item.id)}}>
                                                   <Icon style={{color:'rgba(202, 137, 2, 0.84)'}}  name="trash" size={20} color="#900" />
                                                </Pressable>
                                                
                                        </View>

                                        

                                        
                                </View>
                            ) }}

                    keyExtractor={(item) => item.id}/>


            </View>

            <View style={{height: '10%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,paddingVertical:5}}>
                  <View>
                    <Text style={{fontSize:10,color:theme ? 'white' : 'black'}}>Price</Text>
                    <Text style={{fontSize:20,color:theme ? 'white' : 'black',fontWeight:'bold'}} ><Icon style={{color:'rgba(202, 137, 2, 0.84)'}}  name="dollar" size={20} color="#900" />{hienThiGia()} </Text>
                </View> 

                
                <View>
                    <Pressable onPress={()=>{muaHang()}}>
                      <View style={{backgroundColor:'orange',width:200,height:'100%',borderRadius:10,padding:10,justifyContent:'center'}}>
                        <Text style={{fontSize:20,color:'white',alignSelf:'center',fontWeight:'bold'}}>Buy all</Text></View>
                    </Pressable>
                </View>
            </View>
      
            
          </View>
        )
      }else{
        return (
          <View style={{backgroundColor:'black',justifyContent:'center',flex:1}}>
            <ScrollView
             
               refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getDuLieu}/>}>
                <View  style={{alignItems:'center'}}>
                <Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>Không có sản phẩn nào</Text>
                </View>
                              

            </ScrollView>
    

          </View>
        )
      }
}

export default ManGioHang

const styles = StyleSheet.create({})