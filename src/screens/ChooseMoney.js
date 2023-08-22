import React, { Image, View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import styled from "styled-components/native";
import { Caption1, Display2 } from "/Users/geunhye/crackersDEMO/crackers/src/static/text.js";

import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Formik } from "formik";
import * as yup from "yup";

import { updateAdditionalInfo } from "../api/auth";

const Stack = createStackNavigator();
const checked=require("/Users/geunhye/crackersDEMO/crackers/src/assets/tch_icnTxtCheck.png");


const signupSchema = yup.object().shape({
  money: yup
      .number("금액을 입력해주세요")
      .required("시급을 입력해주세요")
      .max(500000, "500,000원 미만으로 입력해주세요")
      //.matches(/\d/, "영문과 숫자를 입력해주세요"),
});

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function ChooseMoney({ navigation }) {

  //const [data, setData] = useState(); // userdata에 알바 종류를 저장하기 위한 상태 변수

  const [money, setMoney]=useState("");

  const getUserData = async (values) => {
    try {
      const userData = await AsyncStorage.getItem('user');
      //return userData ? JSON.parse(userData) : null;

      //const data=({wage: parseInt(money)});

      //const signupResponse = await updateAdditionalInfo(data);


      if (userData) {
        userData.money = parseInt(money); // 새로운 닉네임 추가
        //userData.money=data;
        await AsyncStorage.setItem('user', JSON.stringify(userData)); // 업데이트된 정보 저장
        console.log("일 종류가 저장되었습니다");
        console.log(JSON.stringify(userData));
        }

    } catch (error) {
      console.log('불러오기 실패:', error);
      return null;
    }
  };

  //const [userdata, setUserData] = useState({ money: ""});

  return (

		<Formik
			initialValues={{
				money: "",
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
      <DismissKeyboard>
    <Container>
      <HeaderWrapper>
        <Image 
        style={{height: 24, width: 223}}
        source={Headerimg} />
      </HeaderWrapper>

      <MainContainer>
        <Display2>시급 입력하기</Display2>
        <View style={{height: 40}}/>
        <Caption1>시급</Caption1>
      </MainContainer>
      <MoneyInputContainer>
        <MoneyInput
          placeholder="9,620"
          placeholderTextColor="#CCCCCC"
          keyboardType="number-pad"
          value={values.money}
          onChangeText={(text) => {
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
        }}
        />
        {errors.money && (
            <ErrorTxt>{errors.money}</ErrorTxt>
        )}
        { values.money && !errors.money && <EraseAll
            disabled={!values.money}
            //onPress={}
            >
            <Image 
            source={checked}
            disabled={!values.money}
            style={{width: 24, height: 24}}/>
        </EraseAll>}
      </MoneyInputContainer>
      <NextBtnContainer onPress={() => {
        navigation.navigate("Main");
        getUserData()
        }}>
        <Image 
        style={{height: 40, width: 40}}
        source={values.money ? NextBtn : NextBtnGray} />
      </NextBtnContainer>
      <BackBtnContainer onPress={() => navigation.navigate("ChooseTime")}>
        <Image 
        style={{height: 40, width: 40}}
        source={BackBtn} />
      </BackBtnContainer>
      
    </Container>
    </DismissKeyboard>  
    )}
  </Formik>
  );
}

const Container = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  //padding-left: 20px;
  //padding-right: 20px;
`;

const Headerimg = require("/Users/geunhye/crackersDEMO/crackers/src/assets/onBoarding/Header4.png");
const HeaderWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  //margin-top: 5%;
  margin-top: 24px;
  margin-bottom: 48px;
`;

const MainContainer = styled.View`
  margin: 20px;
`;

const MoneyInputContainer = styled.View`
  margin: 18px 20px;
`;

const MoneyInput = styled.TextInput`
  font-size: 16;
  line-height: 19;
  /*border-bottom: 5px;
  :focus {
    border-left-width: 0;
    border-right-width: 0;
    border-top-width: 0;
    border-bottom-width: 2px;
  }*/
  //border-bottom-width: 2px;
  padding-Bottom: 8px;

`;

const NextBtn = require("/Users/geunhye/crackersDEMO/crackers/src/assets/onBoarding/Nextbtn.png");
const NextBtnGray = require("/Users/geunhye/crackersDEMO/crackers/src/assets/onBoarding/NextbtnGray.png");

const NextBtnContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  left: 85%;
  top: 752px;
  width: 40px;
  height: 40px;
`;

const BackBtn = require("/Users/geunhye/crackersDEMO/crackers/src/assets/onBoarding/BackbtnGray.png");
const BackBtnContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  left: 72%;
  top: 752px;
  width: 40px;
  height: 40px;
`;

const ErrorTxt= styled.Text`
    position: absolute;
    padding-top: 35px;
    font-Size: 10;
    color: #FF2626;
    //right: "5.13%",
`

const EraseAll = styled.TouchableOpacity`
    position: absolute;
    left: 93.72%;
    right: 28.97%;
    //top: 26.55%;
    bottom: 10.6%;
`