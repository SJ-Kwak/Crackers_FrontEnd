import React from "react";
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
  ScrollView
} from "react-native";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { Request } from "../api/request";
import {
  getItemFromAsync,
  removeItemFromAsync,
  setItemToAsync,
} from "../api/storage";

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
        <Wrapper contentContainerStyle={{alignItems: 'center'}}>
          <BackToHome onPress={() => navigation.goBack()}>
            <BackIcon source={backIcon} style={{width: 40, height: 40}} />
          </BackToHome>
          <FormContainer>
          <Text style={styles.title}>닉네임 짓기</Text>
            <View style={{ marginTop: 50 }} />
            <Text style={styles.subtitle}>닉네임</Text>
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
                  fontFamily: 'Pretendard'
                }}
                placeholder="1~8자 이하 한글, 영문, 숫자, 특수문자"
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
                isValid && values.nickname
                  ? "#6100FF"
                  : "transparent",
              //flex: 1,
              //justifyContent: "flex-end",
            }}
            onPress={handleSignUp}
            disabled={!isValid || !values.nickname}
          >
            <Text style={styles.submit}>크래커 시작하기</Text>
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
    fontSize: 14,
    fontWeight: '400'
  },
  submit: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: '600'
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
  font-size: 10px;
  color: #ff2626;
  //right: "5.13%",
`;

const SubmitBtn = styled.TouchableOpacity`
  width: 350px;
  height: 44px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 52px;
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

const EraseAll = styled.TouchableOpacity`
  position: absolute;
  left: 93.72%;
  right: 28.97%;
  //top: 26.55%;
  bottom: 10.6%;
`;
