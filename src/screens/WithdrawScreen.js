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
            <BackIcon source={backIcon} style={{width: 40, height: 40}} />
          </BackToHome>
          <FormContainer>
            <Text style={styles.title}>회원 탈퇴하기</Text>
            <View style={{ height: 60 }} />
            <Text style={styles.subtitle}>계정 비밀번호</Text>
            <View style={{ height: 18 }} />
            <InputWrapper>
              <InputTxt
                style={{
                  //position: "absolute",
                  borderBottomColor: values.nickname ? "#6100FF" : "#CCCCCC",
                  borderBottomWidth: values.nickname ? 2 : 1,
                  fontFamily: 'Pretendard'
                }}
                placeholder="비밀번호 입력"
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                secureTextEntry={true}
                textContentType="password"
              />
              {values.password != password && (
                <Text style={styles.error}>비밀번호가 일치하지 않습니다</Text>
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
            <Text style={styles.submit}>회원 탈퇴하기</Text>
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