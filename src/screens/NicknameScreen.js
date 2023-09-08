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
import AsyncStorage from "@react-native-async-storage/async-storage";

import { updateAdditionalInfo } from "../api/auth";
import axios from "axios";
import { Request } from "../api/request";
import {
  getItemFromAsync,
  removeItemFromAsync,
  setItemToAsync,
} from "../api/storage";

//import useKeyboardHeight from "react-native-use-keyboard-height";

const Stack = createStackNavigator();
const backIcon = require("../assets/tch_btnBack.png");
const checked = require("../assets/tch_icnTxtCheck.png");

const signupSchema = yup.object().shape({
  nickname: yup
    .string()
    .required("닉네임을 입력해 주세요")
    .max(8, "8자 이내로 닉네임을 입력해주세요"),
  //.matches(/\d/, "영문과 숫자를 입력해주세요"),
});

export default function NicknameScreen({ navigation, route }) {
  const [under, setUnder] = useState("#CCCCCC");
  const [nickname, setNickname] = useState("");
  const request = new Request();

  const handleSignUp = async () => {
    const id = await getItemFromAsync("id");
    const password = await getItemFromAsync("password");
    console.log(id, password);
    const response = await request.post("/accounts/signup", {
      loginId: id,
      password: password,
      nickname: nickname,
    });
    console.error(response);
    await removeItemFromAsync("id");
    // await removeItemFromAsync('password')
    if (response.status !== "CONFLICT") {
      await setItemToAsync("accessToken", response.data.accessToken);
      await setItemToAsync("refreshToken", response.data.refreshToken);
      navigation.navigate("JobNickname");
    } else {
      Alert.alert("회원 가입에 실패하였습니다");
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
            <Title>닉네임 짓기</Title>
            <View style={{ marginTop: 50 }} />
            <SubTitle>닉네임</SubTitle>
            <View style={{ marginTop: 10 }} />
            <InputWrapper>
              <InputTxt
                style={{
                  //position: "absolute",
                  borderBottomColor: values.nickname
                    ? !errors.nickname
                      ? "#6100FF"
                      : "#FF2626"
                    : "#CCCCCC",
                  borderBottomWidth: values.nickname ? 2 : 1,
                }}
                placeholder="1~8자 이하 한글, 영문, 숫자, 특수문자"
                autoCapitalize={false}
                value={values.nickname}
                onChangeText={(text) => {
                  handleChange("nickname")(text);
                  setNickname(text); // formik 외부의 email 변수 갱신
                }}
                onBlur={() => setFieldTouched("nickname")}
                keyboardType="email-address"
              />
              {errors.nickname && <ErrorTxt>{errors.nickname}</ErrorTxt>}
              {values.nickname && !errors.nickname && (
                <EraseAll
                  disabled={!values.nickname}
                  //onPress={}
                >
                  <Image
                    source={checked}
                    disabled={!values.nickname}
                    style={{ width: 24, height: 24 }}
                  />
                </EraseAll>
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
            onPress={handleSignUp}
            disabled={!isValid}
          >
            <SubmitTxt>크래커 시작하기</SubmitTxt>
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
  z-index: 1;
`;
const BackIcon = styled.Image`
  width: 40px;
  height: 40px;
`;
const Title = styled.Text`
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
  //position: absolute;
  color: #606060;
  font-size: 14px;
  font-weight: 400;
`;

const InputWrapper = styled.View`
  margin-bottom: 15px;
`;

const InputTxt = styled.TextInput`
  padding-bottom: 8px;
  /*
    borderBottomColor: values.email ? "#6100FF" : "#CCCCCC",
    borderBottomWidth: values.email ? 2 : 1,
    border-bottom-color: values.password
        ? #6100FF
        : #CCCCCC;
    border-bottom-width: values.password ? 2 : 1;*/
`;
const ErrorTxt = styled.Text`
  padding-top: 5px;
  font-size: 10;
  color: #ff2626;
  //right: "5.13%",
`;

const SubmitBtn = styled.TouchableOpacity`
  position: absolute;
  //top: keyboardHeight;
  //background-color: #395B64;
  width: 350;
  height: 44;
  bottom: 52;
  //padding: 10px;
  border-radius: 100;
  justify-content: center;
  align-items: center;
`;

const SubmitTxt = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 16;
  font-weight: 600;
`;

const CheckBtn = styled.TouchableOpacity`
  position: absolute;
  left: 270;
  background-color: #cccccc;
  width: 81;
  height: 33;
  padding: 10px;
  border-radius: 100;
`;

const CheckTxt = styled.Text`
  text-align: center;
  font-size: 14;
  font-weight: 400;
`;

const EraseAll = styled.TouchableOpacity`
  position: absolute;
  left: 93.72%;
  right: 28.97%;
  //top: 26.55%;
  bottom: 10.6%;
`;
