import {Config} from '../Constants';
import axios from 'axios';

export async function toPost(data: any) {
  try {
    const response = await axios.post(`${Config.baseUrl}/`, data);

    console.log(response.data, 'resp');
    return response.data;
  } catch (e) {
    console.log('failed', e);

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
    console.log('failed', e);

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
    console.log(
      `${
        Config.baseUrl
      }?filters[desciption][$contains]=${searchKey}&filters[done][$contains]=${statusItem}&sort[0]=createdAt${
        date != '' ? ':' + date : ''
      }`,
      'url',
    );
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
    console.log('failed', e);

    return {response: false, error: 0, msg: 'Network Failed'};
  }
}

export async function toUpdate(id: number, data: any) {
  try {
    const response = await axios.put(`${Config.baseUrl}/${id}`, data);

    console.log(response.data, 'resp');
    return response.data;
  } catch (e) {
    console.log('failed', e);

    return {response: false, error: 0, msg: 'Network Failed'};
  }
}

export async function toDelete(id: number) {
  try {
    const response = await axios.delete(`${Config.baseUrl}/${id}`);

    console.log(response.data, 'resp');
    return response.data;
  } catch (e) {
    console.log('failed', e);

    return {response: false, error: 0, msg: 'Network Failed'};
  }
}
