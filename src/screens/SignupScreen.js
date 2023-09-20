//signupscreen.js

import React from "react";
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
  email: yup
    .string()
    .matches(/\d/, "영문, 숫자를 모두 포함하여 입력해주세요"),
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

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const request = new Request();

  const handleCheckEmail = async (email) => {
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

  const setSignupInfo = (values) => {
    setItemToAsync("id", values.email);
    setItemToAsync("password", values.password);
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
            <Text style={styles.title}>회원가입</Text>
            <View style={{ marginTop: 50 }} />
            <Text style={styles.subtitle}>아이디</Text>
            <View style={{ height: 18 }} />
            <InputWrapper>
              <View style={{ flexDirection: "row" }}>
                <InputTxt
                  style={{
                    flex: 1,
                    borderBottomColor: values.email
                      ? !errors.email
                        ? "#6100FF"
                        : "#FF2626"
                      : "#CCCCCC",
                    borderBottomWidth: values.email ? 2 : 1,
                    fontFamily: 'Pretendard',
                    marginRight: 10
                  }}
                  placeholder="아이디"
                  value={values.email}
                  // onChangeText={(text) => {
                  //   handleChange("email")(text);
                  //   setEmail(text); // formik 외부의 email 변수 갱신
                  // }}
                  onChangeText={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={false}
                  textContentType="none"
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
                  onPress={() => handleCheckEmail(values.email)}
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
                  <Text
                    style={[styles.check, {
                      color: values.email
                        ? !errors.email
                          ? "white"
                          : "#CCCCCC"
                        : "#CCCCCC",
                    }]}
                  >
                    중복확인
                  </Text>
                </CheckBtn>
              </View>
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}
              {isEmailTaken && <Text style={styles.error}>사용할 수 없는 아이디입니다</Text>}
              {submit == 1 && !isEmailTaken && (
                <Text style={styles.noError}>사용 가능한 아이디입니다</Text>
              )}
            </InputWrapper>
            <View style={{ height: 30 }} />
            <Text style={styles.subtitle}>비밀번호</Text>
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
                  fontFamily: 'Pretendard'
                }}
                placeholder="비밀번호"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                value={values.password}
                // onChangeText={(text) => {
                //   handleChange("password")(text);
                //   setPassword(text); // formik 외부의 password 변수 갱신
                // }}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
              />
              {errors.password && <Text style={styles.error}>{errors.password}</Text>}
              {values.password && !errors.password && (
                <EraseAll2
                  disabled={!values.password}
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
            <Text style={styles.subtitle}>비밀번호 확인</Text>
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
                  fontFamily: 'Pretendard'
                }}
                placeholder="비밀번호 확인"
                value={values.pwCheck}
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("pwCheck")}
                onBlur={() => setFieldTouched("pwCheck")}
              />
              {errors.pwCheck && <Text style={styles.error}>{errors.pwCheck}</Text>}
              {values.pwCheck && !errors.pwCheck && (
                <EraseAll3
                  disabled={!values.pwCheck}
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
            onPress={() => setSignupInfo(values)}
            disabled={!isValid}
          >
            <Text style={styles.submit}>다음</Text>
          </SubmitBtn>
        </Wrapper>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#202020',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 29,
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
    paddingTop: '3%',
    fontSize: 10,
    color: '#FF2626'
  },
  noError: {
    paddingTop: '3%',
    fontSize: 10,
    color: '#6100FF'
  },
  check: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20
  }
})

const Wrapper = styled.SafeAreaView`
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

const InputWrapper = styled.View`
  margin-bottom: 15px;
`;

const InputTxt = styled.TextInput`
  padding-bottom: 8px;
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

const CheckBtn = styled.TouchableOpacity`
  //position: absolute;
  // left: 80%;
  background-color: #cccccc;
  width: 81px;
  height: 33px;
  border-radius: 100px;
  justify-content: center;
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
