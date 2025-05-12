import {StyleSheet,TextInput,TouchableOpacity,Text,View,FlatList,ActivityIndicator,Alert} from "react-native";
import Basescreen from "../component/Basescreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../utils/theme/colors";
import { mvs, scale, vs } from "../utils/theme/responsive";
import { useCallback, useEffect, useState } from "react";
import { Api_Services } from "../services/Api_Services";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getUser } from "../utils/shared/redux/Userslice";
  
  const ReciteQuranBy = () => {
    const route = useRoute();
    const {name = ''} = route.params || {};
    const [number, setNumber] = useState('1');
    const [ayahs, setAyahs] = useState([]);
    const [surahname,setSurahname] = useState('');
    const [loading, setLoading] = useState(false);
    
  
    useEffect(() => {
        //console.log('the name is : ', name)

        getQuran();
      
    }, []);

    const getQuran =()=>{
      switch (name) {
        case 'Juz':
            getAllJuz();
            break;
        case 'Surah':
            getAllSurah();
            break;
        default:
            break;
      }
    }
  
    const getAllJuz = async () => {
      try {
        setLoading(true);
        const juzdata = await Api_Services.getAlljuz({ juznumber: number });
        const ayahsArray = juzdata?.data?.data?.ayahs || [];
        setAyahs(ayahsArray);
      } catch (error) {
    
        Alert.alert("Error", error?.data || error?.message || "Something Went Wrong" );
        return
      } finally {
        setLoading(false);
      }
    };

    const getAllSurah = async () => {
        try {
          setLoading(true);
          const surahdata = await Api_Services.getAllsurah({surrahnumber: number});
          const ayahsArray = surahdata?.data?.data?.ayahs || [];
          setSurahname(surahdata?.data?.data?.name);
          setAyahs(ayahsArray);
        } catch (error) {
          
          Alert.alert("Error", error?.data || error?.message || "Something Went Wrong" );
          return
        } finally {
          setLoading(false);
        }
      };

  
    const renderAyah = ({ item, index }) => (
      
        <Text style={styles.text}>
        {index + 1}-  {item.text}
      </Text>
      
    );

    
    return (
      <Basescreen
        scroable={true}
        paddingHorizontal={mvs(10)}
        containerstyle={{ backgroundColor: Colors.whiteaccent}}
      >
        <Text style={styles.titleText}>بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</Text>
        <View style={styles.searchconatiner}>
            <TextInput
              value={number}
              onChangeText={setNumber}
              style={styles.searchfield}
              keyboardType="number-pad"
              placeholder="Search by number"
            />
            <TouchableOpacity onPress={getQuran}>
              <Ionicons
                name="search-outline"
                size={vs(24)}
                color={Colors.primary}
              />
            </TouchableOpacity>
        </View>

  
        
  
        <View style={styles.maincontainer}>
          
          <Text style={styles.titleText}>{name} {number}</Text>
          {surahname?(
            <Text style={styles.titleText}> -{surahname}</Text>
          ):(null)}
  
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <FlatList
              data={ayahs}
              keyExtractor={(item, index) =>item?.number?.toString() || index.toString()
              }
              renderItem={renderAyah}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
              removeClippedSubviews={true}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </Basescreen>
    );
  };
  
  export default ReciteQuranBy;


const styles =  StyleSheet.create({
    maincontainer: {
        backgroundColor: Colors.secondary,
        borderRadius: vs(10),
        padding: mvs(10),
        borderLeftColor: Colors.golden,
        borderLeftWidth: vs(10),
        marginTop: mvs(10),
      },
      text: {
        color: Colors.primary,
        fontSize: scale(25),
        fontWeight: '500',
        textAlign: 'right',
      },
      titleText: {
        color: Colors.primary,
        fontSize: scale(24),
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: mvs(10),
      },
      searchfield:{
        flex:1,
        fontSize: mvs(14),
        color: Colors.primary,
      },
      searchconatiner:{
        width:'100%',
        borderRadius:10,
        borderColor:Colors.golden,
        borderWidth:2,
        justifyContent:"space-between",
        flexDirection:"row",
        flexWrap:'wrap',
        alignItems:'center'
        
      }
})
   

    