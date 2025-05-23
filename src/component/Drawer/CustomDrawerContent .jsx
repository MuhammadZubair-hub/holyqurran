import {
  DrawerContentScrollView,
  DrawerItemList,DrawerItem
} from '@react-navigation/drawer';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { getAppColors } from '../../utils/theme/colors';
import { scale, vs } from '../../utils/theme/responsive';
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from '@react-native-firebase/auth'
import { showMessage } from 'react-native-flash-message';
import { Commonstyle } from '../../utils/shared/Style/globalstyle';
import { useNetwork } from '../../services/Networkporvider';
import { useState } from 'react';

const CustomDrawerContent =(props)=>{

    const {theme , toggleTheme} = useNetwork();
    const Colors = getAppColors(theme);

    const [isEnabled, setIsEnabled] = useState(false);
    // const toggleSwitch = () => {
    //     toogleTheme();
    //     setIsEnabled(previousState => !previousState);

    // }

    const ToggleDrawer =()=>{
        props.navigation.toggleDrawer();
    }
    
    const handleLogout = async ()=>{
        try {
                    await auth().signOut();
                    showMessage({
                        message:'Sucessfully logout ',
                        description:'om',
                        type:'success',
                        style:Commonstyle.sucsses,
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

    const isDarkmode = true;
    const isDark = theme === 'dark';

    return(
    <DrawerContentScrollView  style={[drawerstyle.drawerContainer,{backgroundColor: Colors.whiteaccent,}]} {...props}>
      
      <View style={drawerstyle.drawerHeaderContainer}>
        <Ionicons
            name ="close-outline"
            color ={Colors.primary}
            size={vs(40)}
            onPress={ToggleDrawer}
        />
        <Ionicons
            name = {theme === 'dark'? "moon-outline":'sunny-outline'}
            color ={Colors.primary}
            size={vs(40)}
        />
      </View>
      <View style={drawerstyle.drawermidContainer}>
        <DrawerItem
            label="Profile"
            labelStyle={[drawerstyle.label,{color: Colors.primary,}]}
            icon={()=>
                <Ionicons
                name = 'person-circle-outline'
                color ={Colors.primary}
                size={vs(40)}
                />}
        
        />
        <DrawerItem
            label="Quran Detial"
            labelStyle={[drawerstyle.label,{color: Colors.primary,}]}
            onPress={()=>props.navigation.navigate('quranDetial')}
            icon={()=>
                <Ionicons
                name = {toggleTheme? "moon-outline":'sunny-outline'}
                color ={Colors.primary}
                size={vs(40)}
                
                />}
        />
         <DrawerItem
            label="Logout"
            labelStyle={[drawerstyle.label,{color: Colors.primary,}]}
            onPress={handleLogout}
            icon={()=>
                <Ionicons
                name = "log-out-outline"
                color ={Colors.primary}
                size={vs(40)}
                
                />}
        />
         <TouchableOpacity
            onPress={toggleTheme}
            style={drawerstyle.drawerHeaderContainer}
            >
            <Text style={[drawerstyle.label, { color: Colors.primary }]}>Switch theme</Text>
            <Switch
                trackColor={{ false: "#186351", true: "#87D1A4" }}
                thumbColor={isDark ? "#186351" : "#87D1A4"}
                ios_backgroundColor="white"
                onValueChange={toggleTheme}
                value={isDark}
            />
            </TouchableOpacity>


      </View>

    </DrawerContentScrollView>
    )
}
export default CustomDrawerContent 

const drawerstyle = StyleSheet.create({

    drawerContainer : {
        
        
        borderBottomRightRadius:20,
        borderTopRightRadius:30,
    },
    drawerHeaderContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        paddingHorizontal:vs(10),
    },
    drawermidContainer:{
        marginTop:vs(20),
        rowGap:vs(40)
    },
    draweritem: {
        marginVertical: vs(20),
    },

    label: {
        fontWeight:'500',
        
        fontSize: scale(20),
        marginLeft: vs(20),
    }
    

})