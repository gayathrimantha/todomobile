import {Config} from '../Constants';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

export async function toPost(data: any) {
  try {
    const response = await axios.post(`${Config.baseUrl}/`, data);

    console.log(response.data, 'resp');
    return response.data;
  } catch (e) {
    Toast.show('Something went wrong, Please try again!', Toast.LONG);

    return {response: false, error: 0, msg: 'Network Failed'};
  }
}

export async function toGet() {
  try {
    console.log(Config.baseUrl, 'url');
    const header = {};
    const response = await axios.get(`${Config.baseUrl}`, header);

    console.log(response.data, 'resp');
    return response.data;
  } catch (e) {
    Toast.show('Something went wrong, Please try again!', Toast.LONG);

    return {response: false, error: 0, msg: 'Network Failed'};
  }
}

export async function toGetWithFilters(
  searchKey: string,
  status: string,
  date: string,
) {
  const statusItem = status == '' ? '' : status == 'false' ? 0 : 1;
  try {
    const header = {};
    const response = await axios.get(
      `${
        Config.baseUrl
      }?filters[desciption][$contains]=${searchKey}&filters[done][$contains]=${statusItem}&sort[0]=createdAt${
        date != '' ? ':' + date : ''
      }`,
      header,
    );

    console.log(response.data, 'resp');
    return response.data;
  } catch (e) {
    Toast.show('Something went wrong, Please try again!', Toast.LONG);

    return {response: false, error: 0, msg: 'Network Failed'};
  }
}

export async function toUpdate(id: number, data: any) {
  try {
    const response = await axios.put(`${Config.baseUrl}/${id}`, data);

    console.log(response.data, 'resp');
    return response.data;
  } catch (e) {
    Toast.show('Something went wrong, Please try again!', Toast.LONG);

    return {response: false, error: 0, msg: 'Network Failed'};
  }
}

export async function toDelete(id: number) {
  try {
    const response = await axios.delete(`${Config.baseUrl}/${id}`);

    console.log(response.data, 'resp');
    return response.data;
  } catch (e) {
    Toast.show('Something went wrong, Please try again!', Toast.LONG);

    return {response: false, error: 0, msg: 'Network Failed'};
  }
}
