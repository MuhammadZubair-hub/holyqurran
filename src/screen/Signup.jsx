import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../utils/theme/colors"
import Input from "../component/Input/Input"
import { useState } from "react"
import { scale, vs } from "../utils/theme/responsive"
import Buton from "../component/Button/Buton"
import { loginUser, registerUser } from "../services/auth"
import Basescreen from "../component/Basescreen"
import { showMessage } from "react-native-flash-message"
import { Commonstyle } from "../utils/shared/Style/globalstyle"
import { Formik } from "formik"
import { useNavigation } from "@react-navigation/native"

const Signup = ()=>{

    

    const navigation = useNavigation();

    const handleRegister = async (values)=>{

        const {email, password, confirmpassword} = values

        if (!email || !password || !confirmpassword) {
                  showMessage({
                    message: 'Missing Fields',
                    description: 'Please enter email and password',
                    type: 'danger',
                    style: Commonstyle.error,
                  });
                  return;
                }
        try {

            await registerUser(email,password);

            showMessage({
                message:'Success',
                description:'Verfication email has been sent to your email',
                type :'success',
                style:Commonstyle.sucsses
            })   
        } catch (error) {
            showMessage({
                message:'Error',
                description:error.message,
                type:'danger',
                style:Commonstyle.error,
            })
        }
    }

    return(
        <Basescreen scroable={true}>
            <View style={Commonstyle.maincontainer}>
            <View style={Commonstyle.logoContainer}>
                <Image 
                source={require('../assets/images/mainlogo.png')} 
                style={Commonstyle.logoImage}
                resizeMode="contain"
                />
            </View>
            
            <View style={Commonstyle.secondmidcontainer}>
                        <Text style={{ color: Colors.primary, fontSize: scale(40), fontFamily: 'bold', fontWeight: '600', textAlign: 'center' }}>
                            Sign Up
                        </Text>
                <Formik
                  initialValues={{email :'mail@.com' , password : 'abcde' ,confirmpassword:'abcde'}}
                  onSubmit={handleRegister}>
                  {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      
                  })=>(
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
                            <Input
                                value={values.confirmpassword}
                                placeholder='confirm password'
                                onChange={handleChange('confirmpassword')}
                                onBlur={handleBlur('confirmpassword')}
                                iconname={'lock-closed-outline'} ></Input>

                            <View style={{flexDirection:'row', justifyContent:"flex-end" }}>
                                <Text style={{color:Colors.secondary}}>Already have an account ? </Text>
                                <Text style={{color:Colors.primary}} onPress={()=>navigation.navigate('Login')} >Login</Text>
                            </View>

                             <Buton
                                buttontitle='Sign up'
                                paddingvertical={vs(10)}
                                onpress={handleSubmit}>

                            </Buton>
                        </View>
                       
                    )}
                </Formik>
                </View>
        </View>
        </Basescreen>
    )
}

export default Signup

 