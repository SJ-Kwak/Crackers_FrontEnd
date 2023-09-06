//loginscreen.js

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
import { useState, useEffect, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";
//import useKeyboardHeight from "react-native-use-keyboard-height";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContext } from "../../AuthContext";
import { loginRequest } from "../api/auth";
import { Request } from "../api/request";
import { setItemToAsync } from "../api/storage";

const Stack = createStackNavigator();
const backIcon = require("../assets/tch_btnBack.png");

const loginSchema = yup.object().shape({
  email: yup.string().required("아이디를 입력해 주세요"),
  password: yup.string().required("암호를 입력해 주세요"),
});

export default function LoginScreen({ navigation }) {
  const [under, setUnder] = useState("#CCCCCC");

  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const request = new Request();

  const handleLogin = async (values) => {
    const response = await request.post('/accounts/signin', {
      loginId: values.email,
      password: values.password,
    })
    console.error(response)
    if (response.status === 200) {
      setItemToAsync('accessToken', response.data.accessToken)
      setItemToAsync('refreshToken', response.data.refreshToken)
      setItemToAsync('password', values.password)
      navigation.replace('Main')
    } else {
      Alert.alert('로그인에 실패하셨습니다.')
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={loginSchema}
      onSubmit={handleLogin}
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
            <View style={{ height: 40 }} />
            <Title>로그인</Title>
            <View style={{ height: 40 }} />
            <SubTitle>아이디</SubTitle>
            <View style={{ height: 18 }} />
            <InputWrapper>
              <InputTxt
                style={{
                  //position: "absolute",
                  borderBottomColor: values.email ? "#6100FF" : "#CCCCCC",
                  borderBottomWidth: values.email ? 2 : 1,
                }}
                placeholder="아이디"
                autoCapitalize={false}
                value={values.email}
                onChangeText={
                  handleChange("email")
                }
                onBlur={() => setFieldTouched("email")}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <ErrorTxt>{errors.email}</ErrorTxt>
              )}
            </InputWrapper>
            <View style={{ height: 30 }} />
            <SubTitle>비밀번호</SubTitle>
            <View style={{ height: 18 }} />
            <InputWrapper>
              <InputTxt
                style={{
                  borderBottomColor: values.password ? "#6100FF" : "#CCCCCC",
                  borderBottomWidth: values.password ? 2 : 1,
                }}
                placeholder="비밀번호"
                autoCapitalize={false}
                value={values.password}
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
              />
              {touched.password && errors.password && (
                <ErrorTxt>{errors.password}</ErrorTxt>
              )}
            </InputWrapper>
          </FormContainer>
          <SubmitBtn
            style={{
              backgroundColor:
                isValid && values.email && values.password
                  ? "#6100FF"
                  : "white",
              //flex: 1,
              //justifyContent: "flex-end",
            }}
            onPress={() => handleSubmit(values)}
            disabled={!isValid}
          >
            <SubmitTxt>로그인하기</SubmitTxt>
          </SubmitBtn>
        </Wrapper>
      )}
    </Formik>
  );
}

const Wrapper = styled.View`
  background: white;
  flex: 1;
  align-items: center;
`;
const FormContainer = styled.View`
  padding: 20px;
  width: 100%;
  flex: 1;
`;
const BackToHome = styled.TouchableOpacity`
  width: 60;
  height: 60;
  margin: 10px 0px;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
`;
const BackIcon = styled.Image`
  width: 40;
  height: 40;
`;
const Title = styled.Text`
  color: #202020;
  font-family: "Pretendard";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: #202020;
`;

const SubTitle = styled.Text`
  //position: absolute;
  color: #606060;
  font-size: 14;
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
  font-size: 10;
  color: #ff2626;
  //right: "5.13%",
`;

const SubmitBtn = styled.TouchableOpacity`
  width: 350;
  height: 44;
  border-radius: 100;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
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
