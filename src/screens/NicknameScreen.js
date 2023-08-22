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
  import AsyncStorage from '@react-native-async-storage/async-storage';

  import { updateAdditionalInfo } from "../api/auth";

  //import useKeyboardHeight from "react-native-use-keyboard-height";

  const Stack = createStackNavigator();
  const backIcon = require("/Users/geunhye/crackersDEMO/crackers/src/assets/tch_btnBack.png");
  const checked=require("/Users/geunhye/crackersDEMO/crackers/src/assets/tch_icnTxtCheck.png");


  const signupSchema = yup.object().shape({
      nickname: yup
          .string()
          .required("닉네임을 입력해 주세요")
          .max(8, "8자 이내로 닉네임을 입력해주세요")
          //.matches(/\d/, "영문과 숫자를 입력해주세요"),
  });


  export default function NicknameScreen({navigation}){
    const [under, setUnder] = useState("#CCCCCC");
    //const keyboardHeight = useKeyboardHeight();
    const [nickname, setNickname]=useState("");

    const getUserData = async () => {
        try {
          const userData = await AsyncStorage.getItem('user');
          //return userData ? JSON.parse(userData) : null;
        
            if (userData) {
            userData.nickname = nickname; // 새로운 닉네임 추가
            await AsyncStorage.setItem('user', JSON.stringify(userData)); // 업데이트된 정보 저장
            }

            if(userData.nickname)
            {
                console.log("닉네임이 저장되었습니다");
            }
            
        } catch (error) {
          console.log('불러오기 실패:', error);
          return null;
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
                    <BackToHome>
                        <BackIcon
                            source={backIcon}/>
                    </BackToHome> 
                    <FormContainer>    
                        <Title>닉네임 짓기</Title>
                        <View style={{height: 200}}/>
                        <SubTitle>닉네임</SubTitle>
                        <View style={{height: 18}}/>
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
                                }}
                                placeholder="1~8자 이하 한글, 영문, 숫자, 특수문자"
                                autoCapitalize={false}
                                value={values.nickname}
                                onChangeText={(text) => {
                                    handleChange("nickname")(text);
                                    setNickname(text); // formik 외부의 email 변수 갱신
                                  }}
                                onBlur={() => setFieldTouched("nickname")}
                                keyboardType="email-address"/>
                            {errors.nickname && (
                                <ErrorTxt>{errors.nickname}</ErrorTxt>
                            )}
                            { values.nickname && !errors.nickname && <EraseAll
                                disabled={!values.nickname}
                                //onPress={}
                                >
                                <Image 
                                source={checked}
                                disabled={!values.nickname}
                                style={{width: 24, height: 24}}/>
                            </EraseAll>}
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
                            //onPress={handleSubmit&&navigation.navigate('Main')}
                            onPress={()=>{
                                //navigation.navigate('JobNickname')
                                //updateAdditionalInfo(values.nickname);
                                getUserData();
                                navigation.navigate('JobNickname')
                            }}
                            disabled={!isValid}>
                            <SubmitTxt>크래커 시작하기</SubmitTxt>
                        </SubmitBtn>
                </Wrapper>
            )}
        </Formik>
    );
  }

const Wrapper = styled.View`
    background: white;
    flex: 1;
    //paddingTop: 100,
    align-items: center;
    //paddingHorizontal: 15,
`
const FormContainer = styled.View`
    padding: 20px;
    width: 100%;
`
const BackToHome =  styled.TouchableOpacity`
    position: absolute;
    width: 20;
    height: 40;
    left: 10;
`
const BackIcon = styled.Image`
    position: absolute;
    width: 20;
    height: 40;
    left: 10;
    top: 50;
`
const Title = styled.Text`
    position: absolute;
    left: 5.13%;
    //right: 78.72%;
    top: 140;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    display: flex;
    align-items: center;
    color: #202020;
`

const SubTitle = styled.Text`
    //position: absolute;
    color: #606060;
    font-Size: 14;
    font-Weight: 400;
`

const InputWrapper = styled.View`
	margin-Bottom: 15px;
`

const InputTxt = styled.TextInput`
    padding-bottom: 8px;
    /*
    borderBottomColor: values.email ? "#6100FF" : "#CCCCCC",
    borderBottomWidth: values.email ? 2 : 1,
    border-bottom-color: values.password
        ? #6100FF
        : #CCCCCC;
    border-bottom-width: values.password ? 2 : 1;*/
`
const ErrorTxt= styled.Text`
    padding-top: 5px;
    font-Size: 10;
    color: #FF2626;
    //right: "5.13%",
`

const SubmitBtn = styled.TouchableOpacity`
    position: absolute;
    //top: keyboardHeight;
    //background-color: #395B64;
    width: 350;
    height: 44;
    bottom: 52;
    //padding: 10px;
    border-radius: 100;
    justify-content: center;
    align-items: center;
`

const SubmitTxt =styled.Text`
    color: #fff;
    text-Align: center;
    font-Size: 16;
    font-Weight: 600;
`

const CheckBtn = styled.TouchableOpacity`
    position: absolute;
    left: 270;
    background-Color: #CCCCCC;
    width: 81;
    height: 33;
    padding: 10px;
    border-Radius: 100;
`

const CheckTxt = styled.Text`
    text-Align: center;
    font-Size: 14;
    font-Weight: 400;
`

const EraseAll = styled.TouchableOpacity`
    position: absolute;
    left: 93.72%;
    right: 28.97%;
    //top: 26.55%;
    bottom: 10.6%;
`