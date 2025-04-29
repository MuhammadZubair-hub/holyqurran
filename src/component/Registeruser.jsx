import { useState } from "react"
import { Alert, StyleSheet, TextInput, TouchableOpacity, View ,Text} from "react-native"
import { registerUser } from "../services/auth";

const Registeruser =()=>{

    const [email,setEmail]= useState('');
    const [password,setPassword] = useState('');
    const [confirmpassword,setConfirmpassword] = useState('');

    const handleRegister = async ()=>{
        if(password !== confirmpassword){
            Alert.alert('Sorry','password not match');
            return
        }
        try {

            await registerUser(email,password);
            Alert.alert('Success','Verfication eamil has been sent to you email');
            setEmail(''),
            setConfirmpassword(''),
            setPassword('')
            
            
        } catch (error) {
            Alert.alert('sorry yar ',error.message)
        }
    }

    return (
        <View style={styles.maincoantiner}>

            <Text style={styles.maintext} >SIGN IN</Text>

            <TextInput
            placeholder="Enter email"
            onChangeText={setEmail}
            style={styles.inputfild}
            />
            <TextInput
            placeholder="Enter password"
            onChangeText={setPassword}
            
            style={styles.inputfild}
            />
            <TextInput
            placeholder="confirm password"
            onChangeText={setConfirmpassword}
            
            style={styles.inputfild}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttontext} >Register</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Registeruser

const styles = StyleSheet.create({
    maincoantiner:{
        
        rowGap:20,
        justifyContent:'space-between',
        //alignItems:'center',
        backgroundColor:'rgba(255,255,255,0.2)',
        borderRadius:10,
        padding:10,
        width:'90%',
        height:'auto'
    },
    maintext:{
        color:'red',
        fontSize:40,
        fontFamily:"bold",
        alignSelf:'center'

    },
    inputfild:{
        borderRadius:10,
        borderColor:'red',
        borderWidth:1,
        color:'black',
    },
    button:{
        backgroundColor:'red',
        borderRadius:10,
        alignItems:'center',
        paddingVertical:10,
        width:'100%',

    },
    buttontext:{
        color:'white',
        fontSize:20,
    }
})