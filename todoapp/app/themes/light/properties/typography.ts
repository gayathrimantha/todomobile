import {Platform} from 'react-native';

export const typography = {
  Main: Platform.select({
    ios: 'Lato-Regular',
    android: 'Lato-Regular',
  }),
  Title: Platform.select({
    ios: 'Lato-Bold',
    android: 'Lato-Bold',
  }),
  Sub: Platform.select({
    ios: 'Lato-Thin',
    android: 'Lato-Thin',
  }),
};
