import {View, Text, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {rs} from '../../themes/ResponsiveScreen';
import {theme} from '../../themes/light/properties/colors';
import {typography} from '../../themes/light/properties/typography';

const Header = () => {
  const platform = Platform.OS;
  return (
    <View
      style={{
        height: platform == 'ios' ? rs(60) : rs(40),
        backgroundColor: theme.colors.primary,
      }}>
      <Text
        style={{
          color: theme.colors.background,
          marginTop: platform == 'ios' ? rs(27) : rs(11),
          marginLeft: rs(11),
          fontSize: rs(15),
          fontFamily: typography.Title,
        }}>
        TO DO APP
      </Text>
    </View>
  );
};

export default Header;

//Stylesheet
const styles = StyleSheet.create({
  mainContainer: {},
  headerText: {},
});
