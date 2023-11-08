import {
  Image,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import React from "react";
import { TextPretendard as Text } from "../static/CustomText.js";
import { useState } from "react";
import styled from "styled-components/native";
import { Caption1, Display2 } from "../static/text.js";
import { Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Formik } from "formik";
import * as yup from "yup";

import { Request } from "../api/request.js";
import {
  getItemFromAsync,
  removeItemFromAsync,
  setItemToAsync,
} from "../api/storage.js";
import axios from "axios";

const Stack = createStackNavigator();
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const checked = require("../assets/tch_icnTxtCheck.png");

const signupSchema = yup.object().shape({
  money: yup
    .number("금액을 입력해주세요")
    .required("시급을 입력해주세요")
    .max(500000, "500,000원 미만으로 입력해주세요"),
  //.matches(/\d/, "영문과 숫자를 입력해주세요"),
});

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function ChooseMoney({ navigation }) {
  const [money, setMoney] = useState("");
  const request = new Request();

  const handleJobInfo = async values => {
    const name = await getItemFromAsync("name");
    const categoryId = await getItemFromAsync("categoryId");
    const scheduleList = await getItemFromAsync("scheduleList");
    const accessToken = await getItemFromAsync("accessToken");

    const response = await request.post("/workspaces", {
      name: name,
      wage: Number(values.money),
      scheduleList: scheduleList,
      categoryId: categoryId + 1,
    });
    if (response.status == 200) {
      await setItemToAsync("workspaceId", response.data.workspaceId);
      navigation.navigate("Main");
    }
  };

  return (
    <Formik
      initialValues={{
        money: "",
      }}
      validationSchema={signupSchema}
      onSubmit={values => Alert.alert(JSON.stringify(values))}>
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
        <DismissKeyboard>
          <Container>
            <HeaderWrapper>
              <Image style={{ height: 24, width: 223 }} source={Headerimg} />
            </HeaderWrapper>

            <MainContainer>
              <Display2>시급 입력하기</Display2>
              <View style={{ height: 40 }} />
              <Caption1>시급</Caption1>
            </MainContainer>
            <MoneyInputContainer>
              <MoneyInput
                placeholder="9,620"
                placeholderTextColor="#CCCCCC"
                keyboardType="number-pad"
                value={values.money}
                onChangeText={text => {
                  handleChange("money")(text);
                  setMoney(text); // formik 외부의 email 변수 갱신
                }}
                onBlur={() => setFieldTouched("money")}
                style={{
                  //position: "absolute",
                  borderBottomColor: values.money
                    ? !errors.money
                      ? "#6100FF"
                      : "#FF2626"
                    : "#CCCCCC",
                  borderBottomWidth: values.money ? 2 : 1,
                  fontFamily: "PretendardVariable",
                }}
              />
              {errors.money && <Text style={styles.error}>{errors.money}</Text>}
              {values.money && !errors.money && (
                <EraseAll
                  disabled={!values.money}
                  //onPress={}
                >
                  <Image
                    source={checked}
                    disabled={!values.money}
                    style={{ width: 24, height: 24 }}
                  />
                </EraseAll>
              )}
            </MoneyInputContainer>
            <NextBtnContainer onPress={() => handleJobInfo(values)}>
              <Image
                style={{ height: 40, width: 40 }}
                source={values.money ? NextBtn : NextBtnGray}
              />
            </NextBtnContainer>
            <BackBtnContainer onPress={() => navigation.navigate("ChooseTime")}>
              <Image style={{ height: 40, width: 40 }} source={BackBtn} />
            </BackBtnContainer>
          </Container>
        </DismissKeyboard>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  error: {
    paddingTop: 5,
    fontSize: 10,
    color: "#FF2626",
  },
});

const Container = styled.SafeAreaView`
  display: flex;
  flex: 1;
  background-color: white;
`;

const Headerimg = require("../assets/onBoarding/Header4.png");
const HeaderWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  //margin-top: 5%;
  margin-top: 24px;
  margin-bottom: 30px;
`;

const MainContainer = styled.View`
  margin: 20px;
`;

const MoneyInputContainer = styled.View`
  margin: 18px 20px;
`;

const MoneyInput = styled.TextInput`
  font-size: 16px;
  line-height: 19px;
  padding-bottom: 8px;
`;

const NextBtn = require("../assets/onBoarding/Nextbtn.png");
const NextBtnGray = require("../assets/onBoarding/NextbtnGray.png");

const NextBtnContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  left: ${windowWidth * 0.85}px;
  top: ${windowHeight * 0.9}px;
  width: 40px;
  height: 40px;
`;

const BackBtn = require("../assets/onBoarding/BackbtnGray.png");
const BackBtnContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  left: ${windowWidth * 0.72}px;
  top: ${windowHeight * 0.9}px;
  width: 40px;
  height: 40px;
`;

const EraseAll = styled.TouchableOpacity`
  position: absolute;
  left: 93.72%;
  right: 28.97%;
  //top: 26.55%;
  bottom: 10.6%;
`;
