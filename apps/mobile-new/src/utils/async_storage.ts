import AsyncStorage from "@react-native-async-storage/async-storage";

const setItem = async (key: any, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    return e;
  }
};

const getItem = async (key: any) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    return null;
  }
};

const removeItem = async (key: any) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    return e;
  }
};

const AsyncStorageUtils = {
  getItem,
  setItem,
  removeItem,
};
export default AsyncStorageUtils;
