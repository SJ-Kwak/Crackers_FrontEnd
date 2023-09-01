import AsyncStorage from "@react-native-async-storage/async-storage";

// export async function setItem (key, value) {
//   await AsyncStorage.setItem(key, JSON.stringify(value))
// }

// export async function getItem (key) {
//   await AsyncStorage.getItem(key)
// }

// export async function removeItem (key) {
//   await AsyncStorage.removeItem(key)
// }

// export async function setAccessToken (token) {
//   await AsyncStorage.setItem('accessToken', JSON.stringify(token))
// }

// export async function getAccessToken () {
//   await AsyncStorage.getItem('accessToken')
// }

// export async function removeAccessToken () {
//   await AsyncStorage.removeItem('accessToken')
// }

// export async function setRefreshToken (token) {
//   await AsyncStorage.setItem('refreshToken', JSON.stringify(token))
// }

// export async function getRefreshToken () {
//   await AsyncStorage.getItem('refreshToken')
// }

// export async function removeRefreshToken () {
//   await AsyncStorage.removeItem('refreshToken')
// }

const isEmpty = function (value) {
  if (value === '' || value === null || value === undefined || (value !== null && typeof value === 'object' && !Object.keys(value).length)) {
    return true;
  } else {
    return false;
  }
};

// AsyncStorage get 함수 모듈
export const getItemFromAsync = (storageName) => {
  if (isEmpty(storageName)) {
    throw Error('Storage Name is empty');
  }
  
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(storageName, (err, result) => {
      if (err) {
        reject(err);
      }
      
      if (result === null) {
        resolve(null);
      }
      
      resolve(JSON.parse(result));
    });
  });
};

// AsyncStorage set 함수 모듈
export const setItemToAsync = (storageName, item) => {
  if (isEmpty(storageName)) {
    throw Error('Storage Name is empty');
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(storageName, JSON.stringify(item), (error) => {
      if (error) {
        reject(error);
      }
      
      resolve('set Success');
    });
  });
};

// AsyncStorage remove 함수 모듈
export const removeItemFromAsync = (storageName) => {
  if (isEmpty(storageName)) {
    throw Error('Storage Name is empty');
  }
  
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem(storageName, (err, result) => {
      if (err) {
        reject(err);
      }
      
      if (result === null) {
        resolve(null);
      }
      
      resolve('remove Success');
    });
  });
}