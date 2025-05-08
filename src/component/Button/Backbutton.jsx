import { TouchableOpacity, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { mvs } from "../../utils/theme/responsive"
import { Colors } from "../../utils/theme/colors"
import { useNavigation } from "@react-navigation/native"

const Backbutton = ()=>{
    const navigation = useNavigation();
    return(
        <TouchableOpacity style={{ 
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: Colors.primary,
            height: 40,
            width: 40,
            position: "absolute",
            top: 15,
            left: 20,
            
        }}
        onPress={() => navigation.goBack()}
        >
            <Ionicons 
                name={'arrow-back'}
                size={mvs(20)} 
                color={Colors.golden} 
                style={{ margin: mvs(10) }} 
            />
        </TouchableOpacity>
    )
}

export default Backbutton