import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  Card,
  Text,
  Button,
  Dialog,
  Portal,
  TextInput,
} from 'react-native-paper';
import {rs} from '../../themes/ResponsiveScreen';
import {theme} from '../../themes/light/properties/colors';
import Toast from 'react-native-simple-toast';
import {toDelete, toUpdate} from '../../config/api/ApiServices';
import {formatDate} from '../functions/dateFormat';
import {typography} from '../../themes/light/properties/typography';
type RenderItemComponentProps = {
  item: any;
  onPressItem: (id: number) => void;
};
const ToDoCard: React.FC<RenderItemComponentProps> = ({item, onPressItem}) => {
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [todoDescription, setTodoDescription] = useState(
    item?.item?.attributes?.desciption,
  );
  const [createdDate, setCreatedDate] = useState(
    item?.item?.attributes?.createdAt,
  );
  const [todoDescriptionOne, setTodoDescriptionOne] = useState(
    item?.item?.attributes?.desciption,
  );
  const [todoId, setTodoId] = useState(item?.item?.id);
  const [done, setDone] = useState(item?.item?.attributes?.done);

  //Hide delete prompt
  const hideDeleteDialog = () => setDeleteVisible(false);

  //Function to update item
  const updateItems = async (data: any) => {
    const response: any = await toUpdate(todoId, data);
    if (response.data.id) {
      setTodoDescriptionOne(response.data.attributes.desciption);
      setDone(response.data.attributes.done);
      setVisible(false);
      Toast.show('Item updated!', Toast.LONG);
    }
  };

  //Function to delete item
  const deleteItems = async () => {
    const response: any = await toDelete(todoId);
    if (response.data.id) {
      Toast.show('Item Deleted!', Toast.LONG);
      setDeleteVisible(false);
      onPressItem(response.data.id);
    }
  };

  //To Hide edit dialog
  const hideDialog = () => setVisible(false);

  //Handle Update, Delete and Mark Complete Actions
  const handleUpdateItem = (type: any) => {
    if (type != 'delete') {
      if (todoDescription === '') {
        Toast.show('Item cannot be empty', Toast.LONG);
      } else {
        const data = {
          data: {
            desciption: todoDescription,
            done: type == 'completed' ? true : type == 'mark' ? false : done,
            email: 'sai@testing.com',
          },
        };
        updateItems(data);
      }
    } else {
      deleteItems();
    }
  };

  //Delete prompt
  const handleDelete = () => {
    setDeleteVisible(true);
  };
  return (
    <View style={styles.cardContainer}>
      <Card mode="contained">
        <Card.Content>
          <Text style={{fontFamily: typography.Title, fontSize: rs(14)}}>
            {todoDescriptionOne}
          </Text>
          <Text style={styles.dateFormat}>
            Added on {formatDate(createdDate)}
          </Text>
        </Card.Content>
        <View style={styles.itemHr}></View>
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
                mode="text"
                onPress={() => handleDelete()}>
                {''}
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
                mode="text"
                onPress={() => setVisible(true)}>
                {''}
              </Button>
            </View>
            <View>
              <Button
                textColor={theme.colors.onPrimary}
                buttonColor={
                  done
                    ? theme.colors.lightGreen
                    : done == null
                    ? theme.colors.error
                    : theme.colors.primary
                }
                contentStyle={styles.buttonStyle}
                labelStyle={{
                  fontSize: rs(10),
                  marginTop: rs(0),
                  marginBottom: rs(0),
                  fontFamily: typography.Main,
                }}
                compact={true}
                onPress={() => handleUpdateItem(done ? 'mark' : 'completed')}>
                {done
                  ? 'Completed'
                  : done == null
                  ? 'Status Unknown'
                  : 'Mark Complete'}
              </Button>
            </View>
          </View>
        </Card.Actions>
      </Card>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="To-Do Item"
              placeholder="Type here ..."
              multiline={true}
              value={todoDescription}
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
                onPress={() => handleUpdateItem('update')}>
                Update
              </Button>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={deleteVisible} onDismiss={hideDeleteDialog}>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure to delete?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => hideDeleteDialog()}>Cancel</Button>
            <Button onPress={() => handleUpdateItem('delete')}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ToDoCard;

//Stylesheet
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
  dateFormat: {
    fontSize: rs(10),
    fontFamily: typography.Main,
    marginTop: rs(5),
  },
  itemHr: {
    height: rs(1),
    width: '100%',
    backgroundColor: theme.colors.lightGrey,
    marginTop: rs(7),
  },
  cardContainer: {
    marginHorizontal: rs(10),
    marginTop: rs(10),
  },
});
