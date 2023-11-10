import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {toGet} from '../config/api/ApiServices';
import {Card, Text, Button} from 'react-native-paper';
import {theme} from '../themes/light/properties/colors';
import {rs} from '../themes/ResponsiveScreen';

const Home = () => {
  const getListItems = async () => {
    const response: any = await toGet();

    console.log(response, 'reponse');
  };

  useEffect(() => {
    getListItems();
  }, []);

  return (
    <View>
      <Card>
        <Card.Content>
          <Text variant="titleMedium">Card title</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            textColor="#fff"
            buttonColor={theme.colors.primary}
            compact={true}
            style={styles.buttonStyle}>
            OK
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttonStyle: {
    height: rs(30),
    lineHeight: rs(30),
    padding: rs(5),
  },
});
