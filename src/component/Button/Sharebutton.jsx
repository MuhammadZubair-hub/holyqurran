import { TouchableOpacity } from "react-native"
import Entypo from "react-native-vector-icons/Entypo"
import { Colors } from "../../utils/theme/colors"
import { mvs } from "../../utils/theme/responsive"

const ShareButton =({onpress})=>{
    return(
        <TouchableOpacity style={{ 
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: Colors.primary,
            position: "absolute",
            top: 15,
            //left: 20,
            right:20
            
        }} onPress={onpress}  >
                <Entypo name ='download' 
                color={Colors.golden} 
                size={mvs(20)} 
                style={{ margin: mvs(10) }} />
        </TouchableOpacity>
    )
}

export default ShareButton