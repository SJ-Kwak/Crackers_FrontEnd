import React from "react";
import styled from "styled-components/native";
import { TextPretendard as Text } from "../static/CustomText";
import {
  Alert,
  StyleSheet,
  View,
  Image,
  Button,
  SafeAreaView,
  Pressable,
  Dimensions
} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { useFocusEffect } from "@react-navigation/native";
import { useState, useEffect, useContext, useCallback } from "react";
import { getItemFromAsync } from "../api/storage";

const Stack = createStackNavigator();
const start_logo=require("../assets/logo.png");
const { width, height } = Dimensions.get('window')

export default function HomeScreen ({navigation}) {
  useFocusEffect(useCallback(() => {
    const checkLogin = async () => {
      if (await getItemFromAsync('accessToken')){
        navigation.replace('Main')
      }
    }
    checkLogin();
  }, []))
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
      <Text style={styles.signUp}>회원가입</Text>
    </SignUpbtn>
    <InnerContainer>
      <Text style={styles.alreadyHas}>이미 계정이 있나요?</Text>
      <LoginBtn
        onPress={()=>{navigation.navigate('Login');}}>
        <Text style={styles.login}> 로그인</Text>
      </LoginBtn>
    </InnerContainer>
    </Container>
    
  );
}

const styles = StyleSheet.create({
  signUp: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600'
  },
  alreadyHas: {
    alignSelf: 'flex-end',
    fontSize: 12
  },
  login: {
    color: '#6100FF',
    fontSize: 12,
    fontWeight: '600'
  }
})

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  align-items: center;
  background-color: white;
`;

const InnerContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
  margin-bottom: 15%
`

const SignUpbtn = styled.TouchableOpacity`
  position: absolute;
  width: 342px;
  height: 44px;
  bottom: 15%;
  background-color: #6100ff;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const LoginBtn = styled.TouchableOpacity`
`