import { StyleSheet, TextInput, TouchableOpacity,Text, View } from "react-native"
import Basescreen from "../component/Basescreen"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Colors } from "../utils/theme/colors"
import { mvs,scale, vs } from "../utils/theme/responsive"
import { useNavigation } from "@react-navigation/native"


const ReciteQuran = ()=>{
    const navigation = useNavigation();
    return(
        <Basescreen scroable={true} containerstyle={{backgroundColor:Colors.whiteaccent}}>

                <Text style={styles.titleText}>Recite Quran </Text>
                <TouchableOpacity 
                style={styles.maincontainer}
                onPress={()=>navigation.navigate('ReciteQuranByJuzz',)}>
                    <Text style={styles.text}>Recite Juz</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.maincontainer}
                onPress={()=>navigation.navigate('ReciteQuranBy',)}
                >
                    <Text style={styles.text}> Recite Surah </Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.maincontainer}>
                    <Text style={styles.text}> Recite Ayat </Text>
                </TouchableOpacity>
        </Basescreen>
    )
}



export default ReciteQuran

const styles =  StyleSheet.create({
    maincontainer: {
        backgroundColor: Colors.secondary,
        borderRadius: vs(10),
        padding: mvs(10),
        borderLeftColor: Colors.golden,
        borderLeftWidth: vs(10),
        marginTop: mvs(10),
        marginHorizontal: mvs(10),
      },
      text: {
        color: Colors.primary,
        fontSize: scale(20),
        fontWeight: '500',
        textAlign: 'left',
      },
      titleText: {
        color: Colors.primary,
        fontSize: scale(24),
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: mvs(10),
      },
})