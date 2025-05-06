import AsyncStorage from "@react-native-async-storage/async-storage"

export const SetUData = async (key,value) => {
    try {
        
        await AsyncStorage.setItem(key,value);

    } catch (error) {
        console.log('error storing data' ,error);
    }

}

export const GetUData = async (key)=>{
    try {
        const data = await AsyncStorage.getItem(key);
        return data;
    } catch (error) {
        console.log('error reterving  data' ,error);
    }
}