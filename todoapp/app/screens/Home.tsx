import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {toGet} from '../config/api/ApiServices';
import {Card, Text, Button} from 'react-native-paper';
import {theme} from '../themes/light/properties/colors';
import {rs} from '../themes/ResponsiveScreen';
import ToDoCard from '../assets/components/ToDoCard';

const Home = () => {
  const [toDoListData, setToDoListData] = useState([]);
  const getListItems = async () => {
    const response: any = await toGet();
    setToDoListData(response.data);
    console.log(response.data, 'reponse');
  };
  const renderToDo = (item: any) => {
    return <ToDoCard item={item} />;
  };

  useEffect(() => {
    getListItems();
  }, []);

  return (
    <View>
      <FlatList
        horizontal={false}
        data={toDoListData}
        renderItem={renderToDo}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};

export default Home;
