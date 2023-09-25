import React, { useState } from "react";
import { Image, View, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Display2, Caption1 } from "../static/text.js";
import { Dimensions } from "react-native";

import { Formik } from "formik";
import * as yup from "yup";

import { createStackNavigator } from "@react-navigation/stack";
//import { View } from "react-native-web";

import { Request } from "../api/request.js";
import { setItemToAsync } from "../api/storage.js";

const Stack = createStackNavigator();
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


export default function JobNickname({ navigation }) {

  const setItem = async (values) => {
    await setItemToAsync('name', values.jobNickname)
    navigation.navigate('ChooseJob')
  }

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
            <Image style={{ height: 24, width: 222 }} source={Headerimg} />
          </HeaderWrapper>

          <MainContainer>
            <Display2>알바 근무지 별명 짓기</Display2>
            <View style={{ height: 40 }} />
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
                fontFamily: 'Pretendard'
              }}
            />
          </NicknameInputContainer>
          <NextBtnContainer
            onPress={() => 
              setItem(values)}
          >
            <Image
              style={{ height: 40, width: 40 }}
              source={values.jobNickname ? NextBtn : NextBtnGray}
            />
          </NextBtnContainer>
        </Container>
      )}
    </Formik>
  );
}

const Container = styled.SafeAreaView`
  display: flex;
  background-color: white;
  flex: 1;
`;

const Headerimg = require("../assets/onBoarding/Header1.png");
const HeaderWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 48px;
`;

const MainContainer = styled.View`
  margin: 20px;
`;

const NicknameInputContainer = styled.View`
  margin: 10px 20px;
  height: 40px;
`;

const NicknameInput = styled.TextInput`
  font-size: 16px;
  line-height: 20px;
  padding-bottom: 8px;
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
