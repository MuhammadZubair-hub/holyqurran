import { Image, StyleSheet, Text, View } from "react-native"

import Basescreen from "../component/Basescreen"
import MyHeader from "../component/Header"
import { Colors } from "../utils/theme/colors"
import { useEffect, useState } from "react"
import { mvs, vs, width } from "../utils/theme/responsive"
import Homescreencard from "../component/card/Homescreencard"
import { HomeWidgets } from "../utils/constant/Staticdata"
import { useNavigation } from "@react-navigation/native"



const Home = ()=>{

    const images =[
        require('../assets/images/bism.png'),
        require('../assets/images/mainlogo.png'),
        require('../assets/images/masgid.png')
    ]

 

    const [index,setIndex] = useState(0)
    const navigation = useNavigation();

    // useEffect(()=>{

    //     const interval = setInterval(()=>{
    //         setIndex(prev =>(prev +1 )% images.length)
    //     },3000)

    //     return ()=> clearInterval(interval);

    // },[]) 

    

    return(
        
        <Basescreen scroable={false} containerstyle={{backgroundColor:Colors.whiteaccent}}>
  <MyHeader username={'user 1'} />

  <View style={styles.mainRow}>
    {/* Right Side: Background Image */}
    <Image 
      blurRadius={0}
      source={require('../assets/images/grill4.png')} 
      style={styles.sideImage}
    />

    {/* Left Side: Cards on top of image */}
    <View style={styles.cardsContainer}>
      {HomeWidgets.map((item, index) => (
        <Homescreencard  
          title={item.name} 
          onPress={() => navigation.navigate(item.screenname)}
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