import React from "react-native";
import styled from "styled-components/native";

import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
  Keyboard,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";
//import useKeyboardHeight from "react-native-use-keyboard-height";

import { Request } from "../api/request";

const Stack = createStackNavigator();
const backIcon = require("../assets/tch_btnBack.png");

const signupSchema = yup.object().shape({
  nickname: yup
    .string()
    .required("닉네임을 입력해 주세요")
    .max(8, "8자 이내로 닉네임을 입력해주세요"),
  //.matches(/\d/, "영문과 숫자를 입력해주세요"),
});

export default function AdjNickScreen({ navigation }) {
  const [under, setUnder] = useState("#CCCCCC");
  //const keyboardHeight = useKeyboardHeight();
  const request = new Request();

  const handleNickname = async (values) => {
    const response = await request.patch("/accounts/profile", {
      nickname: values.nickname,
    });
    if (response.status === 200) {
      navigation.goBack();
    } else {
      Alert.alert("닉네임 수정에 실패하였습니다!");
    }
  };

  return (
    <Formik
      initialValues={{
        nickname: "",
      }}
      validationSchema={signupSchema}
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
        <Wrapper>
          <BackToHome onPress={() => navigation.goBack()}>
            <BackIcon source={backIcon} />
          </BackToHome>
          <FormContainer>
            <Title>닉네임 수정하기</Title>
            <View style={{ height: 200 }} />
            <SubTitle>닉네임</SubTitle>
            <View style={{ height: 18 }} />
            <InputWrapper>
              <InputTxt
                style={{
                  //position: "absolute",
                  borderBottomColor: values.nickname ? "#6100FF" : "#CCCCCC",
                  borderBottomWidth: values.nickname ? 2 : 1,
                }}
                placeholder="1~8자 이하 한글, 영문, 숫자, 특수문자"
                autoCapitalize={false}
                value={values.nickname}
                onChangeText={
                  handleChange("nickname")

                  //setUnder("#6100FF")
                }
                onBlur={() => setFieldTouched("nickname")}
                keyboardType="email-address"
              />
              {touched.nickname && errors.nickname && (
                <ErrorTxt>{errors.nickname}</ErrorTxt>
              )}
            </InputWrapper>
          </FormContainer>
          <SubmitBtn
            style={{
              backgroundColor:
                isValid && values.nickname && values.nickname
                  ? "#6100FF"
                  : "white",
              //flex: 1,
              //justifyContent: "flex-end",
            }}
            onPress={() => handleNickname(values)}
            disabled={!isValid}
          >
            <SubmitTxt>완료</SubmitTxt>
          </SubmitBtn>
        </Wrapper>
      )}
    </Formik>
  );
}

const Wrapper = styled.View`
  background-color: white;
  flex: 1;
  align-items: center;
`;
const FormContainer = styled.View`
  padding: 20px;
  width: 100%;
`;
const BackToHome = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  margin: 10px 0px;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
`;
const BackIcon = styled.Image`
  width: 40px;
  height: 40px;
`;
const Title = styled.Text`
  position: absolute;
  left: 5.13%;
  top: 140px;
  font-family: "PretendardVariable";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  color: #202020;
`;

const SubTitle = styled.Text`
  color: #606060;
  font-size: 14px;
  font-weight: 400;
`;

const InputWrapper = styled.View`
  margin-bottom: 15px;
`;

const InputTxt = styled.TextInput`
  padding-bottom: 8px;
`;
const ErrorTxt = styled.Text`
  padding-top: 5px;
  font-size: 10px;
  color: #ff2626;
`;

const SubmitBtn = styled.TouchableOpacity`
  position: absolute;
  width: 350px;
  height: 44px;
  bottom: 52px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;

const SubmitTxt = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

const CheckBtn = styled.TouchableOpacity`
  position: absolute;
  left: 270px;
  background-color: #cccccc;
  width: 81px;
  height: 33px;
  padding: 10px;
  border-radius: 100px;
`;

const CheckTxt = styled.Text`
  text-align: center;
  font-size: 14px;
  font-weight: 400;
`;
