import { StyleSheet, View,Text ,TouchableOpacity } from "react-native"
import { mvs, vs } from "../../utils/theme/responsive";
import { Colors } from "../../utils/theme/colors";
import { Api_Services } from "../../services/Api_Services";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"


 const Homescreencard = ({title}) => {

    const qurandetials = async ()=>{
        const detials = await Api_Services.qurandetials();
        console.log('detials are :', detials?.data );
    }

    return (
        <TouchableOpacity 
        style = {styles.maincardcontainer}
        onPress={qurandetials}
        >
            <FontAwesome6 name = 'book-quran' size ={mvs(30)} />   
            <Text>{title}</Text>
        </TouchableOpacity>
    )

}
export default Homescreencard  

const styles = StyleSheet.create({
    maincardcontainer:{
        marginVertical:vs(10),
        width:'47%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:vs(10),
        borderWidth:vs(2),
        borderColor:Colors.primary,
        backgroundColor:Colors.secondary,
        paddingVertical:20,
        rowGap:mvs(5)
    }
})