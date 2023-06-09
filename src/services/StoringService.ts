import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (value: any, key: string) => {
  try {
    let oldValue = await getData(key);
    let newValue = oldValue ? [...oldValue, value] : [value];

    const jsonValue = JSON.stringify(newValue);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    return false;
    // saving error
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return [];
    // error reading value
  }
};

export const deleteData = async (value: any, key: string) => {
  try {
    let oldValue = await getData(key);
    let newValue = oldValue ? oldValue.filter((list: any) => list.id !== value.id) : null;
    const jsonValue = JSON.stringify(newValue);
    await AsyncStorage.setItem(key, jsonValue);
    return "success";
  } catch (e) {
    return "fail";
    // saving error
  }
};

export const updateData = async (value: any, key: string) => {
  try {
    let oldValue = await getData(key);
    let newValue = oldValue ? oldValue.map((list: any) => (list.id === value.id ? value : list)) : null;
    const jsonValue = JSON.stringify(newValue);
    await AsyncStorage.setItem(key, jsonValue);
    return "success";
  } catch (e) {
    return "fail";
    // saving error
  }
};

export const deleteStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    jsonValue != null ? await AsyncStorage.removeItem(key) : null;

    return "success";
  } catch (e) {
    return "fail";
    // saving error
  }
};
