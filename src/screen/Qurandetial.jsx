import { useDispatch, useSelector } from "react-redux";
import Basescreen from "../component/Basescreen";
import { Api_Services } from "../services/Api_Services";
import { getqurandetialdata, setqurandetialdata } from "../utils/shared/redux/Userslice";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { mvs, vs } from "../utils/theme/responsive";
import { Colors } from "../utils/theme/colors";
//import { detialsData } from "../utils/constant/Staticdata";

const QuranDetial = () => {
  const dispatch = useDispatch();
  const getredux = useSelector(getqurandetialdata);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    
    qurandetials();
  }, []);

  const qurandetials = async () => {
    try {
      const detials = await Api_Services.qurandetials();
      const data = detials?.data?.data;
      console.log('the data ' , data)
      dispatch(setqurandetialdata(data));

    } catch (error) {
      console.error("Error fetching Quran details:", error);
    } finally {
      setLoading(false); 
    }
  };

  const detialsdata = [
    {
        id:'1',
        name:'Surah',
        data : getredux?.surahs
    },
    {
        id:'2',
        name:'Juz',
        data : getredux?.juzs
    },
    {
        id:'3',
        name:'Ayyat',
        data : getredux?.ayahs
    },
    {
        id:'4',
        name:'Sajdas',
        data : getredux?.sajdas
    },
    {
        id:'5',
        name:'Rukus',
        data : getredux?.rukus
    },
  ]

  const renderFunction =({item})=>{
    return (
        <TouchableOpacity style={styles.flatlistcard} onPress={()=> console.log('this is refrences ', item?.data?.references)}  >
            <Text style={[styles.firsttext]}> {item.name}</Text>
            <Text style={styles.secondtext}> {item?.data?.count}</Text>
        </TouchableOpacity>
    )
  }

  if(loading){
    return(
        <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size={mvs(30)} color={Colors.primary} ></ActivityIndicator>
      </View>
      
    )
  }

  return (
    <Basescreen scroable={true} containerstyle={{backgroundColor:Colors.whiteaccent}}>

        <View style={{ flex:1,justifyContent:'space-evenly', alignItems: 'center', paddingTop: vs(20)}}>
            
                <Image 
                source={require('../assets/images/quranpic.png')} 
                style={{width:'50%' , height: vs(150),}}
                resizeMode="contain"
                />
            
            <View style={styles.container}>
              <Text style={styles.titletext}> Holy Quran Details </Text>
              <View style={{height:vs(2),backgroundColor:Colors.golden , width:'80%' ,alignSelf:'center', marginBottom:10}}></View>

              <FlatList
                  data={detialsdata}
                  keyExtractor={(item) => item.id}
                  renderItem={renderFunction}
              />
            </View>

        </View>

    </Basescreen>
  );
};

export default QuranDetial;

const styles =StyleSheet.create({
    container:{
        alignContent:'center',
        justifyContent: 'space-evenly',
        backgroundColor: Colors.primary,
        width: '95%',
        borderRadius: 30,
        alignSelf: 'center', 
        paddingVertical: mvs(20), 
        borderRightColor:Colors.golden,
        borderBottomColor:Colors.golden,
        borderBottomWidth:5,
        borderRightWidth:5
    },
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
    titletext:{
        fontSize: vs(30), fontWeight: 'bold', marginBottom: vs(10),textAlign:'center', color: Colors.golden 
    },

    firsttext :{
        color:Colors.primary,
        paddingVertical:vs(10),
        fontSize:vs(25),
        fontWeight:'500',
        textAlign:'center',
        marginHorizontal:vs(10)
    },
    secondtext:{
        
        color:Colors.primary,
        fontSize:vs(20),
        fontWeight:'800',
        textAlign:'center',
        marginHorizontal:vs(10),
    }
})