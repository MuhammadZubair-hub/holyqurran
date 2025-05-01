import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Splashscreen = () => {
  return (
    <View style={{justifyContent:'center'}}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

export default Splashscreen;