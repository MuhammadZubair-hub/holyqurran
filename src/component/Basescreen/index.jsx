import { View } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { mvs } from "../../utils/theme/responsive";

const  Basescreen =({
    children,
    scroable = false,
    containerstyle,
    horizantel,
    padding=0,
    paddingBottom=0,
    paddingHorizontal=0,
    paddingTop=0

    })=>{

        const inset = useSafeAreaInsets();

       if(scroable){
        return(
            <KeyboardAwareScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal={horizantel}
            enableAutomaticScroll
            scrollEnabled
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            style={{flex: 1,}}
            contentContainerStyle={[
                {
                  flexGrow: 1,
                  padding: mvs(padding),
                  paddingBottom: mvs(paddingBottom),
                  paddingTop: mvs(paddingTop),
                  paddingHorizontal: mvs(paddingHorizontal),
                },
                containerstyle,
              ]}
            >
                <View style={{flex:1}} >{children}</View>
            </KeyboardAwareScrollView>

        )

       }
       else{
        return(

            <View style={[ {flex:1},{paddingTop: inset.top, paddingBottom:inset.bottom} ,containerstyle ]} >
                {children}
            </View>
        )
       } 
    
}

export default Basescreen;