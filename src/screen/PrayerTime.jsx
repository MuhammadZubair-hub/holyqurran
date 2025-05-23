import { useEffect, useState } from "react";
import { Platform, PermissionsAndroid, Alert, FlatList, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Geolocation from "react-native-geolocation-service";
import Basescreen from "../component/Basescreen"
import { Api_Services } from "../services/Api_Services";
import { getAppColors } from "../utils/theme/colors"
import { useRoute } from "@react-navigation/native";
import { mvs, vs } from "../utils/theme/responsive";
import { useNetwork } from "../services/Networkporvider";

const ParyerTime = () => {
  const route = useRoute();
  const { ref } = route.params;

  const date = new Date().toISOString().split('T')[0];
  const [namaztime, setNamazTime] = useState({});
  const [currentPrayer, setCurrentPrayer] = useState('');

  const { theme } = useNetwork();
  const Colors = getAppColors(theme);

  useEffect(() => {
    getNamaz();
  }, []);

  const getNamaz = async () => {
    try {
      const response = await Api_Services.getNamazTime({
        date: date,
        location: {
          latitude: ref.latitude,
          longitude: ref.longitude,
        },
      });

      const timings = response?.data?.data?.timings;
      setNamazTime(timings);

      determineCurrentPrayer(timings);
    } catch (error) {
      console.log('the error is :', error);
    }
  };

  const getTimeInMinutes = (timeStr) => {
    const [hourStr, minStr] = timeStr.split(':');
    return parseInt(hourStr) * 60 + parseInt(minStr);
  };

  const determineCurrentPrayer = (timings) => {
    const current = new Date();
    const currentMinutes = (current.getHours() * 60 + current.getMinutes());
    console.log(currentMinutes);

    let lastPrayer = '';
    let lastTime = 0;

    Object.entries(timings).forEach(([key, value]) => {
      const minutes = getTimeInMinutes(value);
      console.log(minutes)
      if (currentMinutes >= lastTime && currentMinutes < minutes) {
        lastPrayer = key;
      }
      lastTime = minutes;
    });

    setCurrentPrayer(lastPrayer || Object.keys(timings)[Object.keys(timings).length - 1]);
  };

  const renderFunction = ({ item }) => {
    const [key, value] = item;
    const [hour, minute] = value.split(':').map(Number);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hour12 = (hour % 12) || 12;

    const formattedHour = String(hour12).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');

    const isCurrent = key === currentPrayer;

    return (
      <TouchableOpacity
        style={[
          styles.flatlistcard,
          {
            backgroundColor: isCurrent ? Colors.golden : Colors.whiteaccent,
            borderRightColor: Colors.golden,
            borderBottomColor: Colors.golden,
          },
        ]}
      >
        <Text
          style={[
            styles.firsttext,
            {
              color: isCurrent ? Colors.white : Colors.primary,
              fontWeight: isCurrent ? 'bold' : 'normal',
            },
          ]}
        >
          {key}: {formattedHour}:{formattedMinute} {suffix}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Basescreen containerstyle={{ backgroundColor: Colors.secondary }}>
      <View style={{ backgroundColor: Colors.primary, borderRadius: 5 }}>
        <Text
          style={{
            color: Colors.golden,
            paddingVertical: 20,
            textAlign: 'center',
            fontSize: 20,
          }}
        >
          ----: Namaz Timing :----
        </Text>
      </View>
      <FlatList
        data={Object.entries(namaztime)}
        keyExtractor={([key], index) => key + index}
        renderItem={renderFunction}
      />
    </Basescreen>
  );
};

export default ParyerTime;


const styles = StyleSheet.create({

  flatlistcard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: mvs(10),
    margin: 10,
    borderBottomWidth: 5,
    borderRightWidth: 5
  },


  firsttext: {
    paddingVertical: vs(10),
    fontSize: vs(25),
    fontWeight: '500',
    textAlign: 'center',
    marginHorizontal: vs(10)
  },

})
