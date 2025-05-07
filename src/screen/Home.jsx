import { Image, StyleSheet, Text, View } from "react-native"
import Buton from "../component/Button/Buton"
import auth from '@react-native-firebase/auth'
import { showMessage } from "react-native-flash-message"
import { Commonstyle } from "../utils/shared/Style/globalstyle"
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

 

    // const [index,setIndex] = useState(0)
    const navigation = useNavigation();

    // useEffect(()=>{

    //     const interval = setInterval(()=>{
    //         setIndex(prev =>(prev +1 )% images.length)
    //     },3000)

    //     return ()=> clearInterval(interval);

    // },[]) 

    

    return(
        
        <Basescreen scroable={false} containerstyle={{backgroundColor:Colors.whiteaccent}}>
            <MyHeader username={' user 1 '} ></MyHeader>
            
                {/* <View style={styles.container}>
                    <Image style={styles.image} source={images[index]} resizeMode="cover" ></Image>
                </View> */}
                
                <View style={styles.cards}>
                {HomeWidgets.map((item,index)=>{
                    return (
                        <Homescreencard  
                        title={item.name} 
                        onPress={()=>navigation.navigate('QuranDetial')}
                        key={index} 
                        ></Homescreencard>
                    )
                })}
                </View>
            
        </Basescreen>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        width:width,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        
      },
      image: {
        width: width,
        height: 180,
        borderRadius: 10,
        borderColor:Colors.primary,
        borderWidth:2,
        
      },
      cards :{
        paddingHorizontal:mvs(10),
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'space-between',
        columnGap:vs(10),
      }
})