import React from "react";
import { View, Image, TouchableOpacity, SafeAreaView } from "react-native";
import styled from "styled-components";
import { Display2 } from "../static/text.js";
import { useState } from "react";
import { Dimensions } from "react-native";
import { TextPretendard as Text } from "../static/CustomText.js";
import { createStackNavigator } from "@react-navigation/stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { setItemToAsync } from "../api/storage.js";

const Stack = createStackNavigator();
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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

  const [job, setJob] = useState();

  const onPressJob = (index) => {
    setIsTouched((prev) => {
      const nextState = prev.map((item, i) => (i === index ? true : false));
      return nextState;
    });

    setSelectedJobIndex(index);
  };
  const handleJob = async () => {
    await setItemToAsync('categoryId', selectedJobIndex);
    navigation.navigate('ChooseTime')
  }

  const jobList = JOB_DATA.map((job, index) => (
    <TouchableOpacity
      key={index}
      style={{
        backgroundColor: isTouched[index] ? "#6100FF" : "#f5f5f5",
        borderRadius: 100,
        width: 280,
        height: 48,
        marginBottom: 15,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => {
        onPressJob(index);
      }}
    >
      <Text
        style={{
          color: isTouched[index] ? "white" : "#858585",
          fontWeight: "500",
        }}
      >
        {job}
      </Text>
    </TouchableOpacity>
  ));

  return (
    <Container>
      <HeaderWrapper>
        <Image style={{ height: 24, width: 217 }} source={Headerimg} />
      </HeaderWrapper>
      <MainContainer>
        <Display2>알바 종류 고르기</Display2>
      </MainContainer>
      <JobListContainer>{jobList}</JobListContainer>
      <NextBtnContainer
        onPress={handleJob}
      >
        <Image
          style={{ height: 40, width: 40 }}
          source={selectedJobIndex !== -1 ? NextBtn : NextBtnGray}
        />
      </NextBtnContainer>
      <BackBtnContainer
        onPress={() => {
          navigation.navigate("JobNickname");
        }}
      >
        <Image style={{ height: 40, width: 40 }} source={BackBtn} />
      </BackBtnContainer>
    </Container>
  );
}

const Container = styled.SafeAreaView`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;
  background-color: white;
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

const Headerimg = require("../assets/onBoarding/Header2.png");
const HeaderWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  //margin-top: 5%;
  margin-top: 24px;
  margin-bottom: 30px;
`;

const JobListContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NextBtn = require("../assets/onBoarding/Nextbtn.png");
const NextBtnGray = require("../assets/onBoarding/NextbtnGray.png");

const NextBtnContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  left: ${windowWidth * 0.85}px;
  top: ${windowHeight * 0.9}px;
  width: 40px;
  height: 40px;
`;

const BackBtn = require("../assets/onBoarding/BackbtnGray.png");
const BackBtnContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  left: ${windowWidth * 0.72}px;
  top: ${windowHeight * 0.9}px;
  width: 40px;
  height: 40px;
`;
