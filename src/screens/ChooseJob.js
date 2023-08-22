import React, { View, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Display2 } from "/Users/geunhye/crackersDEMO/crackers/src/static/text.js";
import { useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";
import { API_URL, updateAdditionalInfo } from "../api/auth";

const Stack = createStackNavigator();

const JOB_DATA = [
  "카페 베이커리",
  "편의점",
  "레스토랑",
  "학원·과외",
  "배달",
  "물류·포장",
  "공연·전시스탭",
  "기타",
];

export default function ChooseJob({ navigation }) {
  const [selectedJobIndex, setSelectedJobIndex] = useState(-1);
  const [isTouched, setIsTouched] = useState(
    Array(JOB_DATA.length).fill(false)
  );
  const [userData, setUserData] = useState(); // userdata에 알바 종류를 저장하기 위한 상태 변수


  /*const onPressJob = (index) => {
    setIsTouched((prev) => {
      const nextState = [...prev];
      nextState[index] = !prev[index];
      return nextState;
    });
    setSelectedJobIndex(index);
    console.log(selectedJobIndex);
  };*/

  /*const getUserData = async (userData) => {
    try {
      const user = await AsyncStorage.getItem('user');
      //return userData ? JSON.parse(userData) : null;

      //const signupResponse = await updateAdditionalInfo(userdata);

      console.log(user);

      if (user) {
        user.job = userData.job; // 새로운 닉네임 추가
        await AsyncStorage.setItem('user', JSON.stringify(user)); // 업데이트된 정보 저장
        console.log("일 종류가 저장되었습니다");
        console.log(user.job);
        }

    } catch (error) {
      console.log('불러오기 실패:', error);
      return null;
    }
  };*/

  const getUserData = async (userData) => {
    try {
      const userString = await AsyncStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        //user.job = userData;
        user.job=JOB_DATA[selectedJobIndex];
        console.log(user);
        console.log(user.job);

        await AsyncStorage.setItem('user', JSON.stringify(user));
        console.log("일 종류가 저장되었습니다");
        console.log(user.job);
      }

      console.log(JOB_DATA[selectedJobIndex]);
    } catch (error) {
      console.log('불러오기 실패:', error);
    }
  };
  

  const onPressJob = (index) => {
    setIsTouched((prev) => {
      const nextState = prev.map((item, i) => (i === index ? true : false));
      return nextState;
    });

    setSelectedJobIndex(index);
    setUserData((prevData) => ({ ...prevData, job: JOB_DATA[index] }));

    console.log(userData);

  };

  /*const jobList = JOB_DATA.map((job, index) => (
    <JobContainer
      key={index}
      onPress={() => {
        onPressJob(index);
      }}
      isTouched={isTouched[index]}
    >
      <JobTouchArea isTouched={isTouched[index]}>{job}</JobTouchArea>
    </JobContainer>
  ));*/

  const jobList = JOB_DATA.map((job, index) => (
    <TouchableOpacity
      key={index}
      style={{
        backgroundColor: isTouched[index] ? '#6100FF' : '#f5f5f5',
        borderRadius: 100,
        width: 280,
        height: 48,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => {
        onPressJob(index)
      }}
    >
      <Text style={{ color: isTouched[index] ? 'white' : '#858585', fontWeight: '500' }}>
        {job}
      </Text>
    </TouchableOpacity>
  ));

  return (
    <Container>
      <HeaderWrapper>
        <Image 
          style={{height: 24, width: 217}}
        source={Headerimg} />
      </HeaderWrapper>
      <MainContainer>
        <Display2>알바 종류 고르기</Display2>
      </MainContainer>
      <View style={{height: 20}}/>
      <JobListContainer>{jobList}</JobListContainer>
      <NextBtnContainer onPress={() => {
        getUserData();
        updateAdditionalInfo(JOB_DATA[selectedJobIndex]);
        navigation.navigate("ChooseTime")
        }}>
        <Image 
        style={{height: 40, width: 40}}
        source={selectedJobIndex !== -1  ? NextBtn : NextBtnGray} />
      </NextBtnContainer>
      <BackBtnContainer onPress={() => {
        navigation.navigate("JobNickname")
        }}>
        <Image 
        style={{height: 40, width: 40}}
        source={BackBtn} />
      </BackBtnContainer>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const JobContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isTouched ? "#6100FF" : "#f5f5f5")};
  color: "#858585";
  border-radius: 100px;
  width: 280px;
  height: 48px;
  margin-bottom: 15px;
`;

const JobTouchArea = styled.Text`
  color: ${(props) => (props.isTouched ? "white" : "#858585")};
  font-weight: 500;
`;

const MainContainer = styled.View`
  margin: 20px;
`;

const Headerimg = require("/Users/geunhye/crackersDEMO/crackers/src/assets/onBoarding/Header2.png");
const HeaderWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  //margin-top: 5%;
  margin-top: 24px;
  margin-bottom: 48px;
`;

const JobListContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NextBtn = require("/Users/geunhye/crackersDEMO/crackers/src/assets/onBoarding/Nextbtn.png");
const NextBtnGray = require("/Users/geunhye/crackersDEMO/crackers/src/assets/onBoarding/NextbtnGray.png");

const NextBtnContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  left: 85%;
  top: 752px;
  width: 40px;
  height: 40px;
`;

const BackBtn = require("/Users/geunhye/crackersDEMO/crackers/src/assets/onBoarding/BackbtnGray.png");
const BackBtnContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  left: 72%;
  top: 752px;
  width: 40px;
  height: 40px;
`;