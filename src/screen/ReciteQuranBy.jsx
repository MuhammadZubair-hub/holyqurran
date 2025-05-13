import {StyleSheet,TextInput,TouchableOpacity,Text,View,FlatList,ActivityIndicator,Alert, ScrollView} from "react-native";
import Basescreen from "../component/Basescreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../utils/theme/colors";
import { mvs, scale, vs } from "../utils/theme/responsive";
import { useCallback, useEffect, useState } from "react";
import { Api_Services } from "../services/Api_Services";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getUser } from "../utils/shared/redux/Userslice";
import { FastField } from "formik";
import Buton from "../component/Button/Buton";
import { translatedata } from "../utils/constant/Staticdata";
  
  const ReciteQuranBy = () => {

    useEffect(() => {
        getAllSurah();
    }, []);

    const route = useRoute();
    const {ref} = route.params;

    const [number, setNumber] = useState('1');
    const [ayahs, setAyahs] = useState([]);
    const [ayahstranslate, setAyahsTranslate] = useState([]);
    const [surahname,setSurahname] = useState('');
    const [loading, setLoading] = useState(false);
    //const [translate,setTranslate] = useState(false);
    const [showTranslations, setShowTranslations] = useState(false);

  // handler toggles that state
      const handleGetTranslate = () => {
        setShowTranslations(prev => !prev);
      };

  
    const getAllSurah = async () => {
        try {
          setLoading(true);
          const surahdata = await Api_Services.getAllsurah({surrahnumber: ref ? ref: number});
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

      const getAllSurahWithTranslation = async ({editionname}) => {
        try {
          setLoading(true);
          const surahdata = await Api_Services.getAllsurah({surrahnumber: ref ?ref: number , edition:editionname});
          const ayahsArray = surahdata?.data?.data?.ayahs || [];
          setSurahname(surahdata?.data?.data?.name);
          setAyahsTranslate(ayahsArray);
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
       {!ref?(

         <View style={styles.searchconatiner}>
            <TextInput
              value={number}
              onChangeText={setNumber}
              style={styles.searchfield}
              keyboardType="number-pad"
              placeholder="Search by number"
            />
            <TouchableOpacity onPress={getAllSurah}>
              <Ionicons
                name="search-outline"
                size={vs(24)}
                color={Colors.primary}
              />
            </TouchableOpacity>
        </View>
       ):(
        null
       )}

          <Buton
          buttontitle={showTranslations ? 'Hide Translations' : 'Get Translation'}
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
                  onpress={()=>getAllSurahWithTranslation({editionname:item.edition})}
                  ></Buton>
                ))}
              </ScrollView>
            )}

  
        
  
        <View style={styles.container}>
          
          <Text style={styles.titleText}> Surah {ref ?ref: number}</Text>
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
            <View style={styles.container}>
          
          <Text style={styles.titleText}> Surah {ref ?ref: number}</Text>
          {surahname?(
            <Text style={styles.titleText}> -{surahname}</Text>
          ):(null)}
  
          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <FlatList
              data={ayahstranslate}
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
  
  export default ReciteQuranBy;


const styles =  StyleSheet.create({
    container: {
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
        alignItems:'center',
        paddingRight:vs(10),
        marginBottom:mvs(20),
      },
      
})
   

    