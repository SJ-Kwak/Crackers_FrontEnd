import React, { Image, View, useState } from "react-native";
import styled from "styled-components/native";
import { Display2, Caption1 } from "/Users/geunhye/crackersDEMO/crackers/src/static/text.js";

import { Formik } from "formik";
import * as yup from "yup";

import { createStackNavigator } from "@react-navigation/stack";
//import { View } from "react-native-web";



const Stack = createStackNavigator();

export default function JobNickname({ navigation }) {

  //const [userdata, setUserData] = useState({ jobNickname: ""});


  const getUserData = async (values) => {
    try {
      const userData = await AsyncStorage.getItem('user');
      //return userData ? JSON.parse(userData) : null;

      if (userData) {
        userData.jobNickname = values.jobNickname; // 새로운 닉네임 추가
        await AsyncStorage.setItem('userData', JSON.stringify(userData)); // 업데이트된 정보 저장
        console.log("일 종류가 저장되었습니다");
        }

    } catch (error) {
      console.log('불러오기 실패:', error);
      return null;
    }
  };


  return (
		<Formik
			initialValues={{
				jobNickname: "",
			}}
			//validationSchema={signupSchema}
			onSubmit={(values) => Alert.alert(JSON.stringify(values))}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				setFieldTouched,
				handleSubmit,
				isValid,
				isSubmitting,
			}) => (
    <Container>
      <HeaderWrapper>
        <Image 
          style={{height: 24, width: 222}}
          source={Headerimg} />
      </HeaderWrapper>

      <MainContainer>
        <Display2>알바 근무지 별명 짓기</Display2>
        <View style={{height: 40}}/>
        <Caption1>알바 근무지 별명</Caption1>
      </MainContainer>
      <NicknameInputContainer>
        <NicknameInput
          placeholder="ex, 집앞편의점, 학교카페"
          placeholderTextColor="#CCCCCC"
          //value="job"
          value={values.jobNickname}
          onChangeText={
            handleChange("jobNickname")

            //setUnder("#6100FF")
        }
          style={{
            //position: "absolute",
            borderBottomColor: values.jobNickname ? "#6100FF" : "#CCCCCC",
            borderBottomWidth: values.jobNickname ? 2 : 1,                                    
        }}
        />
      </NicknameInputContainer>
      <NextBtnContainer onPress={() => {
        navigation.navigate("ChooseJob");
        //setUserData({jobNickname: values.jobNickname});
        getUserData
        }}>
        <Image 
        style={{height: 40, width: 40}}
        source={values.jobNickname ? NextBtn : NextBtnGray} />
      </NextBtnContainer>
    </Container>
      )}
      </Formik>
  );
}

const Container = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  //margin-left: 20px;
  //margin-right: 20px;
`;

const Headerimg = require("/Users/geunhye/crackersDEMO/crackers/src/assets/onBoarding/Header1.png");
const HeaderWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  //margin-top: 5%;
  margin-top: 24px;
  margin-bottom: 48px;
`;

const MainContainer = styled.View`
  margin: 20px;
`;

const NicknameInputContainer = styled.View`
  margin: 18px 20px;
`;

const NicknameInput = styled.TextInput`
  font-size: 16;
  line-height: 16;
  //border-bottom: 5px;
  //border-color: black;
  /*:focus {
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 50px;
  }*/
  padding-Bottom: 8px;
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