import { createContext, useContext, useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo';
import { showMessage } from "react-native-flash-message";
import { Commonstyle } from "../utils/shared/Style/globalstyle";
import { useColorScheme } from "react-native";

const NetworkContext  = createContext();

export const useNetwork =() => useContext(NetworkContext);

export const NetworkProvider =({children})=>{

    const [ isconnected,setIsConnected] = useState(true);
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState(systemTheme); // default to system theme

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    
    useEffect(() => {
        // if (!isconnected) {
        //     showMessage({
        //         message: "Network connection",
        //         description: 'Failed',
        //         type: 'danger',
        //         style: Commonstyle.error,
        //     });
        // } else {
        //     showMessage({
        //         message: "Network connection",
        //         description: 'Restored',
        //         type: 'success',
        //         style: Commonstyle.sucsses,
        //     });
        // }
    }, [isconnected]);

    
    useEffect(() => {
        setTheme(systemTheme);
    }, [systemTheme]);

    return(
        <NetworkContext.Provider value={{isconnected ,theme, toggleTheme}} >
            {children}
            {!isconnected ?(
                showMessage({
                message: "Network connection",
                description: 'Failed',
                type: 'danger',
                style: Commonstyle.error,
            })
            ):(
                showMessage({
                message: "Network connection",
                description: 'Restored',
                type: 'success',
                style: Commonstyle.sucsses,
            })
            )

            }
        </NetworkContext.Provider>
    )

}