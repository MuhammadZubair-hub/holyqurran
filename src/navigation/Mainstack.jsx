import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useState ,useEffect} from "react";
import { ActivityIndicator, View,Text } from "react-native"
import Home from "../screen/Home";
import Signup from "../screen/Signup";
import Login from "../screen/Login";
import Forgetpassword from "../screen/Forgetpassword";
import auth from '@react-native-firebase/auth'
import { useDispatch } from "react-redux";
import { store } from "../utils/shared/redux/store";
import { setUserData } from "../utils/shared/redux/Userslice";
import { SetUData } from "../utils/constant/asyncstorage";
import QuranDetial from "../screen/Qurandetial";
import ReferencesScreen from "../screen/Refrencesscreen";
import ReciteQuran from "../screen/ReciteQuran";
import ReciteQuranBy from "../screen/ReciteQuranBy";
import { useNetwork } from "../services/Networkporvider";
import { Colors } from "../utils/theme/colors";
import Nointernet from "../component/Nointernet";

const Mainstack = ()=>{

    const Stack = createNativeStackNavigator();
    const {isconnected} = useNetwork();
    const [user,setUser] = useState(null);
    const [intilaizer,setIntilaizer] = useState(true);

    

  useEffect(()=>{

    const unsusrcibe = auth().onAuthStateChanged(user =>{
      
      setUser(user);
      if(intilaizer) setIntilaizer(false);
    })

    return unsusrcibe;
    
  },[user])

  if(!isconnected)
     return <Nointernet/>
  
  if (intilaizer) return <View style={{ flex:1,justifyContent:'center' , alignItems:'center'}}>
        <ActivityIndicator size="large" color={Colors.primary}/>
      </View>

    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
          {user && user.emailVerified?  (
            <>
            <Stack.Screen name ='Home' component={Home} />
            <Stack.Screen name ='QuranDetial' component={QuranDetial} />
            <Stack.Screen name ='Refrencesscr' component={ReferencesScreen} />
            <Stack.Screen name='ReciteQuran' component={ReciteQuran}/>
            <Stack.Screen name='ReciteQuranBy' component={ReciteQuranBy}/>
            </>
            
          ):(
            <>
            <Stack.Screen name='Signup' component={Signup} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name="Forgetpassword" component={Forgetpassword}/>
            </>
          )}
        </Stack.Navigator>
    )
}

export default Mainstack