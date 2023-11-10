import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {toGet, toPost} from '../config/api/ApiServices';
import {
  FAB,
  Dialog,
  Portal,
  Text,
  TextInput,
  Button,
  Snackbar,
} from 'react-native-paper';
import {theme} from '../themes/light/properties/colors';
import {rs} from '../themes/ResponsiveScreen';
import ToDoCard from '../assets/components/ToDoCard';
import Toast from 'react-native-simple-toast';

const Home = () => {
  const [toDoListData, setToDoListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [todoDescription, setTodoDescription] = useState('');

  const hideDialog = () => setVisible(false);

  const getListItems = async () => {
    const response: any = await toGet();
    setToDoListData(response.data);
    console.log(response.data, 'reponse');
  };
  const addItems = async (data: any) => {
    const response: any = await toPost(data);
    if (response.data.id) {
      setTodoDescription('');
      setVisible(false);
      getListItems();
      Toast.show('Item added!', Toast.LONG);
    }
    console.log(response.data, 'addItems');
  };

  const renderToDo = (item: any) => {
    return <ToDoCard item={item} />;
  };

  const handleAddItem = () => {
    if (todoDescription === '') {
      Toast.show('Item cannot be empty', Toast.LONG);
    } else {
      const data = {
        data: {
          desciption: todoDescription,
          done: false,
          email: 'gayathrimantha16@gmail.com',
        },
      };
      addItems(data);
    }
  };

  useEffect(() => {
    getListItems();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      getListItems();
      setRefreshing(false);
    }, 1000);
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        horizontal={false}
        data={toDoListData}
        renderItem={renderToDo}
        keyExtractor={(item: any) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      <FAB icon="plus" style={styles.fab} onPress={() => setVisible(true)} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="Add Item"
              placeholder="Type here ..."
              multiline={true}
              onChangeText={text => setTodoDescription(text)}
            />
            <View
              style={{
                width: rs(100),
                marginTop: rs(10),
                alignSelf: 'flex-end',
              }}>
              <Button
                textColor={theme.colors.onPrimary}
                buttonColor={theme.colors.primary}
                contentStyle={styles.buttonStyle}
                labelStyle={{
                  fontSize: rs(10),
                  marginTop: rs(0),
                  marginBottom: rs(0),
                }}
                compact={true}
                onPress={handleAddItem}>
                Add
              </Button>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  buttonStyle: {
    height: rs(25),
    fontSize: rs(7),
    margin: rs(0),
  },
  snackbar: {
    zIndex: 9999,
  },
});
