import { Alert, Image, PermissionsAndroid, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"

import Basescreen from "../component/Basescreen"
import MyHeader from "../component/Header"
import {  getAppColors } from "../utils/theme/colors"
import { useEffect, useState } from "react"
import { mvs, vs, width } from "../utils/theme/responsive"
import Homescreencard from "../component/card/Homescreencard"
import { HomeWidgets } from "../utils/constant/Staticdata"
import { useNavigation } from "@react-navigation/native"
import auth from '@react-native-firebase/auth'
import Geolocation from "react-native-geolocation-service"
import GetUserLocation, { requestLocationPermission } from "../component/GetUserLoaction"
import { Api_Services } from "../services/Api_Services"
import { useNetwork } from "../services/Networkporvider"



const Home = ()=>{
    
  const {theme} = useNetwork();
  const Colors = getAppColors(theme);
    
    useEffect(()=>{
      requestLocationPermission();
      
    },[])

    const navigation = useNavigation();
    const [location,setLocation] = useState(null);

    const requestLocationPermission = async () => {
        try {
          if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: "Location Permission",
                message: "App needs access to your location",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            );
    
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
              Alert.alert("Permission denied");
              return;
            }
          }
    
          Geolocation.getCurrentPosition(
            position => {
              console.log("Latitude:", position.coords.latitude);
              console.log("Longitude:", position.coords.longitude);
              setLocation({
                latitude : position.coords.latitude,
                longitude : position.coords.longitude,
              })
            },
            error => {
              console.log("Location Error:", error.message);
            },
            {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000
            }
          );
        } catch (err) {
          console.warn(err);
        }
      };
    

    return(
        
        <Basescreen scroable={false}>
          <MyHeader username={auth().currentUser?.displayName} />

          <View style={[styles.mainRow,{backgroundColor:Colors.whiteaccent}]}>
            
            <Image 
              blurRadius={0}
              source={require('../assets/images/grill4.png')} 
              style={styles.sideImage}
            />

            <View style={styles.cardsContainer}>
              {HomeWidgets.map((item, index) => (
                <Homescreencard  
                  title={item.name} 
                  onPress={() => navigation.navigate(item.screenname,{ref : item.name === 'Namaz Time' ? location: null})}
                  key={index}
                />
              ))}
            </View>
          </View>
      </Basescreen>
    )
}

export default Home

const styles = StyleSheet.create({
    mainRow: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        position: 'relative', 
        
      },
      sideImage: {
        position: 'absolute',
        right: 0,
        width: '75%',
        height: '100%',
        resizeMode: 'cover',
        zIndex: 0, 
      },
      cardsContainer: {
        width: '75%',
        padding: mvs(10),
        flexDirection: 'coulmn',
        flexWrap: 'wrap',
        zIndex: 1, 
      },
})