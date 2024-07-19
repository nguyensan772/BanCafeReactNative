import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React,{useEffect, useRef, useState} from 'react'
import { firebase } from '@react-native-firebase/auth';
import API from '../API';


export default function ManLogin({navigation}) {
  const idp4 = API;
  
  const dataRef = useRef([]);
  const [allTK ,setAllTK] = useState([]);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const auth = firebase.auth();
  const getTK = async ( ) => {
    try {
      const res = await fetch(`http://${idp4}:3000/TaiKhoan`);
      const json = await res.json();
    
      setAllTK(json);
      dataRef.current = json;
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(()=> {
    getTK();console.log(allTK);
  } , []);


  
  const KiemTraDangNhap = () => {
    let index = 0;
   if(email.length == 0 || password.length == 0){
    alert("Bạn chưa nhập tài khoản hoặc mật khẩu")
  }else {
    allTK.forEach(tk => {

   

      if(tk.tenND == email  &&  tk.matKhau == password){
        let idC = '';


        // allTK.forEach((item) => {
        //   if(item.tenND == email){
        //     idC = item.id;
        //   }
        // });


        auth.signInWithEmailAndPassword(email,password).then((res)=>{
          
          navigation.navigate('NhomManHome',{itemID:idC});
          index ++ ;
        })

        
        
      }

  });

  // (index == 0) ? alert("Bạn nhập sai") :  console.log('Đăng nhập');
  }

    
  }



  return (
    <View style={{
      backgroundColor:'black',
      height:'100%',
    }}>
     <ScrollView>
       {/* Wellcom */}
       <Image source={{uri:'https://anhdepfree.com/wp-content/uploads/2018/08/anh-nen-may-tinh-dep-nhat-2017.jpg'}}
      style={styles.containerImg}/>  


      <Text style={{marginVertical:40,fontWeight:'bold',alignSelf:'center'}}> <Text style={{color:'red',fontSize:20}}>Login to continue</Text></Text>




      {/* Edit Text */}
      <TextInput style={styles.edtText} placeholder='Email address' placeholderTextColor={'gray'} onChangeText={(txt)=> setEmail(txt)}/>

      <TextInput style={styles.edtText} placeholder='Password' placeholderTextColor={'gray'} onChangeText={(txt)=> setPassword(txt)}/>



     {/* Button */}
      <Pressable  onPress={()=>{

        KiemTraDangNhap();
      
      }} style={styles.btn}>
        <Text style={styles.btnText}>Sign In</Text>

      </Pressable>


      {/* Đăng kí và quên mật khẩu */}

      <Text style={styles.textDKvaQMK} >Don't have account? Click <Text onPress={()=>{console.log('Đăng kí');navigation.navigate('ManSignin')
      }} style={{color:'orange'}}>Register</Text></Text>

      <Text style={styles.textDKvaQMK} >Forgot Password? Click<Text onPress={()=>{console.log('Quên mật khẩu');
      }} style={{color:'orange'}}>Reset</Text></Text>
     </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    welcome: {
      fontSize:30 ,
      fontWeight:'bold',
      alignSelf:'center',
      color:'white'
    },
    containerImg:{
      width: 150,
      height: 150,
      resizeMode:'cover',
      alignSelf:'center',
      borderRadius:100,
      marginVertical:20,
    },
    edtText:{
      color:'white',
      height:50,
      width:'90%',
      borderColor:'gray',
      borderRadius:10,
      borderWidth:2,
      paddingLeft:20,
      alignSelf:'center',
      marginVertical:10,

    },

    btn:{
      width:'90%',
      backgroundColor:'orange',
      height:50,
     alignSelf:'center',
     borderRadius:20,
     padding:10,
     alignItems:'center',
     justifyContent:'center'
    },
    btnText :{
      fontSize:20,
      fontWeight:'bold',
    },

    textDKvaQMK : {
      
      fontSize:20,
      color:'gray',
      fontWeight:'bold',
      alignSelf:'center',
      marginVertical:20,
    }
})