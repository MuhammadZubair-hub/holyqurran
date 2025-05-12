import { apicall } from "../utils/constant";
import { Api_config } from "../utils/constant/endpoint";

export const Api_Services = {


     qurandetials : async (data)=> {
        const url = `${Api_config.getaAllQuranDetials}`;
        return apicall({
            endpoint:url, 
            data : data
            })
     },
     getAlljuz : async ({ juznumber})=>{
          const url =`${Api_config.getQuranJuz}${juznumber}`
          return apicall({
               endpoint:url,
               //data: data,
          })
     },
     getAllsurah : async ({surrahnumber,edition})=>{
          const url = `${Api_config.getQuranAllSurah}${surrahnumber}/${edition}`
          return apicall({
               endpoint:url,
          })
     }



}