import { apicall } from "../utils/constant";
import { Api_config, Base_url, Base_url_namaz } from "../utils/constant/endpoint";

export const Api_Services = {


     qurandetials : async (data)=> {
        const url = `${Base_url}${Api_config.getaAllQuranDetials}`;
        return apicall({
            endpoint:url, 
            data : data
            })
     },
     getAlljuz : async ({ juznumber,edition})=>{
          const url =`${Base_url}${Api_config.getQuranJuz}${juznumber}/${edition}`
          return apicall({
               endpoint:url,
               //data: data,
          })
     },
     getAllsurah : async ({surrahnumber,edition})=>{
          const url = `${Base_url}${Api_config.getQuranAllSurah}${surrahnumber}/${edition}`
          return apicall({
               endpoint:url,
          })
     },
     getNamazTime : async({date,location}) => {
          const url = `${Base_url_namaz}${Api_config.getCurrentCityNamazTime}/${date}`
          return apicall({
               endpoint:url,
               params:location,
          })
     }


}