import { Alert, Image, StyleSheet, Text, View } from "react-native"
import { Colors } from "../utils/theme/colors"
import Input from "../component/Input/Input"
import { useState } from "react"
import { scale, vs } from "../utils/theme/responsive"
import Buton from "../component/Button/Buton"
import { loginUser, registerUser } from "../services/auth"

const Signup = ()=>{

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
            Alert.alert('Success','Verfication emial has been sent to you email');
            setEmail(''),
            setConfirmpassword(''),
            setPassword('')
            
            
        } catch (error) {
            Alert.alert('sorry yar ',error.message)
        }
    }

    return(
        <View style={styles.maincontainer}>
            <View style={styles.logoContainer}>
                <Image 
                source={require('../assets/images/mainlogo.png')} 
                style={styles.logoImage}
                resizeMode="contain"
                />
            </View>
            
            <View style={styles.secondmidcontainer}>
                <Text style={{color:Colors.primary ,fontSize:scale(50),fontFamily:'bold', fontWeight:'600', textAlign:'center' }}>
                     Sign up
                </Text>
                <View style={{rowGap:vs(40)}}>
                    <Input 
                    Value={email} 
                    placeholder='Enter email' 
                    onChange={setEmail} 
                    iconname={'mail-outline'} ></Input>
                    <Input 
                    Value={password} 
                    placeholder='Enter password' 
                    onChange={setPassword} 
                    iconname={'lock-closed-outline'} righticon={true} ></Input>
                    <Input 
                    Value={confirmpassword} 
                    placeholder='Enter password' 
                    onChange={setConfirmpassword} 
                    iconname={'lock-closed-outline'} righticon={true} ></Input>
                </View>
                <Buton 
                    buttontitle='Login'
                    paddingvertical={vs(15)} 
                    onpress={handleRegister} >

                </Buton>
            </View>
        </View>
    )
}

export default Signup

export const styles = StyleSheet.create({
    maincontainer:{
       flex:1,
        justifyContent:'flex-end',
        backgroundColor:Colors.primary,

    },
    firstmidconatianer:{
    
        backgroundColor:Colors.primary,
        height:'25%',
        width:'100%',
    },
    secondmidcontainer:{
        justifyContent:'space-between',
        padding:30,
        backgroundColor:Colors.whiteaccent,
        rowGap:20,
        borderTopRightRadius:40,
        borderTopLeftRadius:40,
        height:"70%",
      
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Colors.primary,
      },
      
      logoImage: {
        width: '100%',
        height: '100%',
      },
})