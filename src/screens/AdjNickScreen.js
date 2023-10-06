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
            <BackIcon source={backIcon} style={{width: 40, height: 40}} />
          </BackToHome>
          <FormContainer>
            <Text style={styles.title}>닉네임 수정하기</Text>
            <View style={{ height: 60 }} />
            <Text style={styles.subtitle}>닉네임</Text>
            <View style={{ height: 18 }} />
            <InputWrapper>
              <InputTxt
                style={{
                  //position: "absolute",
                  borderBottomColor: values.nickname ? "#6100FF" : "#CCCCCC",
                  borderBottomWidth: values.nickname ? 2 : 1,
                  fontFamily: 'Pretendard'
                }}
                placeholder="1~8자 이하 한글, 영문, 숫자, 특수문자"
                value={values.nickname}
                onChangeText={
                  handleChange("nickname")

                  //setUnder("#6100FF")
                }
                onBlur={() => setFieldTouched("nickname")}
                keyboardType="email-address"
              />
              {touched.nickname && errors.nickname && (
                <Text style={styles.error}>{errors.nickname}</Text>
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
            <Text style={styles.submit}>완료</Text>
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

const Wrapper = styled.SafeAreaView`
  background-color: white;
  flex: 1;
  align-items: center;
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
  margin-bottom: 52px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;