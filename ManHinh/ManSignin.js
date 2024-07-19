import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import { firebase } from '@react-native-firebase/auth';
import API from '../API';

export default function ManSignin({navigation}) {
  const [duLieu,setDuLieu] = useState([]);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [repassword,setRePassword] = useState('');
  const idp4 = API;

  const auth = firebase.auth();

  
  const DangKi = () => {
    const newCustomer = {
      ten :name,
      tenND: email,
      matKhau:password
    }
    fetch(`http://${idp4}:3000/TaiKhoan`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCustomer),
    }).then(res => {
      if(res.ok){

        auth.createUserWithEmailAndPassword(email,password).then(()=>{
          console.log("ok");
        }).catch((error)=>{
          console.log(error);
        })
        console.log('Đăng ký thành công');
        

        navigation.replace('ManLogin');
      }else{
        console.log('Thua');

      }
    })
  }

  
  const ThemTaiKhoan = () => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    
      if(name.length == 0|| email.length == 0||password.length == 0|| repassword.length == 0 ){
        
        alert('Bạn nhập thiếu');
      }else if(password != repassword){
        alert('Bạn nhập mật khẩu không trùng khớp');
      }else {
        const isValidEmail = emailRegex.test(email);

        if (isValidEmail) {
          // Email hợp lệ
          alert('Đăng kí thành công');
          DangKi();
        } else {
          // Email không hợp lệ
          alert('Email sai');
        }

    }
  }


  
  return (
   
     <View style={{
      backgroundColor:'black',
      height:'100%',
    }}>
      <ScrollView>
      {/* Wellcom */}
     <View style={styles}>
      <Image source={{uri:'https://anhdepfree.com/wp-content/uploads/2018/08/anh-nen-may-tinh-dep-nhat-2017.jpg'}}
      style={styles.containerImg}/> 


      <Text style={{marginVertical:20,fontWeight:'bold',alignSelf:'center'}}> <Text style={{color:'red',fontSize:20}}>Register to continue</Text></Text>


     </View>

      {/* Edit Text */}
     <View>
     <TextInput style={styles.edtText} placeholder='Name' placeholderTextColor={'gray'} onChangeText={(txt)=> {
        setName(txt);
     }}/>

      <TextInput style={styles.edtText} placeholder='Email' placeholderTextColor={'gray'}  onChangeText={(txt)=> {
        setEmail(txt);
     }} />

      <TextInput style={styles.edtText} placeholder='Password' placeholderTextColor={'gray'}  onChangeText={(txt)=> {
        setPassword(txt);
     }}/>

      <TextInput style={styles.edtText} placeholder='Re type password' placeholderTextColor={'gray'}  onChangeText={(txt)=> {
        setRePassword(txt);
     }}/>
    
     </View>



     {/* Button */}
      <View>
      <Pressable  onPress={()=>{ThemTaiKhoan();
      }} style={styles.btn}>
        <Text style={styles.btnText}>Sign up</Text>
      </Pressable>
      </View>


      {/* Đăng kí và quên mật khẩu */}

    
      <View>
      <Text style={styles.textDKvaQMK} >You have an account? Click<Text onPress={()=>{console.log('Quên mật khẩu');
      }} style={{color:'orange'}}> Sign In</Text></Text>
      </View>
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
      marginVertical:20
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
    },
   
})