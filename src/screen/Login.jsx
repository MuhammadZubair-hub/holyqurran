import { Alert, Image, StyleSheet, Text, View } from "react-native"
import { Colors } from "../utils/theme/colors"
import Input from "../component/Input/Input"
import { useState } from "react"
import { scale, vs } from "../utils/theme/responsive"
import Buton from "../component/Button/Buton"
import { loginUser } from "../services/auth"

const Login = ()=>{

    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');

    const handleLogin = async ()=>{
            if(!password || !email){
                Alert.alert('ops','enter detials');
                return
            }
            try {
                const {emailVerfied} = await loginUser(email,password);
                if(emailVerfied){
                    Alert.alert('Success','you have login in brother')
                    return
                }
                else {
                    Alert.alert('learn','you are unauthorized person brother')
                    return
                }
                
            } catch (error) {
                Alert.alert('bhai ya eror ha ',error.message);
                
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
                <Text style={{color:Colors.primary ,fontSize:scale(0),fontFamily:'bold', fontWeight:'600', textAlign:'center' }}>
                     Login
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
                </View>
                <Buton 
                    buttontitle='Login'
                    paddingvertical={vs(15)} 
                    onpress={handleLogin} >

                </Buton>
            </View>
        </View>
    )
}

export default Login

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