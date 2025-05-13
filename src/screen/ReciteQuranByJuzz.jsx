import {StyleSheet,TextInput,TouchableOpacity,Text,View,FlatList,ActivityIndicator,Alert, ScrollView} from "react-native";
import Basescreen from "../component/Basescreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../utils/theme/colors";
import { mvs, scale, vs } from "../utils/theme/responsive";
import { useCallback, useEffect, useState } from "react";
import { Api_Services } from "../services/Api_Services";
import { useRoute } from "@react-navigation/native";
import Buton from "../component/Button/Buton";
  
  const ReciteQuranByJuzz = () => {

    const [number, setNumber] = useState('1');
    const [ayahs, setAyahs] = useState([]);
    const [ayahstranslate, setAyahsTranslate] = useState([]);
    const [surahname,setSurahname] = useState('');
    const [loading, setLoading] = useState(false);
    const [translateayyah,setTranslateAyyah] = useState(false);
    const [showTranslations, setShowTranslations] = useState(false);

  // handler toggles that state
      const handleGetTranslate = () => {
        setShowTranslations(prev => !prev);
      };

      useEffect(() => {
        

        getAllJuz();
      
    }, []);

    const translatedata = [
      {
        edition:'ur.ahmedali',
        language:'Urdu'
      },
      {
        edition:'en.asad',
        language:'English'
      },
      {
        edition:'bn.bengali',
        language:'Banglli'
      },
      {
        edition:'fr.hamidullah',
        language:'French'
      },
      {
        edition:'hi.hindi',
        language:'Hindi'
      },
      {
        edition:'en.asad',
        language:'English'
      },
      {
        edition:'en.asad',
        language:'English'
      },
    ]
    
  
  
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

    const getAllJuzTranslation = async ({editionname}) => {
      try {
        setLoading(true);
        const juzdata = await Api_Services.getAlljuz({ juznumber: number , edition: editionname});
        const ayahsArray = juzdata?.data?.data?.ayahs || [];
        setTranslateAyyah(ayahsArray);
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
      const renderTranslateAyah = ({ item, index }) => (
      
        <Text style={[styles.text,{textAlign:'justify'}]}>
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
            <TouchableOpacity onPress={getAllJuz}>
              <Ionicons
                name="search-outline"
                size={vs(24)}
                color={Colors.primary}
              />
            </TouchableOpacity>
        </View>

          <Buton
          buttontitle={showTranslations ? 'Hide translations' : 'Get translate'}
          paddingvertical={vs(5)}
          onpress={handleGetTranslate}
        />

            {showTranslations && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{flexGrow:0}}
                contentContainerStyle={{
                  //flexWrap:'wrap',
                  flexDirection: 'row',
                  marginTop:vs(10),
                  columnGap:vs(10),
                  
                }}
              >
                {translatedata.map((item, index) => (
                  <Buton key={index} buttontitle={item.language} padding={vs(5)} 
                  onpress={()=>getAllJuzTranslation({editionname:item.edition})}
                  ></Buton>
                ))}
              </ScrollView>
            )}

  
        
  
        <View style={styles.maincontainer}>
          
          <Text style={styles.titleText}> Juzz {number}</Text>
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

          {showTranslations?(
            <View style={styles.maincontainer}>
          
          <Text style={styles.titleText}> Juzz {number}</Text>
          {surahname?(
            <Text style={styles.titleText}> -{surahname}</Text>
          ):(null)}
  
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <FlatList
              data={translateayyah}
              keyExtractor={(item, index) =>item?.number?.toString() || index.toString()
              }
              renderItem={renderTranslateAyah}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
              removeClippedSubviews={true}
              showsVerticalScrollIndicator={false}
            />
          )}

          

        </View>
          ):(null)}

      </Basescreen>
    );
  };
  
  export default ReciteQuranByJuzz;


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
        marginTop: mvs(10),
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
        alignItems:'center',
        paddingRight:vs(10),
        marginVertical:mvs(20),
      },
      
})
   

    