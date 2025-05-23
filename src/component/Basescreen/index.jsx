import { View } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { mvs } from "../../utils/theme/responsive";
import {  getAppColors } from "../../utils/theme/colors";
import { useNetwork } from "../../services/Networkporvider";


const Basescreen = ({
  children,
  scroable = false,
  containerstyle,
  horizontal,
  padding = 0,
  paddingBottom = 0,
  paddingHorizontal = 0,
  paddingTop = 0
}) => {
  
  const {theme} = useNetwork();
  const Colors = getAppColors(theme);
  const inset = useSafeAreaInsets();

  const containerPadding = {
    padding: mvs(padding),
    //paddingBottom: mvs(paddingBottom) + inset.bottom,
    //paddingTop: mvs(paddingTop) + inset.top,
    paddingHorizontal: mvs(paddingHorizontal),
  };

  if (scroable) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Colors.primary }} // or your theme color
        edges={['top', 'bottom']}
      >
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal={horizontal}
          enableAutomaticScroll
          scrollEnabled
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1 }}
          contentContainerStyle={[
            { flexGrow: 1, ...containerPadding },
            containerstyle,
          ]}
        >
          <View style={{ flex: 1 }}>{children}</View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView
        style={[
          { flex: 1, backgroundColor: Colors.primary, ...containerPadding },
          containerstyle,
        ]}
        edges={['top','bottom']}
      >
        {children}
      </SafeAreaView>
    );
  }
};

export default Basescreen;