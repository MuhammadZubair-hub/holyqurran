import { Text, View } from "react-native"
import Buton from "../component/Button/Buton"
import auth from '@react-native-firebase/auth'
import { showMessage } from "react-native-flash-message"
import { Commonstyle } from "../utils/shared/Style/globalstyle"
import Basescreen from "../component/Basescreen"
import MyHeader from "../component/Header"
import { Colors } from "../utils/theme/colors"

const Home = ()=>{

    const handleLogout = async ()=>{
        try {
            await auth().signOut();
            showMessage({
                message:'Sucessfully logout ',
                description:'om',
                type:'success',
                
            })

        } catch (error) {
            showMessage({
                message:'Cant logout ',
                description:'Try again',
                type:'danger',
                style:Commonstyle.error,
            })
        }
    }

    return(
        
        <Basescreen scroable={false} containerstyle={{backgroundColor:Colors.whiteaccent}}>
            <MyHeader></MyHeader>
            <View>
                <Text>you are in home screen </Text>
                <Buton buttontitle={'logout'} onpress={handleLogout} ></Buton>
            </View>
        </Basescreen>
    )
}

export default Home