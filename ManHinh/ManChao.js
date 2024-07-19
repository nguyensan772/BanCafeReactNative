import { StyleSheet, Text, View,Image } from 'react-native'
import React,{useEffect} from 'react'



const Chao = ({navigation}) => {
  useEffect(()=>{
    const timer= setTimeout(()=>{
      navigation.navigate('ManLogin')
    },3000);
    return ()=>clearTimeout(timer)
  })
  return (
    <View style={styles.container}>
       <Text style={styles.txt1}>WELCOME TO Assignment</Text>
    <Image style={styles.image} source={{uri:'https://fptshop.com.vn/Uploads/images/image001(1265).jpg'}} />
    <Text style={styles.txt}>Nguyễn Đức San</Text>
    <Text style={styles.txt2}>PH32936</Text>
    </View>
  )
}

export default Chao

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    backgroundColor:'#FFF',
    justifyContent: 'center',
   
    backgroundColor:'black'
  },
  image:{
    width:200,
    height:200,
    marginBottom:20
  },
  txt:{
    fontSize:20,
    fontWeight:'bold',
    fontStyle:'italic'
  },
  txt1:{
    fontSize:25,
    fontWeight:'bold',
    fontStyle:'italic',
    color:'#00C853',
    marginBottom:50
  },
  txt2:{
    fontSize:20,
    fontWeight:'bold',
    fontStyle:'italic',
    color:'green'
  }
})