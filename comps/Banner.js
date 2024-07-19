import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Banner = ({uri}) => {
   
  return (
    <View>
  
      <Image source={{uri:uri}} style={{width:"100%",height:100,marginBottom:20}}/>
    </View>
  )
}

export default Banner

const styles = StyleSheet.create({})