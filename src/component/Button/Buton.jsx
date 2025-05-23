import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { getAppColors } from "../../utils/theme/colors"
import { scale, vs } from "../../utils/theme/responsive"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNetwork } from "../../services/Networkporvider"

const Buton =({

    buttontitle,
    buttonicon,
    padding,
    paddingvertical,
    onpress,
    isLoading,
    width,
    })=>{

        const {theme} = useNetwork();
        const Colors = getAppColors(theme);

     return(
        <TouchableOpacity 
            style={[styles.button,{width:width,backgroundColor:Colors.primary,}]}
            onPress={onpress}>
            {isLoading?(
                <ActivityIndicator size={"small"} color={Colors.golden} style={{padding:padding, paddingVertical:paddingvertical}}/>
            ):(
                buttonicon?(
            <View style={styles.iconconatiner}>
                <Ionicons name = {buttonicon} size ={vs(20)} color={Colors.golden}  />
                <Text style={[styles.buttontext,{padding:padding, paddingVertical:paddingvertical ,color:Colors.golden, }]}>
                {buttontitle}
                </Text>
            </View>
            ):(
                <Text style={[styles.buttontext,{padding:padding, paddingVertical:paddingvertical,color:Colors.golden, }]}>
                {buttontitle}
                </Text>
            )
            )}
        </TouchableOpacity>
    )
}

export default Buton

const styles = StyleSheet.create({
    button:{
        
        width:'100%',
        borderRadius:10,
         justifyContent:'center',
        // alignItems:'center'

    },
    buttontext:{
        textAlign:'center',
        
        fontSize:scale(20),
    },
    iconconatiner:{
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    }
})