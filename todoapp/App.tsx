import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Home from './app/screens/Home';
import {theme} from './app/themes/light/properties/colors';

const App = () => {
  return (
    <View style={styles.mainContainer}>
      <Home />
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
