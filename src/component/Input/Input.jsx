import { StyleSheet, TextInput, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { vs } from "../../utils/theme/responsive"
import { Colors } from "../../utils/theme/colors"
import { useState } from "react"

const Input =(
    {
    
    Value,
    placeholder,
    onChange,
    iconname,
    righticon=false,
    
    })=>{

        const [securetext,setSecuretext] = useState(false);

    return (
        <View style={styles.mainconatiner}>
            <Ionicons 
            name={iconname} 
            size={vs(20)} 
            style={styles.iconStyle}
             />
            <TextInput
            value={Value}
            placeholder={placeholder}
            placeholderTextColor={Colors.primary}
            onChangeText={onChange}
            secureTextEntry={securetext}
            style={styles.inputfield}
            />
            {(righticon)?(
                <Ionicons 
                name = {securetext?'eye-outline':'eye-close-outline'}
                onPress ={setSecuretext(!securetext)}
                size={vs(20)} 
                style={styles.iconStyle} />
            ):(null)

            }
        </View>
    )
}

export default Input


const styles = StyleSheet.create({
    mainconatiner:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        flexWrap:"wrap",
        alignItems:'center',
        borderRadius:20,
        borderWidth:2,
        borderColor:Colors.primary,
        width:'100%',

    },
    inputfield:{
        flex:1,
        color:Colors.primary,
        marginVertical:vs(10),
    },
    iconStyle:{
        color:Colors.primary,
        marginHorizontal:vs(10)
    },
})