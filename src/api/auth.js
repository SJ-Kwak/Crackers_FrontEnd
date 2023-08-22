//auth.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from "@react-navigation/stack";


const API_URL = 'http://43.200.210.160:8080/api/v2';

/*export const loginRequest = async (loginId, password) => {
  try {
    const response = await axios.post(`${API_URL}/accounts/signin`, {
      loginId: loginId,
      password: password,
    }, {
      headers: {
        // 헤더 설정
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaXRyb25pdW0iLCJsb2dpbklkIjoibml0cm9uaXVtIiwiaWF0IjoxNjgyNzIxNTg0LCJleHAiOjE2ODI4MDc5ODR9.MIkVdDkP5PD6jOfu4PUWNLBIh807obGl0MlfQwVx-fk',
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};*/

/*export const loginRequest = () => {
  if(condition) {
    fetch("http://43.200.210.160:8080/api/v2/accounts/signin", {
      method: 'POST',
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify({
        email: id,
        password: pw
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if(result.token !== undefined) {
          localStorage.setItem('access_token : ', result.token)
          navigate("/list-haneul");
          sessionStorage.setItem("id", id);
        }
        else {
          alert('아이디 또는 패스워드를 확인해주세요!');
        }
      }
    )
  }
}*/

/*export const signupRequest = async (loginId, password) => {
  try {
    console.log(loginId, password);
    const response = await axios.post(`${API_URL}/accounts/signup`, {
      loginId: loginId,
      password: password,
    }, {
      headers: {
        // 헤더 설정
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaXRyb25pdW0iLCJsb2dpbklkIjoibml0cm9uaXVtIiwiaWF0IjoxNjgyNzIxNTg0LCJleHAiOjE2ODI4MDc5ODR9.MIkVdDkP5PD6jOfu4PUWNLBIh807obGl0MlfQwVx-fk',
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};*/



/*export const signupRequest = async (loginId, password, nickname) => {
  try {
    const response = await axios.post(`${API_URL}/accounts/signup`, {
      loginId: loginId,
      password: password,
      nickname: nickname,
    }, {
      headers: {
        // 헤더 설정
        //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaXRyb25pdW0iLCJsb2dpbklkIjoibml0cm9uaXVtIiwiaWF0IjoxNjgyNzIxNTg0LCJleHAiOjE2ODI4MDc5ODR9.MIkVdDkP5PD6jOfu4PUWNLBIh807obGl0MlfQwVx-fk',
        'Content-Type': 'application/json',
      }
    });

    // 회원가입 성공 후 처리 로직 추가
    const { token, user } = response.data;

    // 토큰과 사용자 정보를 로컬 저장소에 저장
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));

    // 회원가입된 사용자 정보 반환
    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};*/

/*export const signupRequest=(email, password)=>{
  fetch('http://43.200.210.160:8080/api/v2/accounts/signup', {
    method: 'POST',
    body: JSON.stringify({
      loginId: email,
      password: password,
      nickname: "어쩌구",
    }),
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response=>response.text())
  .then(console.log(email, password))
  .then(result=>console.log(result))
  .catch(error=>console.log('error', error));

            // 예시: 회원가입 후 자동 로그인 처리
          // const { token, user } = signupResponse;
      
          // // 토큰과 사용자 정보를 로컬 저장소에 저장
          // await AsyncStorage.setItem('token', token);
          // await AsyncStorage.setItem('user', JSON.stringify(user));

  return result;
}*/

export const signupRequest = async (email, password) => {
  try {
    const response = await fetch('http://43.200.210.160:8080/api/v2/accounts/signup', {
      method: 'POST',
      body: JSON.stringify({
        "loginId": email,
        "password": password,
        "nickname": "어쩌구",
      }),
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();
    console.log(result);
    //console.log(result.accessToken);

    // 회원가입 성공 후 처리 로직 추가
    //const { token } = result;
    // 토큰과 사용자 정보를 로컬 저장소에 저장
    if(result){
      await AsyncStorage.setItem('accessToken', result.accessToken);
      await AsyncStorage.setItem('refreshToken', result.refreshToken);
      //await AsyncStorage.setItem('user', JSON.stringify(user));
      //await AsyncStorage.setItem('user', response.body);

      //console.log(result.accessToken);
      //console.log(response.body);
      //navigation.navigate("Main")
    }


    return result;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const updateAdditionalInfo = async (additionalInfo) => {
  try {
    const accessToken=await AsyncStorage.getItem('accessToken');
    const userString = await AsyncStorage.getItem('user');

    console.log(accessToken);
    
    const requestBody = JSON.stringify({
      "name": additionalInfo,
      "wage": 10000,
      "scheduleList": [
        {
          "day": "화",
          "startTime": 1600,
          "endTime": 2100
        },
        {
          "day": "목",
          "startTime": 1600,
          "endTime": 2100
        }
      ],
      "categoryId": 1,
    });

    const response = await fetch(`http://43.200.210.160:8080/api/v2/workspaces`, {
      method: 'POST',
      /*body: 
      {
          "workspceId": JSON.stringify(additionalInfo),
          "name": "영어학원",
          "wage": 10000,
          "schedules": [
            {
              "day": "화",
              "startTime": 1600,
              "endTime": 2100
            },
            {
              "day": "목",
              "startTime": 1600,
              "endTime": 2100
            }
          ],
          "categoryId": 1
        },*/
      /*body: 
      {
        "name": JSON.stringify(additionalInfo),
        "wage": 10000,
        "scheduleList": [
            {
                "day": "화",
                "startTime": 1600,
                "endTime": 2100
            },
            {
                "day": "목",
                "startTime": 1600,
                "endTime": 2100
            }
        ],
        "categoryId": 1,
      },*/
      body: requestBody,
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        // 토큰을 헤더에 포함하여 인증
        'Authorization': `Bearer ${accessToken}`,
      }
    });

    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const loginRequest = async (email, password) => {
  try {
    const response = await fetch('http://43.200.210.160:8080/api/v2/accounts/signin', {
      method: 'POST',
      body: JSON.stringify({
        loginId: email,
        password: password,
      }),
      redirect: 'follow',
      headers: {
        //'Authrization': 'Bearer '
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();
    console.log(result);

    // 회원가입 성공 후 처리 로직 추가
    //const { token, user } = JSON.parse(result);
    /*if(result){
      await AsyncStorage.getItem('accessToken', result.accessToken);
      await AsyncStorage.getItem('refreshToken', result.refreshToken);
      //await AsyncStorage.setItem('user', JSON.stringify(user));
    }*/

    return result;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

/*export const loginRequest = async (loginId, password) => {
  try {
    const response = await axios.post(`${API_URL}/accounts/signin`, {
      loginId: loginId,
      password: password,
    });

    // 로그인 성공 후 처리 로직 추가
    const { token, user } = response.data;

    // 토큰과 사용자 정보를 로컬 저장소에 저장
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));

    // 로그인된 사용자 정보 반환
    return user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};*/

export const isAuthenticated = async () => {
  // 로컬 저장소에서 토큰을 가져옴
  const token = await AsyncStorage.getItem('token');

  // 토큰이 존재하면 인증된 것으로 간주
  return !!token;
};





