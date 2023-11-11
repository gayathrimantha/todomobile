import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {rs} from '../../themes/ResponsiveScreen';
import {theme} from '../../themes/light/properties/colors';

const Header = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerText}>TO DO APP</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    height: rs(40),
    backgroundColor: theme.colors.primary,
  },
  headerText: {
    color: theme.colors.background,
    marginTop: rs(9),
    marginLeft: rs(11),
    fontSize: rs(15),
    fontWeight: '700',
  },
});
