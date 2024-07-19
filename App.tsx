import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import ManLogin from './ManHinh/ManLogin.js'
import ManSignin from './ManHinh/ManSignin.js'
import ManThich from './ManHinh/ManThich.js'
import ManNhomHome from './ManHinh/ManNhomHome.js'
import ManChao from './ManHinh/ManChao.js'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './redux/store/index.js'
import ManTest from './ManHinh/ManTest.js'


const Stack = createNativeStackNavigator();
export default function App() {

  


  return (
    
    <Provider store={store}>
   <NavigationContainer >
        <Stack.Navigator >
        {/* <Stack.Screen name='ManTest' component={ManTest} options={{headerShown:fa>lse}} / */}
        <Stack.Screen name='ManChao' component={ManChao} options={{headerShown:false}} />

          <Stack.Screen name='ManLogin' component={ManLogin} options={{headerShown:false}} />
          <Stack.Screen name='ManSignin' component={ManSignin} options={{headerShown:false}}/>
          <Stack.Screen name='NhomManHome' component={ManNhomHome} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  
  
  )
}