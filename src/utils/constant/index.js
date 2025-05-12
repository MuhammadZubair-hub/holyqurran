import axios from "axios";
import { Alert } from "react-native";
import { Base_url } from "./endpoint";

export const apicall = async ({endpoint, method = 'Get', params = {}, data = {} })=>{
    const option = {
         method:method,
         url : `${Base_url}${endpoint}`,
         params:params,
         data : data, 
    };

    try {
      const response = await axios.request(option);  
      return response;
    } catch (error) {

      console.log('The error calling API is:', error?.response?.data || error.message);
    
      
      throw error.response?.data || { message: 'Something went wrong' };
    }
}
