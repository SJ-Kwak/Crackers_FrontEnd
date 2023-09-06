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
  Dimensions
} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect, useContext, useCallback } from "react";
import { getItemFromAsync } from "../api/storage";

const Stack = createStackNavigator();
const start_logo=require("../assets/logo.png");
const { width, height } = Dimensions.get('window')

export default function HomeScreen ({navigation}) {
  const [token, setToken] = useState(null)
  useEffect(() => {
    const checkLogin = async () => {
      setToken(await getItemFromAsync('accessToken'))
    }
    checkLogin();
    if(token) navigation.replace('Main')
  })
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
      onPress={()=>{navigation.navigate('Signup');}}>
      <SignUpTxt>회원가입</SignUpTxt>
    </SignUpbtn>
    <InnerContainer>
      <AlreadyHas>이미 계정이 있나요? </AlreadyHas>
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
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
  margin-bottom: 15%
`

const SignUpbtn = styled.TouchableOpacity`
  position: absolute;
  width: 342;
  height: 44;
  bottom: 15%;
  background-color: #6100ff;
  border-radius: 100;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const SignUpTxt = styled.Text`
  font-size: 16px;
  font-Weight: 600;
  color: white;
  text-align: center;
`

const AlreadyHas = styled.Text`
  align-self: flex-end;
  color: black;
  font-size: 12px;
  font-weight: 400;
`

const LoginBtn = styled.Text`
  color: #6100FF;
  font-size: 12px;
  font-Weight: 600;
`