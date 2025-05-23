import { StyleSheet, View,Text ,TouchableOpacity } from "react-native"
import { mvs, vs } from "../../utils/theme/responsive";
import {  getAppColors } from "../../utils/theme/colors";
import { Api_Services } from "../../services/Api_Services";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import { useNetwork } from "../../services/Networkporvider";



 const Homescreencard = ({title,onPress}) => {

    const {theme} = useNetwork();
  const Colors = getAppColors(theme);
   
    // const qurandetials = async ()=>{
    //     const detials = await Api_Services.qurandetials();
    //     console.log('detials are :', detials?.data );
    // }

    return (
        <TouchableOpacity 
            style = {[styles.maincardcontainer,{ borderColor:Colors.primary,backgroundColor:Colors.secondary,}]}
            onPress={onPress}>
            <FontAwesome6 name = 'book-quran' size ={mvs(30)} color ={Colors.primary} />   
            <Text style={{fontSize:mvs(15), color :Colors.primary}} >{title}</Text>
        </TouchableOpacity>
    )

}
export default Homescreencard  

const styles = StyleSheet.create({
    maincardcontainer:{
        marginVertical:vs(10),
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:vs(10),
        borderWidth:vs(2),
       
        paddingVertical:20,
        rowGap:mvs(5)
    }
})