import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, data: any = {}) => {
  let value = data;
  if (typeof data === 'object') {
    value = JSON.stringify(value);
  }
  return await AsyncStorage.setItem(key, value);
};
const removeItem = (key: string) => {
  return AsyncStorage.removeItem(key);
};

const clearAll = () => {
  return new Promise<any>(async (resolve, reject) => {
    const asyncStorageKeys = await AsyncStorage.getAllKeys();
    if (asyncStorageKeys.length > 0) {
      AsyncStorage.clear().then(resolve).catch(reject);
    } else {
      // @ts-ignore
      resolve();
    }
  });
};
const getItem = async (key: string) => {
  return await AsyncStorage.getItem(key);
};
export {setItem, getItem, removeItem, clearAll};
