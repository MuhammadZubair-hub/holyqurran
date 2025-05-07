import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { Colors } from "../../utils/theme/colors"
import { scale } from "../../utils/theme/responsive"

const Buton =({

    buttontitle,
    padding,
    paddingvertical,
    onpress,
    })=>{
     return(
        <TouchableOpacity 
            style={styles.button}
            onPress={onpress}>
            <Text style={[styles.buttontext,{padding:padding, paddingVertical:paddingvertical }]}>{buttontitle}</Text>
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
    }
})