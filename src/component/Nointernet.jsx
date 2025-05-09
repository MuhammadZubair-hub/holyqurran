import { Text, View } from "react-native"
import Basescreen from "./Basescreen"
import LottieView from "lottie-react-native"
import { Colors } from "../utils/theme/colors"
import { vs } from "../utils/theme/responsive"

const Nointernet =()=>{
    return(
        <Basescreen containerstyle={{ backgroundColor: Colors.whiteaccent }}>
            <View
                style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: vs(16),
                paddingVertical: vs(24),
                }}
            >
                <LottieView
                source={require('../assets/Lottiefiles/nointernet.json')}
                style={{ width: '70%', height: vs(250) }}
                autoPlay
                loop={false}
                />

                <Text
                style={{
                    color: Colors.golden,
                    fontSize: vs(24),
                    fontWeight: 'bold',
                    marginTop: vs(20),
                }}
                >
                No Internet Connection
                </Text>

                <Text
                style={{
                    color: Colors.golden,
                    fontSize: vs(16),
                    textAlign: 'center',
                    marginTop: vs(10),
                    paddingHorizontal: vs(20),
                }}
                >
                Please check your Wi-Fi or mobile data and try again.
                </Text>
            </View>
            </Basescreen>
    )
}

export default Nointernet