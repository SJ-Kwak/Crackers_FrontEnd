//loginscreen.js

import React from "react";
import styled from "styled-components/native";
import { TextPretendard as Text } from "../static/CustomText";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Button,
  Keyboard,
  SafeAreaView,
  Pressable,
  ScrollView
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const [error, setError] = useState("");
  const request = new Request();

  const handleLogin = async (values) => {
    const response = await request.post("/accounts/signin", {
      loginId: values.email,
      password: values.password,
    });
    if (response.status === 200) {
      setItemToAsync("accessToken", response.data.accessToken);
      setItemToAsync("refreshToken", response.data.refreshToken);
      setItemToAsync("password", values.password);
      navigation.replace("Main");
    } else {
      Alert.alert("로그인에 실패하셨습니다.");
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
        <Wrapper contentContainerStyle={{alignItems: 'center'}}>
          <BackToHome onPress={() => navigation.goBack()}>
            <BackIcon source={backIcon} style={{width: 40, height: 40}} />
          </BackToHome>
          <FormContainer>
            <View style={{ height: 40 }} />
            <Text style={styles.title}>로그인</Text>
            <View style={{ height: 40 }} />
            <Text style={styles.subtitle}>아이디</Text>
            <View style={{ height: 18 }} />
            <InputWrapper>
              <InputTxt
                style={{
                  //position: "absolute",
                  borderBottomColor: values.email ? "#6100FF" : "#CCCCCC",
                  borderBottomWidth: values.email ? 2 : 1,
                  fontFamily: 'Pretendard'
                }}
                placeholder="아이디"
                autoCapitalize="none"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}
            </InputWrapper>
            <View style={{ height: 30 }} />
            <Text style={styles.subtitle}>비밀번호</Text>
            <View style={{ height: 18 }} />
            <InputWrapper>
              <InputTxt
                style={{
                  borderBottomColor: values.password ? "#6100FF" : "#CCCCCC",
                  borderBottomWidth: values.password ? 2 : 1,
                  fontFamily: 'Pretendard'
                }}
                placeholder="비밀번호"
                autoCapitalize="none"
                value={values.password}
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}
            </InputWrapper>
          </FormContainer>
          <SubmitBtn
            style={{
              backgroundColor:
                isValid && values.email && values.password
                  ? "#6100FF"
                  : "transparent",
            }}
            onPress={() => handleSubmit(values)}
            disabled={!isValid}
          >
            <Text style={styles.submit}>로그인하기</Text>
          </SubmitBtn>
        </Wrapper>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#202020',
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    color: '#606060',
    fontSize: 14
  },
  submit: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: '600'
  },
  error: {
    paddingTop: 5,
    fontSize: 10,
    color: '#FF2626'
  },
})

const Wrapper = styled.View`
  background-color: white;
  flex: 1;
  // align-items: center;
`;
const FormContainer = styled.View`
  padding: 20px;
  width: 100%;
  flex: 1;
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

const InputWrapper = styled.View`
  margin-bottom: 15px;
`;

const InputTxt = styled.TextInput`
  padding-bottom: 8px;
`;

const SubmitBtn = styled.TouchableOpacity`
  width: 350px;
  height: 44px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  margin-bottom: 52px;
  align-self: center;
`;
