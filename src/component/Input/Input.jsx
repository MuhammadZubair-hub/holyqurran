import { StyleSheet, TextInput, View } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { vs } from "../../utils/theme/responsive"
import { Colors } from "../../utils/theme/colors"
import { useState } from "react"

const Input =(
    {
    
    value,
    placeholder,
    onChange,
    iconname,
    righticon=false,
    onBlur
    
    })=>{

        const [securetext,setSecuretext] = useState(true);

        const toggle =()=>{
            setSecuretext(prevState=> !prevState)
        }

    return (
        <View style={styles.mainconatiner}>
            <Ionicons 
            name={iconname} 
            size={vs(20)} 
            style={styles.iconStyle}
             />
            <TextInput
            value={value}
            placeholder={placeholder}
            placeholderTextColor={Colors.primary}
            onChangeText={onChange}
            secureTextEntry={securetext && righticon}
            onBlur={onBlur}
            style={styles.inputfield}
            />
            {(righticon)?(
                <Ionicons 
                name = {(securetext)? 'eye-off-outline':'eye-outline'}
                onPress ={toggle}
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
        color:Colors.golden,
        marginVertical:vs(10),
    },
    iconStyle:{
        color:Colors.golden,
        marginHorizontal:vs(10)
    },
})