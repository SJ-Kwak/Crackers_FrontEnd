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
  import { TextInput } from "react-native-gesture-handler";
  import { Formik } from "formik";
  import * as yup from "yup";
  import Checkbox from 'expo-checkbox';
  import NicknameScreen from "./NicknameScreen";

  //import useKeyboardHeight from "react-native-use-keyboard-height";

  const Stack = createStackNavigator();
  const backIcon = require("/Users/geunhye/crackersDEMO/crackers/src/assets/tch_btnBack.png");

  export default function TosScreen({navigation}){
    const [under, setUnder] = useState("#CCCCCC");
    //const keyboardHeight = useKeyboardHeight();
    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);
    const [isChecked3, setChecked3] = useState(false);

    const link1 = () => {
        Linking.openURL("https://cracker-policy.notion.site/302754ad2f7c4ee99e41003d0d0e3eaa")
    }

    const link2 = () => {
        Linking.openURL("https://cracker-policy.notion.site/0454026d73314249bdf652816ac46280")
    }

    const allBtnEvent =()=>{
      if(isChecked1 === false) {
        setChecked1(true);
        setChecked2(true);
        setChecked3(true);
      }else {
        setChecked1(false);
        setChecked2(false);
        setChecked3(false);
      } 
    };
    
    const BtnEvent1 =()=>{
      if(isChecked2 === false) {
        setChecked2(true)
      }else {
        setChecked2(false)
      }
    };
    
    const BtnEvent2 =()=>{
      if(isChecked3 === false) {
        setChecked3(true)
      }else {
        setChecked3(false)
      }
    };
  
    useEffect(()=>{
      if(isChecked2===true && isChecked3===true){
        setChecked1(true)
      } else {
        setChecked1(false)
      }
    }, [isChecked2,isChecked3])

	return (
                <Wrapper>
                    <BackToHome
                        onPress={()=>{navigation.goBack()}}>
                        <Image
                            style={{    
                                position: 'absolute',
                                width: 20,
                                height: 40,
                                left: 10,
                                top: 50,}}
                            source={backIcon}/>
                    </BackToHome> 
                    <FormContainer>    
                        <Title>약관동의</Title>
                        <View style={{height: 200}}/>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                        <SubTitle>전체 동의합니다.</SubTitle>
                        <Checkbox
                            style={{position: "absolute", right: 2, width: 20, height: 20, borderWidth: 1, borderColor: "#E9EBED"}}
                            value={isChecked1}
                            //onValueChange={setChecked1}
                            onValueChange={allBtnEvent}
                            color={isChecked1 ? '#E8E6FF' : undefined}
                            />                            
                        </View>
                        <View style={{height: 25}}/>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                        <AgreeTxt
                            onPress={link1}
                        >서비스 이용약관(필수)</AgreeTxt>
                        <Checkbox
                            style={{position: "absolute", right: 2, width: 20, height: 20, borderWidth: 1, borderColor: "#E9EBED"}}
                            value={isChecked2}
                            //onValueChange={setChecked2}
                            onValueChange={BtnEvent1}
                            color={isChecked1|isChecked2 ? '#E8E6FF' : undefined}
                            />                            
                        </View>                        
                        <View style={{height: 25}}/>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                        <AgreeTxt
                            onPress={link2}                        
                        >개인정보 수집 및 이용 동의(필수)</AgreeTxt>
                        <Checkbox
                            style={{position: "absolute", right: 2, width: 20, height: 20, borderWidth: 1, borderColor: "#E9EBED"}}
                            value={isChecked3}
                            //onValueChange={setChecked3}
                            onValueChange={BtnEvent2}
                            color={isChecked1|isChecked3 ? '#E8E6FF' : undefined}
                            />                            
                        </View>  
                    </FormContainer>
                    <SubmitBtn
                            style={{
                                backgroundColor:
                                isChecked1&&isChecked2&&isChecked3
                                        ? "#6100FF"
                                        : "white",
                                //flex: 1,
                                //justifyContent: "flex-end",
                            }}
                            onPress={()=>{navigation.navigate('Nickname')}}
                            disabled={!isChecked1&&!isChecked2&&!isChecked3}>
                            <SubmitTxt>다음</SubmitTxt>
                        </SubmitBtn>
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
    color: black;
    font-Size: 14;
    font-Weight: 500;
`

const AgreeTxt = styled.Text`
    //position: absolute;
    color: black;
    font-Size: 14;
    font-Weight: 400;
    text-decoration: underline;
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
