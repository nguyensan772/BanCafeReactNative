import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ButtonSetting = ({title}) => {
  return (
    <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'gray',justifyContent:'space-between',padding:10}}>
    <Text style={[styles.textItem,{fontSize:20,fontWeight:'bold',color:"white"}]}>{title}</Text>
    <Image style={{width:45,height:30}} source={{uri:"https://www.clker.com/cliparts/Y/l/U/7/2/Q/plain-arrow-to-the-right-md.png"}}/>

        </View>
  )
}

export default ButtonSetting

const styles = StyleSheet.create({})