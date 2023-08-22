//signupscreen.js

import React from "react-native";
import styled from "styled-components/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  //import useKeyboardHeight from "react-native-use-keyboard-height";

  import axios from "axios";
  import { API_URL, signupRequest } from "../api/auth";

  const Stack = createStackNavigator();
  const backIcon = require("/Users/geunhye/crackersDEMO/crackers/src/assets/tch_btnBack.png");
  //const [emailCheck, setEmailCheck]=useState("영문, 숫자를 모두 포함하여 입력해주세요")

  const signupSchema = yup.object().shape({
	email: yup.string().matches(/\d/, "영문, 숫자를 모두 포함하여 입력해주세요"),
	password: yup
		.string()
		.matches(/\d/, "영문, 숫자를 모두 포함하여 입력해주세요"),
	pwCheck: yup
		.string()
		.oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
});

/*const signUp = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // 회원가입 성공
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // 회원가입 실패
        console.log(error);
      });
  };
  
  // 로그인
  const signIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // 로그인 성공
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // 로그인 실패
        console.log(error);
      });
  };*/


  export default function SignupScreen({navigation}){
    const [under, setUnder] = useState("#CCCCCC");
    //const keyboardHeight = useKeyboardHeight();
    const [check1, setCheck1] = useState("white");
	const [check2, setCheck2] = useState("#6100FF");
	const [check3, setCheck3] = useState("#CCCCCC");
	const [temp, setTemp] = useState("");
    const [submit, setSubmit] = useState(0);
    const [feedback, setFeedback]=useState("/Users/geunhye/crackersDEMO/crackers/src/assets/tch_btnTxtX.png");
    
    const erase=require("/Users/geunhye/crackersDEMO/crackers/src/assets/tch_btnTxtX.png");
    const checked=require("/Users/geunhye/crackersDEMO/crackers/src/assets/tch_icnTxtCheck.png");

    const [isEmailTaken, setIsEmailTaken] = useState(false);

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const nickname="살라살라";

    /*const handleSignup = async (values) => {
        // 이메일과 비밀번호를 AsyncStorage에 저장
        if(values.email&&values.password&&values.pwCheck){
        try {
            const user = {
              email: values.email,
              password: values.password
            };
        
            await AsyncStorage.setItem('user', JSON.stringify(user));
            
            // 회원가입 성공 시 다음 화면으로 이동
            //navigation.navigate('Tos');
          } catch (error) {
            console.log('Error saving data: ', error);
          }
        }
      };*/

      const handleCheckEmail = async () => {
        try {
            const response = await signupRequest.checkEmail(email);

          if (response.isEmailTaken) {
            setIsEmailTaken(true);
          } else {
            setIsEmailTaken(false);
          }
        } catch (error) {
          console.error('Error checking email:', error);
        }
      };

      const handleSignup = async () => {
        try {

            //console.log("dmkdmkdmkdmkdㅡ아아가아각!")
            
            console.log(email, password);

            const signupResponse = await signupRequest(email, password, nickname);

            const user = {
                email: email,
                password: password,
                nickname: "",
                job: "",
                money: ""
              };
          
              await AsyncStorage.setItem('user', JSON.stringify(user));
 
            console.log('Signup success:', signupResponse);
          // 회원가입 성공 후 처리 로직 추가

          navigation.navigate("Tos")
      
          // 예시: 회원가입 후 자동 로그인 처리
          //const { token, user } = signupResponse;
      
          // 토큰과 사용자 정보를 로컬 저장소에 저장
          //await AsyncStorage.setItem('token', token);
          //await AsyncStorage.setItem('user', JSON.stringify(user));
      
          // 로그인 상태로 변경
          //login(user);
        } catch (error) {
          console.error('Error signing up:', error);
          // 회원가입 실패 처리 로직 추가
        }
      };
      


	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
			}}
			validationSchema={signupSchema}
			onSubmit={()=>handleSignup}
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
                            onPress={()=>{navigation.goBack()}}>
                            <Image
                                source={backIcon}/>
                        </BackToHome>     
                        <View style={{height: 120}}/>
                        <Title>회원가입</Title>
                        <View style={{height: 40}}/>
                        <SubTitle>아이디</SubTitle>
                        <View style={{height: 18}}/>
                        <InputWrapper>
                        <View style={{flexDirection: "row"}}>
                            <InputTxt
                                style={{
                                    //position: "absolute",
                                    width: 270,
                                    borderBottomColor: values.email
                                        ? !errors.email
                                            ? "#6100FF"
                                            : "#FF2626"
                                        : "#CCCCCC",
                                    borderBottomWidth: values.email ? 2 : 1,                                   
                                }}
                                placeholder="아이디"
                                autoCapitalize={false}
                                value={values.email}
                                onChangeText={(text) => {
                                    handleChange("email")(text);
                                    setEmail(text); // formik 외부의 email 변수 갱신
                                  }}
                                onBlur={() => setFieldTouched("email")}
                                keyboardType="email-address"/>
                            { values.email && !errors.email && <EraseAll
                                disabled={!values.email}
                                //onPress={}
                                >
                                <Image 
                                source={checked}
                                disabled={!values.email}
                                style={{width: 24, height: 24}}/>
                            </EraseAll>}
                            <CheckBtn
                                onPress={()=>{
                                    //Alert.alert("사용 가능한 아이디입니다");
                                    handleCheckEmail
                                    setTemp(values.email);
                                    console.log(temp);
                                    setCheck2("#CCCCCC");
                                    setSubmit(1);
                                }}
                                disabled={errors.email}
                                style={{												backgroundColor:
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
                                paddingBottom: 10,}}>
                                <CheckTxt
                                    style={{
                                        color: values.email
                                        ? !errors.email
                                            ? "white"
                                            : "#CCCCCC"
                                        : "#CCCCCC",
                                    }}>
                                        중복확인
                                </CheckTxt>
                            </CheckBtn>
                        </View>
                        {isEmailTaken && (
								<ErrorTxt>사용할 수 없는 아이디입니다</ErrorTxt>
							)}
                        {submit==1 && !isEmailTaken && (
								<NoErrorTxt>사용 가능한 아이디입니다</NoErrorTxt>
							)}
                        </InputWrapper>
                        <View style={{ height: 40 }} />
                        <SubTitle>비밀번호</SubTitle>
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
                                }}
                                placeholder="비밀번호"
                                autoCapitalize={false}
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType="password"
                                value={values.password}
                                onChangeText={(text) => {
                                  handleChange("password")(text);
                                  setPassword(text); // formik 외부의 password 변수 갱신
                                }}
                                onBlur={() => setFieldTouched("password")}/>
                            {errors.password && (
                                <ErrorTxt>{errors.password}</ErrorTxt>
                            )}
                            { values.password && !errors.password && <EraseAll2
                                disabled={!values.password}
                                //onPress={}
                                >
                                <Image 
                                source={checked}
                                disabled={!values.password}
                                style={{width: 24, height: 24}}/>
                            </EraseAll2>}
                        </InputWrapper>
                        <View style={{ height: 24 }} />
                        <SubTitle>비밀번호 확인</SubTitle>
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
                                }}
                                placeholder="비밀번호 확인"
                                autoCapitalize={false}
                                value={values.pwCheck}
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType="password"
                                onChangeText={handleChange("pwCheck")}
                                onBlur={() => setFieldTouched("pwCheck")}/>
                            {errors.pwCheck && (
                                <ErrorTxt>{errors.pwCheck}</ErrorTxt>
                            )}
                            { values.pwCheck && !errors.pwCheck && <EraseAll3
                                disabled={!values.pwCheck}
                                //onPress={}
                                >
                                <Image 
                                source={checked}
                                disabled={!values.pwCheck}
                                style={{width: 24, height: 24}}/>
                            </EraseAll3>}
                        </InputWrapper>
                    </FormContainer>
                    <SubmitBtn
                            style={{
                                backgroundColor:
                                    isValid && values.email && values.password && values.pwCheck
                                        ? "#6100FF"
                                        : "white",
                                //flex: 1,
                                //justifyContent: "flex-end",
                            }}
                            //onPress={handleSubmit&&navigation.navigate("Tos")}
                            /*onPress={()=>{
                                navigation.navigate('Tos')
                                //signUp(values.email, values.password);
                            }}*/
                            onPress={()=>{
                                
                                //handleSubmit
                                //console.log("dmdkdmkmdkmkdm")
                                handleSignup();
                                //navigation.navigate("Tos")
                            }
                            }

                            disabled={!isValid}>
                            <SubmitTxt>다음</SubmitTxt>
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
    //position: absolute;
    width: 40px;
    height: 40px;
    left: -10px;
    top: 30px;
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
    top: 150;
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
    position: absolute;
    padding-top: 35px;
    font-Size: 10;
    color: #FF2626;
    //right: "5.13%",
`

const NoErrorTxt= styled.Text`
    position: absolute;
    padding-top: 35px;
    font-Size: 10;
    color: #6100FF;
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
    left: 80%;
    background-Color: #CCCCCC;
    width: 81;
    height: 33;
    //padding-bottom: 10px;
    border-Radius: 100;
`

const CheckTxt = styled.Text`
    text-Align: center;
    font-Size: 14;
    font-Weight: 400;
    padding-top: 8px;
`

const EraseAll = styled.TouchableOpacity`
    position: absolute;
    left: 64.87%;
    right: 28.97%;
    //top: 26.55%;
    bottom: 10.6%;
`
const EraseAll2 = styled.TouchableOpacity`
position: absolute;
left: 93.72%;
//right: 5.13%;
//top: 40.64%;
bottom: 10.52%;
`
const EraseAll3 = styled.TouchableOpacity`
position: absolute;
left: 93.72%;
//right: 5.13%;
//top: 50.83%;
bottom: 10.52%;
`