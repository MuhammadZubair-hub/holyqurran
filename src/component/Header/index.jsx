import { StyleSheet, View,Text } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { scale, vs } from "../../utils/theme/responsive"
import { Colors } from "../../utils/theme/colors"
import auth from '@react-native-firebase/auth'
import { showMessage } from "react-native-flash-message"
import { Commonstyle } from "../../utils/shared/Style/globalstyle"
import { useSelector } from "react-redux"
import { getUser } from "../../utils/shared/redux/Userslice"
import { useEffect } from "react"
import { combineSlices } from "@reduxjs/toolkit"

const MyHeader =({username})=>{

    //const user_name = useSelector(getUser);
    //const user = auth().currentUser;

    // useEffect(()=>{
    //     console.log('the user name is :' , user);
    // },[])
    
    const handleLogout = async ()=>{
        try {
                    await auth().signOut();
                    showMessage({
                        message:'Sucessfully logout ',
                        description:'om',
                        type:'success',
                    })
        
                } catch (error) {
                    showMessage({
                        message:"Cant logout ",
                        description:'Try again',
                        type:'danger',
                        style:Commonstyle.error,
                    })
                }
    }

    return(
        <View style ={styles.headermaincontianer}>
            <View style ={styles.headercontainer}>
                <Ionicons 
                name="person-circle-outline"
                size={vs(40)} 
                color={Colors.golden} />
                <Text style={{fontSize:vs(20), color:Colors.golden }}>{username} </Text>
            </View>
            <View style ={styles.headercontainer}>
                <Ionicons 
                onPress={handleLogout}
                name="log-out-outline"
                size={vs(40)} 
                color={Colors.golden} />
            </View>
        </View>
    )
}

export default MyHeader

const styles = StyleSheet.create({

    headermaincontianer:{
        justifyContent:'space-between',
        flexDirection:'row',
        paddingVertical:scale(15),
        paddingHorizontal:scale(15),
        backgroundColor:Colors.primary,
        borderBottomRightRadius:vs(20),
        borderBottomLeftRadius:vs(20),
        
    },
    headercontainer:{
        flexDirection:'row',
        alignItems:'center',
        columnGap:scale(10)
    },
    headerrightcontainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    icon:{
        marginLeft:vs(10),
    }

})