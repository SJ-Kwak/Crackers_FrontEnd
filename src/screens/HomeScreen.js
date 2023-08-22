import React from "react-native";
import styled from "styled-components/native";

import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  SafeAreaView,
  Pressable,
} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";

//import start_logo from "src/screens/start_logo.png";
const Stack = createStackNavigator();
const start_logo=require("/Users/geunhye/crackersDEMO/crackers/src/assets/logo.png");

export default function HomeScreen({navigation}) {
  return (
  <Container>
    <Image 
      source={start_logo}
      style={{		
        position: "absolute",
        width: 151,
        height: 32,
        //left: 115,
        top: 240,}}/>
    <SignUpbtn
        onPress={()=>{navigation.navigate('Signup');}}/>
    <SignUpTxt>회원가입</SignUpTxt>
    <InnerContainer>
      <AlreadyHas>이미 계정이 있나요?</AlreadyHas>
      <LoginBtn
        onPress={()=>{navigation.navigate('Login');}}>
        로그인
        </LoginBtn>
    </InnerContainer>
    </Container>
    
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

const Container2 = styled.View`
  align-items: center;
`

const InnerContainer = styled.View`
  flex-direction: row;
  //align-items: center;
`

const SignUpbtn = styled.TouchableOpacity`
  position: absolute;
  width: 342;
  height: 44;
  //left: 24;
  bottom: 116;
  background-color: #6100ff;
  border-radius: 100;
  //align-items: center;
`;

const SignUpTxt = styled.Text`
  font-size: 16;
  font-Weight: 600;
  color: white;
  position: absolute;
  width: 56;
  height: 19;
  //left: 167;
  //top: 720;
  bottom: 128;
  align-items: center;
`

const AlreadyHas = styled.Text`
  position: absolute;
  //width: 81;
  //height: 11;
  left: -18%;
  top: 750;
  color: black;
  font-size: 12;
  font-weight: 400;
`

const LoginBtn = styled.Text`
  position: absolute;
  //width: 26;
  //height: 12;
  left: 7.5%;
  top: 751;
  color: #6100FF;
  font-size: 12;
  font-Weight: 600;
`


// const styles = StyleSheet.create({
// 	logo: {
// 		position: "absolute",
// 		width: 160,
// 		height: 30.39,
// 		left: 115,
// 		top: 240,
// 	},
// 	signup: {

// 	},
// });
