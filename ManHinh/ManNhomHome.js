import { ActivityIndicator, Alert, Button, FlatList, Image, ImageBackground, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManThich from './ManThich';
import ManGioHang from './ManGioHang';
import ManHoaDon from './ManHoaDon';
import ManCaiDat from './ManCaiDat';
import ManContact from './ManContact';
import Banner from '../comps/Banner';
import { useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchSanPham } from '../redux/actions/sanPhamAction';
import { doiTheme } from '../redux/reducers/themeReducer';
import API from '../API';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const idp4 = API;

var idUser = '';

const ManHome = ({navigation}) => {
   
  const [user,setUser] = useState('');
    const [duLieu,setDuLieu] = useState([]);
    const [duLieuTam, setDuLieuTam] = useState([]);
    const [index,setIndex] = useState(0);

    const [searchText, setSearchText] = useState('');
    const theme = useSelector(state => state.theme.theme);
   
   
    
    
    const getData = async () => {
      try {
        const res = await fetch(`http://${idp4}:3000/SanPham`);
        const json = await res.json();
    
        setDuLieu(json);
        setIndex(duLieu.length);

        setDuLieuTam(json);
      } catch (error) {
        console.log(error);
      }
    }
    
  
  
    // const updateGioHang = (aiDi)=> {
      
    //   fetch(`https://65baf1bfb4d53c066553b895.mockapi.io/SanPham/${aiDi}`,{
    //     method:'PUT',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({gioHang:true,soLuong:1})
    //   }).then((res)=> {res?alert('Ok'):alert('Thua')}).catch((err)=>{console.log(err);})
    // }

    
 
    const getDataUser =async ()=> {
      try {
        const res = await    fetch(`http://${idp4}:3000/TaiKhoan/`+idUser);
        const json = await res.json();
        console.log(`http://${idp4}:3000/TaiKhoan/`+idUser);
        setUser(json);
     
  
      } catch (error) {
        console.log(error);
      }
    }


      //lấy  danh sách dữ liệu từ store của redux
      const listSanPham = useSelector(state => state.listSanPham.listSanPham);
      // lấy đối tượng để điều khiển các action
      const dispatch = useDispatch();
 
      // khi vào ứng dụng sẽ gọi action fetchSanPham để kéo dữ liệu từ API về store của redux
 
      useEffect(()=>{dispatch(fetchSanPham())},[dispatch])
      console.log(listSanPham);
    
    useEffect(()=> {getData();getDataUser()},[]);
    const FlatlistCustom = ({list}) => {

  


      return (
        
        <View style={{alignSelf:'center'}}>
                 {list.map (prop => {
                    if(prop.tenSP.toLowerCase().includes(searchText.toLowerCase())){
                      return(
                        <View  style={[styles.containerItem,]}>
                        <Pressable onPress={()=>{idItem = prop.id , navigation.navigate('ManDetail')}} >
                              
                              <Image style={styles.imgItem} source={{uri:prop.anhSP}}/>
                            
                            <Text  style={styles.textItem}>{prop.tenSP}</Text>
                            </Pressable>  
            
            
                             <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',}} >
                                <Text style={styles.textItem}> <Text style={{color:'orange',fontSize:30}}>$</Text> {prop.giaSP}</Text>
            
                                <Pressable><Text style={styles.btnItem}>+</Text></Pressable>
                             </View>
                      
                        
                          
              
                  </View>
               // <ItemManHome key={row.id} prop={row} navigation={navigation}/>
              )
                    }
                 })}
        </View>
    
      )
    }
 

  // const searchItem = (stxt) => {
    

  //     const filtered = duLieu.filter((item) =>
  //     item.tenSP.toLowerCase().includes(stxt.toLowerCase())

     
      
  //   );
  //   setDuLieuTam(filtered);


  //   // if(stxt ==''){
  //   //   setDuLieuTam(duLieu);
  //   // }

    
  // }
  const [soDem,setSoDem] = useState(0);

  let anh = ["http://3.bp.blogspot.com/-pIummBi6N3M/UeOYg7UCyKI/AAAAAAAAACk/vl5vyv3IuO0/s1600/dienthoaididong_02.jpg","https://phunugioi.com/wp-content/uploads/2021/08/Hinh-anh-hoa-Anh-Dao-dep-nhat.jpg"];

 

    return (

    
        <View style={
            {height: '100%',
          
            backgroundColor:  theme ? 'black' : 'white'}
        }>
          <ScrollView>

          <Banner uri={anh[0]}/>
       
          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:10,paddingHorizontal:20}}>

            {/* Tìm kiếm */}
            <TextInput style={styles.styleInput} placeholder='Find some things ...' placeholderTextColor={'gray'} onChangeText={(txt)=>{
              setSearchText(txt);
          }} />


            <Pressable onPress={()=>{navigation.navigate('ManSetting')}}>
              
                      <View style={{position:'relative' }}>
                        <Image style={{width:50,height:50,borderRadius:100,alignSelf:'center',position:'absolute',zIndex:-1}} source={{uri:"https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"}}/>
                        <Image style={{width:50,height:50,borderRadius:100,alignSelf:'center'}} source={{uri:user.anh}}/>
                     </View>    
            </Pressable>
          </View>




    
          
           
           
          
    
         
          <Text style={{color: theme ? 'white' : 'black',fontWeight:'bold', fontSize:20,marginHorizontal:20  }}>Sản phẩm mới</Text>
       

          <FlatlistCustom  list={listSanPham}/>


            {/* Danh Sách */}
          <Text style={{color:theme ? 'white' : 'black',fontWeight:'bold', fontSize:20,marginHorizontal:20  }}>Sản phẩm hot</Text>
        

          <FlatlistCustom  list={listSanPham}/>



            {/* Danh Sách */}
          <Text style={{color:theme ? 'white' : 'black',fontWeight:'bold', fontSize:20,marginHorizontal:20  }}>Sản phẩm đã xem</Text>
         
           <FlatlistCustom  list={listSanPham}/>

          
    
          </ScrollView>


          
        
        </View>
    
        
      )

}
  

const ManDetail = ({navigation}) => {
    const [spChiTiet,setSpChiTiet] = useState ({}); 
    const [soLuongSP,setSoLuongSP] = useState (0); 
    const [user,setUser] = useState('');
    const [edtCmt,setEdtCmt] = useState (''); 
    const [cmt,setCmt] = useState ([]); 
    let loveColor = 'gray';
    
    if(spChiTiet.yeuThich){
      loveColor = 'red'}


  
    const congSL = () => {
  
      if(soLuongSP == 10){
        setSoLuongSP(10);
      }else{
        setSoLuongSP(soLuongSP + 1);
      }
      console.log(soLuongSP);
    } 


    const truSL = () => {
  
      if(soLuongSP == 0){
        setSoLuongSP(0);
      }else{
        setSoLuongSP(soLuongSP - 1);
      }
      console.log(soLuongSP);
    } 
    const getDataUser =async ()=> {
      try {
        const res = await    fetch(`http://${idp4}:3000/TaiKhoan/`+idUser);
        const json = await res.json();
        console.log(`http://${idp4}:3000/TaiKhoan/`+idUser);
        setUser(json);
     
  
      } catch (error) {
        console.log(error);
      }
    }

    const getDataDetail =async () => {  
        try {
        const res = await fetch(`http://${idp4}:3000/SanPham/`+idItem);
        const json = await res.json();

        setSpChiTiet(json);
          console.log(json);
       
       
        
        } catch (error) {
            console.log(error);
        }

    }

    const getBinhLuan =async () => {  
      try {
    
      const res = await fetch(`http://${idp4}:3000/BinhLuan/`);
      const json = await res.json();

      setCmt(json);
        
     
      
      } catch (error) {
          console.log(error);
      }

  }



   


    useEffect(()=>  {getDataDetail(),getDataUser();getBinhLuan()},[]);

   

    const updateYeuThich = ()=> {
      
      fetch(`http://${idp4}:3000/SanPham/`+idItem,{
   
        method:'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({yeuThich:!spChiTiet.yeuThich})
      }).then((res)=> {res?alert('Ok'):alert('Thua')}).catch((err)=>{console.log(err);})
    }

    const updateGioHang = ()=> {
      
      fetch(`http://${idp4}:3000/SanPham/`+idItem,{
        method:'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({gioHang:true,soLuong:soLuongSP})
      }).then((res)=> {res?alert('Ok'):alert('Thua')}).catch((err)=>{console.log(err);})
    }

    const [refreshing, setRefreshing] = useState(false);

    const postBinhLuan = (txt)=> {
      setRefreshing(true)
      if(edtCmt !== ''){
        const newBinhLuan = {idSp:spChiTiet.id, binhLuan:txt}
      fetch(`http://${idp4}:3000/BinhLuan/`,{
        method:'POST',
        body:JSON.stringify(newBinhLuan)
      }).then((res)=>{res?Alert.alert("ok"):Alert.alert("lỗi") }).finally(()=>{ setRefreshing(false)})
      }

     

    }

    
    const refreshData = () => {
      getDataDetail();
      
    };

    const lamViec = async() => {
      await updateYeuThich();
      await refreshData();
      if(spChiTiet.yeuThich){
        loveColor = 'red'}
      
        console.log(spChiTiet.yeuThich);
    }

    return (
        <View style={{width:'100%',height:'100%'}}>
            
            <View    style={{width:'100%',height:'60%'}}>
              {/* Phần back ground image */}
                <ImageBackground
                
                source={{uri: spChiTiet.anhSP}}
                style={{width:'100%',height:'100%',justifyContent:'space-between'}}
                resizeMode='cover'>

                 
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:10}}>  
                      <Pressable onPress={()=>{
                       
                        navigation.navigate('ManHome')}}>
                          <Image style={{width:30,height:30}} source={{uri:'https://cdn0.iconfinder.com/data/icons/web-seo-and-advertising-media-1/512/218_Arrow_Arrows_Back-512.png'}}/>
                         
                        
                       </Pressable>
                       <Pressable onPress={()=>{lamViec()}}>
                         <Icon style={{color:loveColor}}  name="heart" size={20} color="#900" />
                         
                        
                       </Pressable>
                    </View>


                    <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'rgba(00,00,00,0.5)', width:'100%',height:'25%',borderTopEndRadius:20,borderTopStartRadius:20,padding:20}}>

                        <View style={{justifyContent:'space-between'}}>

                            <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>{spChiTiet.tenSP}</Text>
                            <Text style={{color:'white',fontWeight:'bold'}}><Icon style={{color:'rgba(202, 137, 2, 0.84)'}}  name="star" size={30} color="#900" /> 4.5</Text>
                        </View>


                      
                     
                        {/* Phần bên phải  */}


                    </View>
                </ImageBackground>


            </View>


            <View  style={{width:'100%',height:'30%',backgroundColor:'black',padding:20}}>
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{getBinhLuan()}}/>}
                >
                <Text  style={{fontSize:15,color:'white',fontWeight:'bold'}}>Description</Text>
                <Text  style={{fontSize:15,color:'white',marginBottom:20,}}>{spChiTiet.moTa}</Text>
                

                  <View>
                  <Text  style={{fontSize:15,color:'white',marginBottom:20,fontWeight:'bold'}}>Comment</Text>
                  
                      
                  <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TextInput style={[styles.styleInput,{width:"80%",marginTop:10}]} placeholder='What do you fell...?' placeholderTextColor={'gray'} onChangeText={(txt)=> {setEdtCmt(txt),getBinhLuan()}}  />
                        
                    <TouchableOpacity onPress={()=>{postBinhLuan(edtCmt)}}>

                        <View style={{backgroundColor:'blue' ,height:50,width:50,justifyContent:'center',marginTop:10,borderRadius:10}}>
                        <Text style={{fontSize:15,color:'white',fontWeight:'bold',textAlign:'center'}}>Gửi</Text>

                        </View>
                      </TouchableOpacity>

                 
                 </View>
                
                 {
                  cmt.map((item) =>{
                    if(item.idSp == spChiTiet.id){

                      return(
                        <View key={item.id} style={{flexDirection:'row',gap:20 , backgroundColor:'gray',marginVertical:5  ,padding:10,borderRadius:10}}>
                         
                            <Text style={[styles.textItem,{fontSize:15}]}>{item.binhLuan}</Text>
                        </View>
                      )

                    }
                      
                  } )
                 }
                 

                    

                  </View>
                </ScrollView>
                
              
                 
            </View>


            <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',width:'100%',height:'10%',backgroundColor:'brown',paddingHorizontal:20,paddingVertical:10}}>
               
            
               
               
                <View>
                    <Text style={{fontSize:10,color:'white'}}>Price</Text>
                    <Text style={{fontSize:20,color:'white',fontWeight:'bold'}} ><Icon style={{color:'rgba(202, 137, 2, 0.84)'}}  name="dollar" size={20} color="#900" /> {spChiTiet.giaSP}</Text>
                </View>

                <View style={{flexDirection:'row'}}>
                        <Pressable onPress={()=>{truSL()}}>

                        <View style={{backgroundColor:'orange',width:30,height:30,borderRadius:10,justifyContent:'center'}}>
                              <Text  style={{fontSize:20,color:'white',alignSelf:'center',justifyContent:'center'}}>-</Text>
                              
                        </View>
                        </Pressable>

                           <View style={{backgroundColor:'orange',width:30,height:30,borderRadius:10,justifyContent:'center'}}><Text style={{fontSize:20,color:'white',alignSelf:'center'}}>{soLuongSP}</Text></View>

                        <Pressable onPress={()=>{congSL()}}>
                        <View style={{backgroundColor:'orange',width:30,height:30,borderRadius:10,justifyContent:'center'}}>
                              <Text  style={{fontSize:20,color:'white',alignSelf:'center',justifyContent:'center'}}>+</Text>
                        </View>
                        </Pressable>

                </View>

                <View>
                    <Pressable onPress={()=>{updateGioHang()}}>
                      <View style={{backgroundColor:'orange',width:200,height:'100%',borderRadius:10,padding:10,justifyContent:'center'}}>
                        <Text style={{fontSize:20,color:'white',alignSelf:'center'}}>Add to cart</Text></View>
                    </Pressable>
                </View>

                
            </View>
               
            

        </View>
    )

}
  
 

const ManSetting = ({navigation}) => {
  const [user,setuser] = useState({});



  const [anhUser,setAnhUser] = useState('');
  const [emailUser,setEmailUser] = useState('');
  const [oldPassUser,setoldPassUser] = useState('');
  const [newPassUser,setnewPassUser] = useState('');
  const [tenUser,setTenUser] = useState('');
  const getDataUser =async ()=> {
    try {
      const res = await    fetch(`http://${idp4}:3000/TaiKhoan/`+idUser);
      const json = await res.json();

      setuser(json);
      setTenUser(json.ten);
      setEmailUser(json.tenND);
      setAnhUser(json.anh);


    } catch (error) {
      console.log(error);
    }
  }

  const capNhatTaiKhoan = () => {

    const upND = {
      tenND: emailUser,
      matKhau: newPassUser,
      ten: tenUser,
      anh: anhUser,
    }

      fetch(`http://${idp4}:3000/TaiKhoan/`+idUser ,{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(upND)
      }).then((res)=>{
        if(res.ok){
          console.log('Thành công');
        }else{
          console.log('Lỗi');

        }
      }).catch(err=>console.log(err))
  }
  const ThemTaiKhoan = () => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    
      if(tenUser.length == 0|| emailUser.length == 0 ){
        
        alert('Bạn nhập thiếu');
      }else if((oldPassUser != user.matKhau) &&  oldPassUser.length != 0){
        alert('Mật khẩu cũ nhập sai')
      }else {
        const isValidEmail = emailRegex.test(emailUser);

        if (isValidEmail) {
          // Email hợp lệ
          alert('Thay đổi thành công');
          capNhatTaiKhoan();
        } else {
          // Email không hợp lệ
          alert('Email sai');
        }

    }
  }

  useEffect(()=>{getDataUser()} ,[]);
  
  return(
    <View style={{backgroundColor:'black',flex:1,padding:10}}>
         <Text  style={{fontSize:40,fontWeight:'bold',color:'white',alignSelf:'center'}}>Hồ sơ</Text>
       <View style={{position:'relative'}}>
          <Image style={{width:80,height:80,borderRadius:100,alignSelf:'center',position:'absolute',zIndex:-1}} source={{uri:"https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"}}/>
            <Image style={{width:80,height:80,borderRadius:100,alignSelf:'center'}} source={{uri:user.anh}}/>
       </View>

       <Text  style={{fontSize:20,fontWeight:'bold',color:'white'}}>Nhập tên: </Text>
       <TextInput placeholder='Nhập tên' onChangeText={(txt)=>{
          setTenUser(txt)
       }} value={tenUser} style={{width:'100%',height:40,borderColor:'white',marginBottom:10,borderWidth:1,borderRadius:10,backgroundColor:'gray',color:'black'}}/>


      <Text  style={{fontSize:20,fontWeight:'bold',color:'white'}}>Nhập email: </Text>
      <TextInput placeholder='Nhập email' onChangeText={(txt)=>{
                setEmailUser(txt)
            }} value={emailUser} style={{width:'100%',height:40,borderColor:'white',marginBottom:10,borderWidth:1,borderRadius:10,backgroundColor:'gray',color:'black'}}/>


      <Text  style={{fontSize:20,fontWeight:'bold',color:'white'}}>Nhập link ảnh: </Text>
      <TextInput placeholder='Nhập link ảnh' onChangeText={(txt)=>{
                setAnhUser(txt)
            }} value={anhUser} style={{width:'100%',height:40,borderColor:'white',marginBottom:10,borderWidth:1,borderRadius:10,backgroundColor:'gray',color:'black'}}/>
         
         {/* Thay dổi mật khẩu */}
         
         <Text  style={{fontSize:20,fontWeight:'bold',color:'white'}}>Nhập mật khẩu cũ: </Text>
      <TextInput placeholder='Nhập mật khẩu cũ' onChangeText={(txt)=>{
                setoldPassUser(txt)
            }}  style={{width:'100%',height:40,borderColor:'white',marginBottom:10,borderWidth:1,borderRadius:10,backgroundColor:'gray',color:'black'}}/>
         
         <Text  style={{fontSize:20,fontWeight:'bold',color:'white'}}>Nhập mật khẩu mới: </Text>

      <TextInput placeholder='Nhập mật khẩu mới' onChangeText={(txt)=>{
                setnewPassUser(txt)
            }} style={{width:'100%',height:40,borderColor:'white',marginBottom:10,borderWidth:1,borderRadius:10,backgroundColor:'gray',color:'black'}}/>
         
         
         
         <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
            <Pressable onPress={()=> {navigation.navigate('ManHome')}}>
                <View style={{width:120,height:50,backgroundColor:'red',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                  <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Hủy</Text>
                </View>
            </Pressable>

            <Pressable onPress={()=> {ThemTaiKhoan()}}>
                <View style={{width:120,height:50,backgroundColor:'orange',alignItems:'center',justifyContent:'center',borderRadius:10}}>
                  <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Xác nhận</Text>
                </View>
            </Pressable>
         </View>
         
       </View>
        )

        
}
    
const NhomBottom = ({navigation}) => {
  const theme = useSelector(state => state.theme.theme);
  return(
    <Tab.Navigator        screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'ManHome') {
          iconName = focused ? 'tomato' : 'gray'
          return <Icon style={{color:iconName}}  name="home" size={size} color="#900" />

        } else if (route.name === 'ManGioHang') {
          iconName = focused ? 'tomato' : 'gray'
          return <Icon style={{color:iconName}}  name="star" size={size} color="#900" />


        }else if (route.name === 'ManThich') {
          iconName = focused ? 'tomato' : 'gray'
          return <Icon style={{color:iconName}}  name="heart" size={size} color="#900" />

        }else if (route.name === 'ManHoaDon') {
          iconName = focused ? 'tomato' : 'gray'
          return <Icon style={{color:iconName}}  name="money" size={size} color="#900" />

        }else if (route.name === 'ManCaiDat') {
          iconName = focused ? 'tomato' : 'gray'
          return <Icon style={{color:iconName}}  name="gear" size={size} color="#900" />

        }

        
      },

      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerShown:false,
      tabBarStyle:{
        backgroundColor: theme ? 'white' : 'black'
      }
    })} >


        <Tab.Screen name='ManHome' component={ManHome} options={{title:'Home'}} />
        <Tab.Screen name='ManGioHang' component={ManGioHang} options={{title:'Cart'}}/>
        <Tab.Screen name='ManThich' component={ManThich}   options={{title:'Like'}}/>
        <Tab.Screen name='ManHoaDon' component={ManHoaDon} options={{title:'Bill'}}/>
        <Tab.Screen name='ManCaiDat' component={ManCaiDat} options={{title:'Settings'}}/>
    </Tab.Navigator>
  )
}

const ManNhomHome = ({route,navigation}) => {
  const {itemID} = route.params;
  idUser = itemID;

  console.log(idUser);
  return (

        
        <Stack.Navigator initialRouteName='ManHome' options={{headerShown:false}}>

            {/* <Stack.Screen name='ManHome' component={ManHome} options={{headerShown:false}} /> */}
            <Stack.Screen name='NhomBottom' component={NhomBottom} options={{headerShown:false}}/>
            <Stack.Screen name='ManDetail' component={ManDetail} options={{headerShown:false}} />
            <Stack.Screen name='ManSetting' component={ManSetting} options={{headerShown:false}} />
            <Stack.Screen name='ManContact' component={ManContact} options={{headerShown:false}} />


        </Stack.Navigator>

  )
}

export default ManNhomHome

const styles = StyleSheet.create({
  checkbox: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
    containerItem : {
       width:'48%',
       height:300,
        marginHorizontal:'1%',
       marginBottom:20,
       backgroundColor:'gray',
       borderRadius:20,
       padding:10,
      

    },
    textItem :{
        color:'white',
        fontSize:30,
    },
    imgItem : {
        width :'100%',
        height: 170,
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
        width:'80%',
        height:50,
        alignSelf:'center',
        borderWidth:2,
        borderColor:'gray',
        borderRadius:20,
        padding:10,
        color:'white',
        marginRight:10
  
    },
    imgIcon : {
      width:40,
      height:40,
      color:'black'
    },

})