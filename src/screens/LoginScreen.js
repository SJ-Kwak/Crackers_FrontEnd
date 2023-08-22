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
  import AsyncStorage from '@react-native-async-storage/async-storage';

  import { AuthContext } from "../../AuthContext";
  import { loginRequest } from "../api/auth";

  const Stack = createStackNavigator();
  const backIcon = require("/Users/geunhye/crackersDEMO/crackers/src/assets/tch_btnBack.png");
  

  /*const signupSchema = yup.object().shape({
      email: yup
          .string()
          .required("아이디를 입력해 주세요"),
          //.matches(/\d/, "영문과 숫자를 입력해주세요"),
      password: yup
          .string()
          .required("암호를 입력해 주세요"),
          //.min(8, "너무 짧습니다"),
  });*/

  const loginSchema = yup.object().shape({
    email: yup.string().required("아이디를 입력해 주세요"),
    password: yup.string().required("암호를 입력해 주세요"),
  });


  export default function LoginScreen({navigation}){
    const [under, setUnder] = useState("#CCCCCC");
    //const keyboardHeight = useKeyboardHeight();

    const {login}=useContext(AuthContext);
    const [error, setError]=useState('');

    /*useEffect(() => {
      }, []);
    
      const handleLogin = async (values) => {

        try {
            const storedUser = await AsyncStorage.getItem('user');
            const user = JSON.parse(storedUser);
        
            if (user && user.email === values.email && user.password === values.password) {
              // 이메일과 비밀번호가 일치하는 경우, 로그인 성공
              navigation.navigate('Main');
            } else {
              // 이메일과 비밀번호가 일치하지 않는 경우, 에러 처리
              Alert.alert('Invalid credentials', 'Please enter a valid email and password.');
            }
          } catch (error) {
            console.log('Error retrieving data: ', error);
          }
      };*/

    useEffect(() => {
    }, []);
  
    const handleLogin = async (values) => {
        try {
          const response = await loginRequest(values.email, values.password);
          // 로그인 성공 시 처리
          if (response) {
            // 로그인 상태로 변경
            login(response.user);
            setError('');

            navigation.navigate("Main")
          }
        } catch (error) {
          console.error('Error logging in:', error);
          setError('Invalid username or password');
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
                    <FormContainer>
                        <BackToHome>
                            <BackIcon
                                source={backIcon}/>
                        </BackToHome>     
                        <View style={{height: 120}}/>
                        <Title>로그인</Title>
                        <View style={{height: 40}}/>
                        <SubTitle>아이디</SubTitle>
                        <View style={{height: 18}}/>
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

                                    //setUnder("#6100FF")
                                }
                                onBlur={() => setFieldTouched("email")}
                                keyboardType="email-address"/>
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
                                onBlur={() => setFieldTouched("password")}/>
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
                            //onPress={handleSubmit&&navigation.navigate("Main")}
                            //onPress={()=>{navigation.navigate("Main")}}
                            onPress={handleSubmit}
                            disabled={!isValid}>
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
    //paddingTop: 100,
    align-items: center;
    //paddingHorizontal: 15,
`
const FormContainer = styled.View`
    padding: 20px;
    width: 100%;
`
const BackToHome =  styled.TouchableOpacity`
    width: 40;
    height: 40;
`
const BackIcon = styled.Image`
    position: absolute;
    width: 40;
    height: 40;
    //left: 10,
    top: 50;
`
const Title = styled.Text`
    position: absolute;
    left: 5.13%;
    right: 78.72%;
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
