import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../../utils/theme/colors"
import { scale, vs } from "../../utils/theme/responsive"
import Ionicons from "react-native-vector-icons/Ionicons"

const Buton =({

    buttontitle,
    buttonicon,
    padding,
    paddingvertical,
    onpress,
    isLoading,
    width,
    })=>{
     return(
        <TouchableOpacity 
            style={[styles.button,{width:width}]}
            onPress={onpress}>
            {isLoading?(
                <ActivityIndicator size={"small"} color={Colors.golden} style={{padding:padding, paddingVertical:paddingvertical}}/>
            ):(
                buttonicon?(
            <View style={styles.iconconatiner}>
                <Ionicons name = {buttonicon} size ={vs(20)} color={Colors.golden}  />
                <Text style={[styles.buttontext,{padding:padding, paddingVertical:paddingvertical }]}>
                {buttontitle}
                </Text>
            </View>
            ):(
                <Text style={[styles.buttontext,{padding:padding, paddingVertical:paddingvertical }]}>
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
        backgroundColor:Colors.primary,
        width:'100%',
        borderRadius:10,
         justifyContent:'center',
        // alignItems:'center'

    },
    buttontext:{
        textAlign:'center',
        color:Colors.golden,
        fontSize:scale(20),
    },
    iconconatiner:{
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    }
})