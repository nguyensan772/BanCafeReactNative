import { FlatList,  ImageBackground,  RefreshControl,  ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {  useSelector } from "react-redux";
import API from '../API';

export default function ManThich({navigation}) {
  const ipv4 = API+":3000";
  const [duLieu ,setDuLieu] = useState([]);
  const [index, setIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useSelector(state => state.theme.theme);

  const getDuLieu = async ( ) => {
     setRefreshing(true);
      const res = await fetch('http://'+ipv4+'/SanPham');
      const json = await res.json();
 
      
      const citrusFruits = json.filter((item) => item.yeuThich == true);
      setDuLieu(citrusFruits);

      setIndex(citrusFruits.length);
      setRefreshing(false);
      
  }



  useEffect(()=> {getDuLieu()},[]);

 

    //

  if(duLieu.length>0){
    return (
      <View style={
          {height: '100%',
         
          backgroundColor:theme ? 'black' : 'white'}
      }>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getDuLieu}/>}>
          
  
        <Text style={[styles.textItem,{color:theme ? 'white' : 'black',fontSize:40,fontWeight:'bold',padding:'5%',alignSelf:'center'}]}>Favorite</Text>
       
       
  
         
        {/* Danh Sách */}
        <FlatList 

          style={{alignSelf:'center',width:'90%',borderRadius:40,}}

         


         data={duLieu}
         extraData={index}
         
         renderItem={({ item }) =>
  
              <View style={{width:'100%',height:400,borderRadius:40,marginBottom:30}}>
                    
              <View    style={{width:'100%',height:'60%'}}>
                {/* Phần back ground image */}
                  <ImageBackground
                  source={{uri:item.anhSP}}
                  style={{width:'100%',height:'100%',justifyContent:'space-between',borderRadius:20}}
                  resizeMode='cover'>
                      <View>  
                          
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'rgba(00,00,00,0.5)', width:'100%',height:'40%',borderTopEndRadius:20,borderTopStartRadius:20,padding:20}}>
  
                          <View style={{justifyContent:'space-between'}}>
  
                              <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>{item.tenSP}</Text>
                              <Text style={{color:'white',fontWeight:'bold'}}><Icon style={{color:'rgba(202, 137, 2, 0.84)'}}  name="star" size={30} color="#900" /> 4.5</Text>
                          </View>
  
  
                          {/* Phần bên phải  */}
                          <View style={{justifyContent:'space-between'}}>
                              <View style={{flexDirection:'row',gap:20}}>
                                      <View style={{backgroundColor:'black',width:30,height:30,alignItems:'center',justifyContent:'center',borderRadius:10}} >
  
                                              <Icon style={{color:'rgba(202, 137, 2, 0.84)'}}  name="coffee" size={20} color="#900" />
  
                                      </View>
  
  
                                      <View style={{backgroundColor:'black',width:30,height:30,alignItems:'center',justifyContent:'center',borderRadius:10}} >
  
                                              <Icon style={{color:'rgba(202, 137, 2, 0.84)'}}  name="coffee" size={20} color="#900" />
  
                                      </View>
                              </View>
  
  
                              <View style={{backgroundColor:'black',width:'100%',marginTop:10,height:30,alignItems:'center',justifyContent:'center',borderRadius:10}}>
                                  <Text style={{fontSize:15,fontWeight:'bold',color:'white'}}>Very good</Text>
                                </View>
                          </View>
  
  
                        
                          {/* Phần bên phải  */}
  
  
                      </View>
                  </ImageBackground>
  
  
              </View>
  
  
              <View  style={{width:'100%',height:'40%',backgroundColor:'gray',padding:20,borderBottomEndRadius:40,borderBottomStartRadius:40}}>
                  <ScrollView>
                  <Text  style={{fontSize:15,color:'white',marginBottom:20}}>Description</Text>
                  <Text  style={{fontSize:15,color:'white'}}>{item.moTa}</Text>
  
  
                 
                  </ScrollView>
                  
                  
              </View>
  
  
              
                  
              
  
              </View>}
  
         keyExtractor={(item) => item.id}/>
  
   
    
  
        </ScrollView>
      </View>
    )
  }else{
    
    return (
      <View style={{backgroundColor:'black',justifyContent:'center',flex:1}}>
          <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getDuLieu}/>}>
             <Text style={{fontSize:30,fontWeight:'bold',alignSelf:'center',color:'white'}}>Không có sản phẩn nào</Text>

          </ScrollView>
        
       
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
    containerItem : {
       width:'100%',
        height:500,
       marginRight:20,
       marginBottom:20,
       backgroundColor:'gray',
       borderRadius:20,
       
      

    },
    textItem :{
        color:'white',
        fontSize:30,
    },
    imgItem : {
        width : '100%',
        height: '60%',
        borderRadius:20,
    },
    btnItem : {
        width:40,
        height:40,
        fontSize:40,
        fontWeight:'bold',
        backgroundColor:'orange',
        lineHeight:43, 
        textAlign:'center',
        borderRadius:10,
        color:'black',
        alignSelf: 'flex-end'
    },

    styleInput:{
        width:'90%',
        height:60,
        alignSelf:'center',
        borderWidth:2,
        borderColor:'gray',
        borderRadius:20,
        padding:10,
        color:'white',
        marginBottom:20,
    }

})