import { useEffect, useState } from "react";
import { Platform, PermissionsAndroid, Alert, FlatList, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Geolocation from "react-native-geolocation-service";
import Basescreen from "../component/Basescreen"
import { Api_Services } from "../services/Api_Services";
import { Colors } from "../utils/theme/colors"
import { useRoute } from "@react-navigation/native";
import { mvs, vs } from "../utils/theme/responsive";

const ParyerTime =()=>{

    
    useEffect(()=>{
      getNamaz();
    },[namaztime,ref])
   
    const route = useRoute();
    const { ref } = route.params;
    const date = new Date().toISOString().split('T')[0];
    const [namaztime,setNamazTime] = useState([]);

    const getNamaz = async ()=>{
      try {
        
        const response = await  Api_Services.getNamazTime({date:date, location:{
          latitude: ref.latitude,
          longitude : ref.longitude,
        }});
        
        setNamazTime(response?.data?.data?.timings);
        console.log(namaztime)
      } catch (error) {
        
        console.log('the error is :',error)
      }
    }

    const renderFunction = ({ item }) => {
        const [key, value] = item;
        const [hour, minute] = value.split(':').map(Number);
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const hour12 =( hour % 12)  || 12;
        
        const formattedHour = String(hour12).padStart(2, '0');
        const formattedMinute = String(minute).padStart(2, '0');

        return (
            <TouchableOpacity style={styles.flatlistcard}>
            <Text style={styles.firsttext}>{key}: {formattedHour}:{formattedMinute} {suffix}</Text>
            </TouchableOpacity>
         );
        };

      

    return(
        <Basescreen  containerstyle={{backgroundColor : Colors.secondary }}   >
            <View style={{backgroundColor:Colors.primary, borderRadius:5 }}>
              <Text style={{color:Colors.golden , paddingVertical: vs(20), textAlign:'center' ,fontSize:vs(20)}} > ----: Namaz Timing :---- </Text>
            </View>
            <FlatList 
                data={Object.entries(namaztime)} 
                keyExtractor={([key], index) => key + index}
                renderItem={renderFunction}
                />

        </Basescreen>
    )
}

export default ParyerTime


const styles =StyleSheet.create({
    
    flatlistcard:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:Colors.whiteaccent,
        borderRadius:mvs(10),
        margin:10,
        borderRightColor:Colors.golden,
        borderBottomColor:Colors.golden,
        borderBottomWidth:5,
        borderRightWidth:5
    },
    

    firsttext :{
        color:Colors.primary,
        paddingVertical:vs(10),
        fontSize:vs(25),
        fontWeight:'500',
        textAlign:'center',
        marginHorizontal:vs(10)
    },
    
})
