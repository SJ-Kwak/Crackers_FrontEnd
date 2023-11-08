import AsyncStorage from "@react-native-async-storage/async-storage";

const isEmpty = function (value) {
  if (
    value === "" ||
    value === null ||
    value === undefined ||
    (value !== null && typeof value === "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

// AsyncStorage get 함수 모듈
export const getItemFromAsync = storageName => {
  if (isEmpty(storageName)) {
    throw Error("Storage Name is empty");
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(storageName, (err, result) => {
      if (err) {
        reject(err);
        return; // 오류 발생 시 함수 종료
      }

      try {
        if (result === null) {
          resolve(null);
        } else {
          resolve(JSON.parse(result));
        }
      } catch (error) {
        reject(error); // JSON 파싱 오류 처리
      }
    });
  });
};

// AsyncStorage set 함수 모듈
export const setItemToAsync = (storageName, item) => {
  if (isEmpty(storageName)) {
    throw Error("Storage Name is empty");
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(storageName, JSON.stringify(item), error => {
      if (error) {
        reject(error);
      }

      resolve("set Success");
    });
  });
};

// AsyncStorage remove 함수 모듈
export const removeItemFromAsync = storageName => {
  if (isEmpty(storageName)) {
    throw Error("Storage Name is empty");
  }

  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem(storageName, (err, result) => {
      if (err) {
        reject(err);
      }

      if (result === null) {
        resolve(null);
      }

      resolve("remove Success");
    });
  });
};

export const clearItemsFromAsync = () => {
  AsyncStorage.clear();
};
