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
    Linking
  } from "react-native";
  import { useState, useEffect } from "react";
  import { createStackNavigator } from "@react-navigation/stack";
  //import useKeyboardHeight from "react-native-use-keyboard-height";

  const Stack = createStackNavigator();
  const backIcon = require("/Users/geunhye/crackersDEMO/crackers/src/assets/tch_btnBack.png");

  export default function SettingScreen({navigation}){
    //const keyboardHeight = useKeyboardHeight();

    const link1 = () => {
        Linking.openURL("https://cracker-policy.notion.site/302754ad2f7c4ee99e41003d0d0e3eaa")
    }

    const link2 = () => {
        Linking.openURL("https://cracker-policy.notion.site/0454026d73314249bdf652816ac46280")
    }

	return (
        <Wrapper>
            <BackToHome 
                onPress={()=>{navigation.goBack()}}>
                <Image
                    source={backIcon}/>
            </BackToHome> 
            <Title>설정</Title>
            <Bar
                style={{top : 108}}/>
            <Menu 
                onPress={()=>{navigation.navigate('AdjNickname')}}
                style={{top: 124}}>
                닉네임 수정하기
            </Menu>
            <Bar
                style={{top : 159}}/>
            <Menu 
                onPress={link2}
                style={{top: 175}}>
                개인정보처리방침
            </Menu>
            <Bar
                style={{top : 210}}/>
            <Menu 
                onPress={link1}
                style={{top: 226}}>
                서비스 이용약관
            </Menu>
            <Bar
                style={{top : 261}}/>
            <Menu style={{top: 277}}>
                오픈 소스 라이선스
            </Menu>
            <Bar
                style={{top : 312}}/>
        </Wrapper>
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
    top: 50;
`
const Title = styled.Text`
    position: absolute;
    width: 32px;
    height: 21px;
    //left: 179px;
    top: 60px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;

    /* black */

    color: #1C1C1C;
`

const Menu = styled.Text`
    position: absolute;
    //width: 101px;
    height: 19px;
    left: 24px;
    //top: 124px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */


    /* black */

    color: #1C1C1C;
`
const Bar = styled.View`
    position: absolute;
    width: 450px;
    height: 0px;
    //left: 0px;
    //top: 108px;
    align-items: center;

    /* gray4 */

    border: 1px solid #F5F5F5;
`