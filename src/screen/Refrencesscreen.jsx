// import { Alert, FlatList, Image, StyleSheet, Text, View } from "react-native"
// import Basescreen from "../component/Basescreen"
// import { useRoute } from "@react-navigation/native"
// import { Colors } from "../utils/theme/colors";
// import { useSelector } from "react-redux";
// import { getqurandetialdata } from "../utils/shared/redux/Userslice";
// import { useEffect, useState } from "react";
// import { mvs, scale, vs } from "../utils/theme/responsive";

// const ReferencesScreen =()=>{
//     const route = useRoute();
//     const {ref} = route.params;
//     const [refrences,setRefrence]= useState('');

//     const getRedux = useSelector(getqurandetialdata);

//     // useEffect(()=>{
//     //     returnfunction()
//     // },[])

//     const returnfunction = ({ref})=>{

//         console.log('the name is ' , ref)
//         console.log('the data is ' , getRedux?.sajdas?.references)

//         switch (ref) {
//             case 'Surah' :
//                 return (
//                     <FlatList 
//                     data={getRedux?.surahs?.references}
//                     keyExtractor={(item) => item.number?.toString()}
//                     renderItem={({ item }) => (
//                     <View style={styles.maincontainer} >
//                         <Text style={styles.text}>{item?.number}</Text>
//                         <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'space-between'}}>
//                             <Text style={styles.text}>{item?.englishName}</Text>
//                             <Text style={styles.text}>{item?.name}</Text>
//                         </View>
//                         <Text style={styles.text}>Ayyat :{item?.numberOfAyahs}</Text>
//                     </View>
//                     )}
//                     />
                    
//                 )
//             case 'Juz' :
//                 return (
//                     <View>
//                         <View>
//                             <Text>{ref}</Text>
//                             <Text>{ref}</Text>
//                         </View>
//                     </View>
//                     )
//             case 'Sajdas' :
//                 return (
                    
//                         <FlatList 
//                     data={getRedux?.sajdas?.references}
//                     keyExtractor={(item) => item.number?.toString()}
//                     renderItem={({ item }) => (
//                     <View style={styles.maincontainer} >
//                         <Text style={styles.text}>In surah:{item?.surah}</Text>
//                         <Text style={styles.text}>at ayyat :{item?.ayah}</Text>
//                     </View>
//                     )}
//                     />
//                         )

//             case '' :
//                 return (
//                     <Text>no data found</Text>
//                 )
        
//             default:
//                 break;
//         }
//     }
    

//     return(
//         <Basescreen scroable={true} containerstyle={
//             {
//                 backgroundColor:Colors.whiteaccent,
                
//             }} >
             
//             {returnfunction({ref:ref})}

//         </Basescreen>
//     )
// }

// export default ReferencesScreen

// const styles = StyleSheet.create({
//     maincontainer:{
//         backgroundColor:Colors.secondary,
//         borderRadius:vs(10),
//         padding:mvs(10),
//         borderLeftColor:Colors.golden,
//         borderLeftWidth:vs(10),
//         //paddingVertical:mvs(10),
//         marginTop:mvs(10),
//         marginHorizontal:mvs(10)

//     },
//     text:{
//         color:Colors.primary,
//         fontSize:scale(20),
//         fontWeight:'500',
//         textAlign:'left',
        
//     }
// })



import { Alert, FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import Basescreen from "../component/Basescreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Colors } from "../utils/theme/colors";
import { useSelector } from "react-redux";
import { getqurandetialdata } from "../utils/shared/redux/Userslice";
import { useEffect, useState, useCallback, memo } from "react";
import { mvs, scale, vs } from "../utils/theme/responsive";
import Backbutton from "../component/Button/Backbutton";



const ReferencesScreen = () => {
  const route = useRoute();
  const { ref = '' } = route.params || {}; 
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  
  
  const quranData = useSelector(getqurandetialdata);
  
  
  useEffect(() => {
    if (quranData) {
      setLoading(false);
    }
  }, [quranData]);

  
  const keyExtractor = useCallback((item) => 
    item.number?.toString() || item.id?.toString() || Math.random().toString(),
    []);

  
  const getReferencesData = () => {
    switch (ref) {
      case 'Surah':
        return quranData?.surahs?.references || [];
      case 'Juz':
        return quranData?.juzs?.references || [];
      case 'Sajdas':
        return quranData?.sajdas?.references || [];
      default:
        return [];
    }
  };

  
  const getRenderItem = useCallback(({ item }) => {
    switch (ref) {
      case 'Surah':
        return <SurahItem item={item} onpress={()=>navigation.navigate('ReciteQuranBy', {ref : item?.number})} />;
      case 'Juz':
        return <JuzItem item={item} onpress={()=>navigation.navigate('ReciteQuranByJuzz', {ref : item?.number})} />;
      case 'Sajdas':
        return <SajdaItem item={item} />;
      default:
        return null;
    }
  }, [ref]);

  
  if (loading) {
    return (
      <Basescreen containerstyle={styles.container}>
        <ActivityIndicator size="large" color={Colors.golden} />
      </Basescreen>
    );
  }

  const getTitle = () => {
    switch (ref) {
      case 'Surah':
        return 'Surah References';
      case 'Juz':
        return 'Juz References';
      case 'Sajdas':
        return 'Sajda References';
      default:
        return 'References';
    }
  };

  return (
    <Basescreen 
      scroable={false} 
      containerstyle={styles.container}
    >
      <Backbutton/>
      <Text style={styles.titleText}>{getTitle()}</Text>
      <FlatList
        data={getReferencesData()}
        keyExtractor={keyExtractor}
        renderItem={getRenderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<EmptyListComponent />}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </Basescreen>
  );
};

const SurahItem = memo(({ item, onpress }) => (
    <TouchableOpacity style={styles.maincontainer} onPress={onpress} >
      <Text style={styles.text}>{item?.number}</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.text}>{item?.englishName}</Text>
        <Text style={styles.text}>{item?.name}</Text>
      </View>
      <Text style={styles.text}>Ayyat: {item?.numberOfAyahs}</Text>
    </TouchableOpacity>
  ));
  
  const SajdaItem = memo(({ item }) => (
    <View style={styles.maincontainer}>
      <Text style={styles.text}>In surah: {item?.surah}</Text>
      <Text style={styles.text}>at ayyat: {item?.ayah}</Text>
    </View>
  ));
  
  const JuzItem = memo(({ item,onpress }) => (
    <TouchableOpacity style={styles.maincontainer} onPress={onpress} >
      <Text style={styles.text}>Juz Number: {item?.number}</Text>
      <Text style={styles.text}>{item?.description || 'No description available'}</Text>
    </TouchableOpacity>
  ));
  
  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No data found</Text>
    </View>
  );

export default ReferencesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteaccent,
    flex: 1,
  },
  listContainer: {
    paddingBottom: mvs(20),
  },
  maincontainer: {
    backgroundColor: Colors.secondary,
    borderRadius: vs(10),
    padding: mvs(10),
    borderLeftColor: Colors.golden,
    borderLeftWidth: vs(10),
    marginTop: mvs(10),
    marginHorizontal: mvs(10),
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: mvs(20),
  },
  emptyText: {
    color: Colors.primary,
    fontSize: scale(18),
    textAlign: 'center',
  },
});