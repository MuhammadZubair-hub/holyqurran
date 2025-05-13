import { Alert, Image, StyleSheet, Text, View } from "react-native"
import { Colors } from "../utils/theme/colors"
import Input from "../component/Input/Input"
import { useEffect, useState } from "react"
import { scale, vs } from "../utils/theme/responsive"
import Buton from "../component/Button/Buton"
import { loginUser, signInWithGoogle } from "../services/auth"
import { Formik } from "formik"
import { showMessage } from "react-native-flash-message"
import Basescreen from "../component/Basescreen"
import { Commonstyle } from "../utils/shared/Style/globalstyle"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { getUser } from "../utils/shared/redux/Userslice"
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Web_id } from "../utils/constant/endpoint"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const Login = ()=>{


    useEffect(()=>{

      GoogleSignin.configure({
          webClientId: Web_id
            });
    },[])

    const navigation = useNavigation();
    const [loading,setLoading] = useState(false);
    
    const handleGoogleLogin = async () => {
          try {
            setLoading(true);
            const userCredential = await signInWithGoogle();
            setLoading(false);
            console.log('User Info:', userCredential.user.displayName);
            showMessage({
              message: 'Logged in with Google',
              type: 'success',
            });
          } catch (error) {
            showMessage({
              message: 'Login failed',
              description: error.message,
              type: 'danger',
            });
          }
        };

    const handleLogin = async (values) => {
        const { email, password } = values;
        
      
        if (!email || !password) {
          showMessage({
            message: 'Missing Fields',
            description: 'Please enter both email and password',
            type: 'danger',
            style: Commonstyle.error,
          });
          return;
        }
      
        try {
          const { emailVerfied } = await loginUser(email, password);
      
          if (emailVerfied) {
            showMessage({
              message: 'Login Successful',
              description: `Welcome back, ${email}!`,
              type: 'success',
              style:Commonstyle.sucsses,
            });
            setLoading(false);
            navigation.navigate('Home');
          } else {
            showMessage({
              message: 'Unauthorized',
              description: 'You are not authorized to login.',
              type: 'danger',
              style: Commonstyle.error,
            });
          }
        } catch (error) {
          showMessage({
            message: 'Login Error',
            description: error.message ,
            type: 'danger',
            style: Commonstyle.error,
          });
        }
      };

    return(
        <Basescreen scroable={true} >
          <View style={Commonstyle.maincontainer}>
            <View style={Commonstyle.logoContainer}>
                <Image 
                source={require('../assets/images/quranpic.png')} 
                style={Commonstyle.logoImage}
                resizeMode="contain"
                />
            </View>
            
            
                <Formik
                  initialValues={{email :'' , password : ''}}
                  onSubmit={handleLogin}>
                  {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      
                  })=>(
                    <View style={Commonstyle.secondmidcontainer}>
                        <Text style={{ color: Colors.primary, fontSize: scale(40), fontFamily: 'bold', fontWeight: '600', textAlign: 'center' }}>
                            Login
                        </Text>
                        <View style={{ rowGap: vs(40) }}>
                            <Input
                                value={values.email}
                                placeholder='Enter email'
                                onChange={handleChange('email')}
                                onBlur={handleBlur('email')}
                                iconname={'mail-outline'}></Input>
                            <Input
                                value={values.password}
                                placeholder='Enter password'
                                onChange={handleChange('password')}
                                onBlur={handleBlur('password')}
                                iconname={'lock-closed-outline'} righticon={true}></Input>
                            <View style={{flexDirection:'row', justifyContent:"flex-end" }}>
                                <Text style={{color:Colors.secondary}}>Don't have account ? </Text>
                                <Text style={{color:Colors.primary}} onPress={()=>navigation.navigate('Signup')} >Sign Up</Text>
                            </View>
                            <Text style={{color:Colors.primary , textAlign:'right'}} onPress={()=>navigation.navigate('Forgetpassword')} >Forget password</Text>
                             <Buton
                                buttontitle='Login'
                                paddingvertical={vs(10)}
                                onpress={handleSubmit}>

                            </Buton>
                            <Buton
                                //isLoading={loading}
                                buttontitle='Continue with Google'
                                buttonicon="logo-google"
                                paddingvertical={vs(10)}
                                onpress={handleGoogleLogin}>

                            </Buton>
                        </View>
                        </View>
                    )}
                </Formik>
                
           </View>
        </Basescreen>
    )
}

export default Login
