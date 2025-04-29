import { View ,Text, StyleSheet, StatusBar } from "react-native"
import Registeruser from "./src/component/Registeruser"
import Loginuser from "./src/component/Loginuser"
import Login from "./src/screen/Login"
import Basescreen from "./src/component/Basescreen"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { Colors } from "./src/utils/theme/colors"
import Signup from "./src/screen/Signup"

const App =()=>{

  

  return(
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar backgroundColor={Colors.whiteaccent} barStyle={'dark-content'} translucent={false} />
      <Basescreen scroable ={true} >
      {/* <Login></Login> */}
      <Signup></Signup>
    </Basescreen>
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