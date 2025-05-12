import { createContext, useContext, useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo';
import { showMessage } from "react-native-flash-message";
import { Commonstyle } from "../utils/shared/Style/globalstyle";

const NetworkContext = createContext();

export const useNetwork =() => useContext(NetworkContext);

export const NetworkProvider =({children})=>{

    const [ isconnected,setIsConnected] = useState(true);

    useEffect(()=>{

        const unsuscribe = NetInfo.addEventListener(state =>{
            setIsConnected(state.isConnected)},
            //console.log('network connection : ', isconnected),
        );

         return () =>  unsuscribe();   

    },[])

    return(
        <NetworkContext.Provider value={{isconnected}} >
            {children}
            {isconnected?
            (showMessage({
                message:"Network connection",
                description:'Restore',
                type:'danger',
                style:Commonstyle.sucsses,
            })):(
                showMessage({
                        message:"Network connection",
                        description:'Failed',
                        type:'danger',
                        style:Commonstyle.error,
                    })
            )}
        </NetworkContext.Provider>
    )

}