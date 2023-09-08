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
import {
  getItemFromAsync,
  removeItemFromAsync,
  clearItemsFromAsync,
} from "../api/storage";

import { Request } from "../api/request";

const Stack = createStackNavigator();
const backIcon = require("../assets/tch_btnBack.png");

const signupSchema = yup.object().shape({
  password: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
});

export default function WithdrawScreen({ navigation }) {
  const [under, setUnder] = useState("#CCCCCC");
  var password = "";
  const request = new Request();
  useEffect(() => {
    const getPassword = async () => {
      password = await getItemFromAsync("password");
    };
    getPassword();
  }, []);

  const withdraw = async () => {
    const response = await request.patch("/accounts/withdraw");
    if (response.status === 200) {
      Alert.alert(response.data);
      await clearItemsFromAsync();
      navigation.navigate("Home");
    } else {
      Alert.alert("회원 탈퇴에 실패하였습니다!");
    }
  };

  const withdrawConfirmAlert = async () => {
    Alert.alert(
      "알림",
      "정말로 탈퇴하시겠습니까?",
      [
        {
          text: "예",
          onPress: withdraw,
          style: "destructive",
        },
        {
          text: "아니오",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Formik
      initialValues={{
        password: "",
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
            <Title>회원 탈퇴하기</Title>
            <View style={{ height: 200 }} />
            <SubTitle>계정 비밀번호</SubTitle>
            <View style={{ height: 18 }} />
            <InputWrapper>
              <InputTxt
                style={{
                  //position: "absolute",
                  borderBottomColor: values.nickname ? "#6100FF" : "#CCCCCC",
                  borderBottomWidth: values.nickname ? 2 : 1,
                }}
                placeholder="비밀번호 입력"
                autoCapitalize={"none"}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                secureTextEntry={true}
                textContentType="password"
              />
              {values.password != password && (
                <ErrorTxt>비밀번호가 일치하지 않습니다</ErrorTxt>
              )}
            </InputWrapper>
          </FormContainer>
          <SubmitBtn
            style={{
              backgroundColor:
                values.password && values.password == password
                  ? "#6100FF"
                  : "white",
            }}
            onPress={withdrawConfirmAlert}
            disabled={values.password != password}
          >
            <SubmitTxt>회원 탈퇴하기</SubmitTxt>
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
