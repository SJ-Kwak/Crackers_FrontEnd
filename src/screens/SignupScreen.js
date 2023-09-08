//signupscreen.js

import React from "react-native";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";

import axios from "axios";
import { API_URL, signupRequest } from "../api/auth";
import { Request } from "../api/request";
import { setItemToAsync } from "../api/storage";

const Stack = createStackNavigator();
const backIcon = require("../assets/tch_btnBack.png");

const signupSchema = yup.object().shape({
  email: yup.string().matches(/\d/, "영문, 숫자를 모두 포함하여 입력해주세요"),
  password: yup
    .string()
    .matches(/\d/, "영문, 숫자를 모두 포함하여 입력해주세요"),
  pwCheck: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
});

const { width, height } = Dimensions.get("window");

export default function SignupScreen({ navigation }) {
  const [under, setUnder] = useState("#CCCCCC");
  const [check1, setCheck1] = useState("white");
  const [check2, setCheck2] = useState("#6100FF");
  const [check3, setCheck3] = useState("#CCCCCC");
  const [temp, setTemp] = useState("");
  const [submit, setSubmit] = useState(0);
  const [feedback, setFeedback] = useState("../assets/tch_btnTxtX.png");

  const erase = require("../assets/tch_btnTxtX.png");
  const checked = require("../assets/tch_icnTxtCheck.png");

  const [isEmailTaken, setIsEmailTaken] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const request = new Request();

  const handleCheckEmail = async () => {
    try {
      const response = await request.get(`/accounts/check/${email}`, {}, {});
      if (response.status == 200) {
        setIsEmailTaken(false);
      } else {
        setIsEmailTaken(true);
      }
      setCheck2("#CCCCCC");
      setSubmit(1);
    } catch (err) {
      console.error("err", err);
    }
  };

  const setSignupInfo = () => {
    setItemToAsync("id", email);
    setItemToAsync("password", password);
    navigation.navigate("Tos");
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={signupSchema}
      onSubmit={setSignupInfo}
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
          <FormContainer>
            <BackToHome
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image source={backIcon} />
            </BackToHome>
            <View style={{ marginTop: height * 0.1 }} />
            <Title>회원가입</Title>
            <View style={{ marginTop: 50 }} />
            <SubTitle>아이디</SubTitle>
            <View style={{ height: 18 }} />
            <InputWrapper>
              <View style={{ flexDirection: "row" }}>
                <InputTxt
                  style={{
                    //position: "absolute",
                    width: "70%",
                    borderBottomColor: values.email
                      ? !errors.email
                        ? "#6100FF"
                        : "#FF2626"
                      : "#CCCCCC",
                    borderBottomWidth: values.email ? 2 : 1,
                  }}
                  placeholder="아이디"
                  autoCapitalize={false}
                  value={values.email}
                  onChangeText={(text) => {
                    handleChange("email")(text);
                    setEmail(text); // formik 외부의 email 변수 갱신
                  }}
                  onBlur={() => setFieldTouched("email")}
                  keyboardType="email-address"
                />
                {values.email && !errors.email && (
                  <EraseAll
                    disabled={!values.email}
                    //onPress={}
                  >
                    <Image
                      source={checked}
                      disabled={!values.email}
                      style={{ width: 24, height: 24 }}
                    />
                  </EraseAll>
                )}
                <CheckBtn
                  onPress={handleCheckEmail}
                  disabled={errors.email}
                  style={{
                    backgroundColor:
                      !errors.email && values.email
                        ? isSubmitting
                          ? check3
                          : check2
                        : check1,
                    borderWidth: 1,
                    borderColor: values.email
                      ? isValid
                        ? "white"
                        : "#CCCCCC"
                      : "#CCCCCC",
                  }}
                >
                  <CheckTxt
                    style={{
                      color: values.email
                        ? !errors.email
                          ? "white"
                          : "#CCCCCC"
                        : "#CCCCCC",
                    }}
                  >
                    중복확인
                  </CheckTxt>
                </CheckBtn>
              </View>
              {errors.email && <ErrorTxt>{errors.email}</ErrorTxt>}
              {isEmailTaken && <ErrorTxt>사용할 수 없는 아이디입니다</ErrorTxt>}
              {submit == 1 && !isEmailTaken && (
                <NoErrorTxt>사용 가능한 아이디입니다</NoErrorTxt>
              )}
            </InputWrapper>
            <View style={{ height: 30 }} />
            <SubTitle>비밀번호</SubTitle>
            <View style={{ height: 18 }} />
            <InputWrapper>
              <InputTxt
                style={{
                  borderBottomColor: values.password
                    ? !errors.password
                      ? "#6100FF"
                      : "#FF2626"
                    : "#CCCCCC",
                  borderBottomWidth: values.password ? 2 : 1,
                }}
                placeholder="비밀번호"
                autoCapitalize={false}
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                value={values.password}
                onChangeText={(text) => {
                  handleChange("password")(text);
                  setPassword(text); // formik 외부의 password 변수 갱신
                }}
                onBlur={() => setFieldTouched("password")}
              />
              {errors.password && <ErrorTxt>{errors.password}</ErrorTxt>}
              {values.password && !errors.password && (
                <EraseAll2
                  disabled={!values.password}
                  //onPress={}
                >
                  <Image
                    source={checked}
                    disabled={!values.password}
                    style={{ width: 24, height: 24 }}
                  />
                </EraseAll2>
              )}
            </InputWrapper>
            <View style={{ height: 24 }} />
            <SubTitle>비밀번호 확인</SubTitle>
            <View style={{ height: 18 }} />
            <InputWrapper>
              <InputTxt
                style={{
                  borderBottomColor: values.pwCheck
                    ? !errors.pwCheck
                      ? "#6100FF"
                      : "#FF2626"
                    : "#CCCCCC",
                  borderBottomWidth: values.pwCheck ? 2 : 1,
                }}
                placeholder="비밀번호 확인"
                autoCapitalize={false}
                value={values.pwCheck}
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("pwCheck")}
                onBlur={() => setFieldTouched("pwCheck")}
              />
              {errors.pwCheck && <ErrorTxt>{errors.pwCheck}</ErrorTxt>}
              {values.pwCheck && !errors.pwCheck && (
                <EraseAll3
                  disabled={!values.pwCheck}
                  //onPress={}
                >
                  <Image
                    source={checked}
                    disabled={!values.pwCheck}
                    style={{ width: 24, height: 24 }}
                  />
                </EraseAll3>
              )}
            </InputWrapper>
          </FormContainer>
          <SubmitBtn
            style={{
              backgroundColor:
                isValid && values.email && values.password && values.pwCheck
                  ? "#6100FF"
                  : "transparent",
            }}
            onPress={setSignupInfo}
            disabled={!isValid}
          >
            <SubmitTxt>다음</SubmitTxt>
          </SubmitBtn>
        </Wrapper>
      )}
    </Formik>
  );
}

const Wrapper = styled.View`
  background-color: white;
  flex: 1;
  height: 100%;
  align-items: center;
`;
const FormContainer = styled.View`
  padding: 20px;
  width: 100%;
  flex: 1;
`;
const BackToHome = styled.TouchableOpacity`
  position: absolute;
  width: 60px;
  height: 60px;
  margin: 10px 0px;
  align-items: center;
  justify-content: center;
  z-index: 1;
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
  padding-top: 3%;
  font-size: 10px;
  color: #ff2626;
`;

const NoErrorTxt = styled.Text`
  padding-top: 3%;
  font-size: 10px;
  color: #6100ff;
`;

const SubmitBtn = styled.TouchableOpacity`
  width: 350px;
  height: 44px;
  bottom: 52px;
  //padding: 10px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;

const SubmitTxt = styled.Text`
  color: #ffffff;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
`;

const CheckBtn = styled.TouchableOpacity`
  //position: absolute;
  left: 80%;
  background-color: #cccccc;
  width: 81px;
  height: 33px;
  border-radius: 100px;
  justify-content: center;
`;

const CheckTxt = styled.Text`
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

const EraseAll = styled.TouchableOpacity`
  position: absolute;
  left: 64.87%;
  right: 28.97%;
  //top: 26.55%;
  bottom: 10.6%;
`;
const EraseAll2 = styled.TouchableOpacity`
  position: absolute;
  left: 93.72%;
`;
const EraseAll3 = styled.TouchableOpacity`
  position: absolute;
  left: 93.72%;
`;
