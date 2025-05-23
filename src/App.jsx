import { StatusBar } from "react-native"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { Colors, getAppColors } from "./utils/theme/colors"
import FlashMessage from "react-native-flash-message"
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native"
import { Provider } from "react-redux"
import { store } from "./utils/shared/redux/store"
import Mainstack from "./navigation/Mainstack"
import { NetworkProvider, useNetwork } from "./services/Networkporvider"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import MyDrawer from "./navigation/DrawerNavigator"

const App = () => {


  return (
    <Provider store={store}>
      <NetworkProvider>
        <MainNaviagtion></MainNaviagtion>
      </NetworkProvider>
    </Provider>

  )
}
export default App


const MainNaviagtion = () => {

    const MyLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff',
      card: '#FFF5E2',
      text: '#000000',
      primary: '#186351',
      border: '#ccc',
    },
  };

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#000000',
      card: '#1e1e1e',
      text: '#ffffff',
      primary: '#87D1A4',
      border: '#444',
    },
  };

     const { theme } = useNetwork(); 

     const selectedTheme = theme === 'dark' ? MyDarkTheme : MyLightTheme;
     const Colors = getAppColors(theme);


  return (

    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar backgroundColor={Colors.primary} barStyle={'light-content'} translucent={false} />

      <GestureHandlerRootView style={{ flex: 1 }} >
        <NavigationContainer theme={selectedTheme} >
          <MyDrawer></MyDrawer>
        </NavigationContainer>
      </GestureHandlerRootView>

      <FlashMessage position={'right'} floating={true} />
    </SafeAreaProvider>
  )
}
