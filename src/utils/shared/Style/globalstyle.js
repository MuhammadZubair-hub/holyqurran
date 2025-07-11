import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { vs } from "../../theme/responsive";

export const Commonstyle = StyleSheet.create({
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
            justifyContent:'space-evenly',
            padding:30,
            backgroundColor:Colors.whiteaccent,
            rowGap:20,
            borderTopRightRadius:40,
            borderTopLeftRadius:40,
            minHeight:"70%",
          
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
          error: {
            backgroundColor:'red',
            //height: 60,
            width: '90%',
            alignSelf: 'center',
            marginTop: vs(40),
            borderRadius: 10,
            paddingHorizontal: 15,
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          sucsses : {
            backgroundColor:'#32CD32',
            //height: 60,
            width: '90%',
            alignSelf: 'center',
            marginTop: vs(40),
            borderRadius: 10,
            paddingHorizontal: 15,
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },

})