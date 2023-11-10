import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Text, Button} from 'react-native-paper';
import {rs} from '../../themes/ResponsiveScreen';
import {theme} from '../../themes/light/properties/colors';

const ToDoCard = (item: any) => {
  console.log(item?.item?.item, 'sfsfsfs');
  return (
    <View style={{margin: rs(10)}}>
      <Card mode="contained">
        <Card.Content>
          <Text variant="titleMedium">
            {item?.item?.item?.attributes?.desciption}
          </Text>
        </Card.Content>
        <Card.Actions>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <Button
                textColor={theme.colors.error}
                contentStyle={styles.iconStyle}
                labelStyle={{
                  fontSize: rs(17),
                  marginTop: rs(0),
                  marginBottom: rs(0),
                }}
                compact={true}
                icon="delete"
                mode="text">
                {' '}
              </Button>
              <Button
                textColor={theme.colors.darkgrey}
                contentStyle={styles.iconStyle}
                labelStyle={{
                  fontSize: rs(17),
                  marginTop: rs(0),
                  marginBottom: rs(0),
                }}
                compact={true}
                icon="pencil"
                mode="text">
                {' '}
              </Button>
            </View>
            <View>
              <Button
                textColor={theme.colors.onPrimary}
                buttonColor={theme.colors.primary}
                contentStyle={styles.buttonStyle}
                labelStyle={{
                  fontSize: rs(10),
                  marginTop: rs(0),
                  marginBottom: rs(0),
                }}
                compact={true}>
                Mark Complete
              </Button>
            </View>
          </View>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default ToDoCard;

const styles = StyleSheet.create({
  buttonStyle: {
    height: rs(25),
    fontSize: rs(7),
    margin: rs(0),
  },
  iconStyle: {
    height: rs(25),
    fontSize: rs(7),
    margin: rs(0),

    padding: rs(0),
  },
});
