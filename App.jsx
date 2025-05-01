import { View ,Text, StyleSheet, StatusBar, ActivityIndicator } from "react-native"
import Login from "./src/screen/Login"
import auth from '@react-native-firebase/auth'
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { Colors } from "./src/utils/theme/colors"
import Signup from "./src/screen/Signup"
import FlashMessage from "react-native-flash-message"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { useEffect, useState } from "react"
import Home from "./src/screen/Home"
import Forgetpassword from "./src/screen/Forgetpassword"

const App =()=>{

  const [user,setUser] = useState(null);
  const [intilaizer,setIntilaizer] = useState(true);
  const Stack = createNativeStackNavigator();

  useEffect(()=>{

    const unsusrcibe = auth().onAuthStateChanged(user =>{
      
      setUser(user);
      if(intilaizer) setIntilaizer(false);
    })

    return unsusrcibe;
    
  },[])
  
  if (intilaizer) return <View style={{justifyContent:'center'}}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>

  return(
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar backgroundColor={Colors.primary} barStyle={'light-content'} translucent={false} />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          {user? (
            <Stack.Screen name ='Home' component={Home} />
          ):(
            <>
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name="Forgetpassword" component={Forgetpassword}/>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    <FlashMessage position={'right'} floating={true} />
    </SafeAreaProvider>
    
  )
}
export default App

const styles = StyleSheet.create({

  maincoantiner:{
    flex:1,
    justifyContent:'center',
    backgroundColor:'lightgray',
    
  }

})