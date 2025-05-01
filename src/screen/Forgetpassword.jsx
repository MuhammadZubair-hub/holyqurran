import { Form, Formik } from "formik"
import Basescreen from "../component/Basescreen"
import { showMessage } from "react-native-flash-message"
import { Commonstyle } from "../utils/shared/Style/globalstyle"
import { resetpassword } from "../services/auth"
import { View, Text } from "react-native"
import { Colors } from "../utils/theme/colors"
import { useNavigation } from "@react-navigation/native"

const Forgetpassword =()=>{

    const navigation = useNavigation();
    const resetPassword = async (values)=>{

        const {email} = values;

        if(!email){
            showMessage({
                message:'Enter mail',
                type:'danger',
                style:Commonstyle.error,
            })
        }
        try {
            await resetpassword(email);
            showMessage({
                message:'Sucess',
                description:'Reset email has been sent on your mail',
                type:'success'
            })
        } catch (error) {
            showMessage({
                message:error.message,
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
            
            
                <Formik
                  initialValues={{email :''}}
                  onSubmit={resetPassword}>
                  {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      
                  })=>(
                    <View style={Commonstyle.secondmidcontainer}>
                    
                        <View style={{ rowGap: vs(40) }}>
                            <Input
                                value={values.email}
                                placeholder='Enter email'
                                onChange={handleChange('email')}
                                onBlur={handleBlur('email')}
                                iconname={'mail-outline'}></Input>
                            <View style={{flexDirection:'row', justifyContent:"flex-end" }}>
                                <Text style={{color:Colors.secondary}}>Back to Login </Text>
                                <Text style={{color:Colors.primary}} onPress={()=>navigation.navigate('Login')} >Login</Text>
                            </View>
                             <Buton
                                buttontitle='Reset password'
                                paddingvertical={vs(15)}
                                onpress={handleSubmit}>

                            </Buton>
                        </View>
                    </View>
                    )}
                </Formik>
                
           </View>
        </Basescreen>
    )
}

export default Forgetpassword