import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {  useSelector } from "react-redux";


const ManContact = ({navigation}) => {
  const theme = useSelector(state => state.theme.theme);
  return (
    <View style={{flex:1,backgroundColor:theme ? 'black' : 'white',alignItems:'center'}}>


      <Text  style={{fontSize:40,fontWeight:'bold',color:theme ? 'white' : 'black',alignSelf:'center',marginBottom:60}}>Contact</Text>


      <View style={{height:'100%',width:'100%' ,alignItems:'center'}}>
        <Text  style={{fontSize:20,fontWeight:'bold',color:theme ? 'white' : 'black'}}>Nguyễn Đức San</Text>
        <Text  style={{fontSize:20,fontWeight:'bold',color:theme ? 'white' : 'black',marginBottom:60}}>PH32936</Text>
        <Image source={{uri:'https://fpt.edu.vn/Content/images/assets/Poly.png'}} style={{width:'100%',height:150,marginBottom:60}}/>

        
      <Pressable onPress={()=> {navigation.navigate('ManCaiDat')}}>
                <View style={{width:120,height:50,backgroundColor:'orange',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                  <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Quay lại</Text>
                </View>
            </Pressable>
      </View>

    </View>
  )
}

export default ManContact

const styles = StyleSheet.create({

})