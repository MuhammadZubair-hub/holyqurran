import { View ,Text, StyleSheet, StatusBar, ActivityIndicator } from "react-native"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { Colors } from "./utils/theme/colors"
import FlashMessage from "react-native-flash-message"
import { NavigationContainer } from "@react-navigation/native"
import { Provider} from "react-redux"
import {store} from "./utils/shared/redux/store"
import Mainstack from "./navigation/Mainstack"
import { NetworkProvider } from "./services/Networkporvider"

const App =()=>{

  return(
    <Provider store = {store}>
      <NetworkProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <StatusBar backgroundColor={Colors.primary} barStyle={'light-content'} translucent={false} />

          <NavigationContainer>
            <Mainstack/>
          </NavigationContainer>
          
          <FlashMessage position={'right'} floating={true} />
        </SafeAreaProvider>
      </NetworkProvider>
    </Provider>
    
  )
}
export default App
