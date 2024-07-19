import { Alert, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ButtonSetting from '../comps/ButtonSetting'
import { useDispatch, useSelector } from "react-redux";
import { doiTheme } from '../redux/reducers/themeReducer';
import { firebase } from '@react-native-firebase/auth';
const ManCaiDat = ({navigation}) => {
    const [batModal,setBatModal] = useState(false);
    const auth = firebase .auth();
    const theme = useSelector(state => state.theme.theme);
    const dispatch = useDispatch();
    const thayDoiTheme = () => {
        dispatch(doiTheme(theme));
     
      }

      const isBatModal = ()=>{
        setBatModal(!batModal);
      }
  return (
    <View  style={
        {height: '100%',
       
        backgroundColor:theme ? 'black' : 'white'}
    }>
        <Text style={[styles.textItem,{fontSize:40,fontWeight:'bold',padding:'5%',alignSelf:'center',color:theme ? 'white' : 'black'}]}>Cài đặt</Text>

        <View style={{gap:20}}>
            <Pressable onPress={()=>{navigation.navigate('ManContact')}}>
                 <ButtonSetting title={"Thông tin cá nhân"}/>
            </Pressable>

            <Pressable onPress={()=>{isBatModal()}}>
                <ButtonSetting title={"Cấu hình"}/>
            </Pressable>

            <Pressable onPress={()=>{thayDoiTheme()}}>
                
                <ButtonSetting title={"Đổi theme"}/>
                <Modal
                animationType='slide'
                 transparent={true}
                visible={batModal}
                onRequestClose={isBatModal}>

                    <View style={{flex:1,backgroundColor:theme ? 'black' : 'white',alignItems:'center'}}>


                    <Text  style={{fontSize:40,fontWeight:'bold',color:theme ? 'white' : 'black',alignSelf:'center',marginBottom:60}}>Configuration</Text>


                    <View style={{height:'100%',width:'100%' ,alignItems:'center'}}>
                    <Text  style={{fontSize:20,fontWeight:'bold',color:theme ? 'white' : 'black'}}>CPU Ryzen 5000</Text>
                    <Text  style={{fontSize:20,fontWeight:'bold',color:theme ? 'white' : 'black',}}>GPU GTX 1650</Text>
                    <Text  style={{fontSize:20,fontWeight:'bold',color:theme ? 'white' : 'black',}}>Ram 16gb</Text>
                    <Text  style={{fontSize:20,fontWeight:'bold',color:theme ? 'white' : 'black',marginBottom:60}}>SSD 240gb</Text>

                    
                    <Pressable onPress={()=> {isBatModal()}}>
                            <View style={{width:120,height:50,backgroundColor:'orange',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                                <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Quay lại</Text>
                            </View>
                        </Pressable>
                    </View>

                    </View>

                    

                </Modal>
            </Pressable>

            <Pressable onPress={()=>{navigation.replace('ManLogin'); auth.signOut()}}>
                <ButtonSetting title={"Đăng xuất"}/>
            </Pressable>

            
        </View>
        
    </View>
  )
}

export default ManCaiDat

const styles = StyleSheet.create({})