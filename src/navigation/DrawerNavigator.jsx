import { createDrawerNavigator } from '@react-navigation/drawer';
import Mainstack from './Mainstack';
import CustomDrawerContent from '../component/Drawer/CustomDrawerContent ';
import QuranDetial from '../screen/Qurandetial';

const Drawer = createDrawerNavigator();

const  MyDrawer = ()=> {
  return (
    <Drawer.Navigator 
        screenOptions={{
        headerShown:false,
        drawerStyle: {width:'70%' , backgroundColor:'transparent'}}}
        drawerContent={(props)=><CustomDrawerContent {...props} />}
        >
      <Drawer.Screen name="drawer" component={Mainstack} />
      <Drawer.Screen name="quranDetial" component={QuranDetial} />  
      
    </Drawer.Navigator>
  );
}

export default MyDrawer