import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {toGet, toGetWithFilters, toPost} from '../config/api/ApiServices';
import {
  FAB,
  Dialog,
  Portal,
  Text,
  TextInput,
  Button,
  Snackbar,
  Modal,
  SegmentedButtons,
  Divider,
} from 'react-native-paper';
import {theme} from '../themes/light/properties/colors';
import {rs} from '../themes/ResponsiveScreen';
import ToDoCard from '../assets/components/ToDoCard';
import Toast from 'react-native-simple-toast';
import Header from '../assets/components/Header';
import {Searchbar} from 'react-native-paper';
import {IconButton, MD3Colors} from 'react-native-paper';

const Home = () => {
  const [toDoListData, setToDoListData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [todoDescription, setTodoDescription] = useState('');
  const [deletedItem, sstDeletedItem] = useState(0);
  const [searchKey, setSearchKey] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('');

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: rs(10),
    borderRadius: rs(10),
  };

  const onChangeSearch = (key: any) => {
    console.log(key, 'KEY SEARCH');
    setSearchKey(key);
    getListItemsWithFilters(key, status, sortBy);
  };

  const hideDialog = () => setVisible(false);

  const getListItems = async () => {
    const response: any = await toGet();
    setToDoListData(response.data);
    console.log(response.data, 'reponse');
  };

  const getListItemsWithFilters = async (
    search: string,
    newStatus: string,
    sort: string,
  ) => {
    const response: any = await toGetWithFilters(search, newStatus, sort);
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
  const handleDeleteItem = (id: number) => {
    // Do something when an item is pressed
    console.log('Item pressed:', id);
    sstDeletedItem(deletedItem + 1);
  };

  const renderToDo = (item: any) => {
    return <ToDoCard item={item} onPressItem={handleDeleteItem} />;
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
  }, [deletedItem]);

  const handleRefresh = () => {
    setRefreshing(true);
    setSearchKey('');
    setStatus('');
    setSortBy('');

    setTimeout(() => {
      getListItems();
      setRefreshing(false);
    }, 1000);
  };

  const handleChangeStatus = (key: any) => {
    console.log(key, 'KEY STATUS');
    setStatus(key);
    getListItemsWithFilters(searchKey, key, sortBy);
  };

  const handleChangeSortBy = (key: any) => {
    console.log(key, 'KEY SORT BY');
    setSortBy(key);
    getListItemsWithFilters(searchKey, status, key);
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={{flexDirection: 'row', width: '100%'}}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchKey}
          style={styles.searchBar}
        />
        <IconButton
          icon="filter"
          iconColor={theme.colors.primary}
          size={20}
          onPress={() => showModal()}
          containerColor={theme.colors.lightViolet}
          style={styles.filterIcon}
        />
      </View>

      <FlatList
        horizontal={false}
        data={toDoListData}
        renderItem={renderToDo}
        keyExtractor={(item: any) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        contentContainerStyle={{paddingBottom: rs(70)}}
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
      <Portal>
        <Modal
          style={styles.modalConatiner}
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text style={styles.modalText}>Show</Text>
          <SegmentedButtons
            value={status}
            onValueChange={handleChangeStatus}
            buttons={[
              {
                value: '',
                label: 'All',
              },
              {
                value: 'false',
                label: 'Pending',
              },
              {value: 'true', label: 'Completed'},
            ]}
          />
          <View style={styles.itemHr}></View>
          <Text style={styles.modalText}>Sort By</Text>
          <SegmentedButtons
            value={sortBy}
            onValueChange={handleChangeSortBy}
            buttons={[
              {
                value: '',
                label: 'None',
              },
              {
                value: 'asc',
                label: 'Old to New',
              },
              {value: 'desc', label: 'New to Old'},
            ]}
          />
        </Modal>
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
  searchBar: {
    margin: rs(10),
    width: '80%',
  },
  filterIcon: {
    marginTop: rs(18),
  },
  modalConatiner: {
    margin: rs(10),
  },
  modalText: {
    fontSize: rs(10),
    margin: rs(5),
  },
  itemHr: {
    height: rs(1),
    width: '100%',
    backgroundColor: theme.colors.lightGrey,
    marginTop: rs(7),
  },
});
