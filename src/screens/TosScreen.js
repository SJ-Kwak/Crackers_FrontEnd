import React from "react";
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
  Linking,
} from "react-native";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as yup from "yup";
import Checkbox from "expo-checkbox";
import NicknameScreen from "./NicknameScreen";

//import useKeyboardHeight from "react-native-use-keyboard-height";

const Stack = createStackNavigator();
const backIcon = require("../assets/tch_btnBack.png");

export default function TosScreen({ navigation, route }) {
  const [under, setUnder] = useState("#CCCCCC");
  //const keyboardHeight = useKeyboardHeight();
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);

  const link1 = () => {
    Linking.openURL(
      "https://cracker-policy.notion.site/302754ad2f7c4ee99e41003d0d0e3eaa"
    );
  };

  const link2 = () => {
    Linking.openURL(
      "https://cracker-policy.notion.site/0454026d73314249bdf652816ac46280"
    );
  };

  const allBtnEvent = () => {
    if (isChecked1 === false) {
      setChecked1(true);
      setChecked2(true);
      setChecked3(true);
    } else {
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
    }
  };

  const BtnEvent1 = () => {
    if (isChecked2 === false) {
      setChecked2(true);
    } else {
      setChecked2(false);
    }
  };

  const BtnEvent2 = () => {
    if (isChecked3 === false) {
      setChecked3(true);
    } else {
      setChecked3(false);
    }
  };

  useEffect(() => {
    if (isChecked2 === true && isChecked3 === true) {
      setChecked1(true);
    } else {
      setChecked1(false);
    }
  }, [isChecked2, isChecked3]);

  return (
    <Wrapper>
      <BackToHome
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image source={backIcon} style={{width: 40, height: 40}}/>
      </BackToHome>
      <FormContainer>
      <Text style={styles.title}>약관동의</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 50 }}
        >
          <Text style={styles.subtitle}>전체 동의합니다.</Text>
          <Checkbox
            style={{
              position: "absolute",
              right: 2,
              width: 20,
              height: 20,
              borderWidth: 1,
              borderColor: "#E9EBED",
            }}
            value={isChecked1}
            //onValueChange={setChecked1}
            onValueChange={allBtnEvent}
            color={isChecked1 ? "#E8E6FF" : undefined}
          />
        </View>
        <View style={{ height: 25 }} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.agree} onPress={link1}>서비스 이용약관(필수)</Text>
          <Checkbox
            style={{
              position: "absolute",
              right: 2,
              width: 20,
              height: 20,
              borderWidth: 1,
              borderColor: "#E9EBED",
            }}
            value={isChecked2}
            //onValueChange={setChecked2}
            onValueChange={BtnEvent1}
            color={isChecked1 | isChecked2 ? "#E8E6FF" : undefined}
          />
        </View>
        <View style={{ height: 25 }} />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.agree} onPress={link2}>개인정보 수집 및 이용 동의(필수)</Text>
          <Checkbox
            style={{
              position: "absolute",
              right: 2,
              width: 20,
              height: 20,
              borderWidth: 1,
              borderColor: "#E9EBED",
            }}
            value={isChecked3}
            //onValueChange={setChecked3}
            onValueChange={BtnEvent2}
            color={isChecked1 | isChecked3 ? "#E8E6FF" : undefined}
          />
        </View>
      </FormContainer>
      <SubmitBtn
        style={{
          backgroundColor:
            isChecked1 && isChecked2 && isChecked3 ? "#6100FF" : "white",
          //flex: 1,
          //justifyContent: "flex-end",
        }}
        onPress={() => {
          navigation.navigate("Nickname");
        }}
        disabled={!isChecked1 && !isChecked2 && !isChecked3}
      >
        <Text style={styles.submit}>다음</Text>
      </SubmitBtn>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#202020',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 29,
    marginTop: 80
  },
  subtitle: {
    color: '#606060',
    fontSize: 14,
    fontWeight: '500'
  },
  submit: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: '600'
  },
  agree: {
    fontSize: 14,
    textDecorationLine: 'underline'
  }
})

const Wrapper = styled.SafeAreaView`
  background-color: white;
  flex: 1;
  align-items: center;
`;
const FormContainer = styled.View`
  padding: 20px;
  width: 100%;
  flex: 1;
`;
const BackToHome = styled.TouchableOpacity`
  position: absolute;
  width: 60px;
  height: 60px;
  margin: 10px 0px;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  z-index: 1;
`;
const BackIcon = styled.Image`
  width: 40px;
  height: 40px;
`;

const InputWrapper = styled.View`
  margin-bottom: 15px;
`;

const InputTxt = styled.TextInput`
  padding-bottom: 8px;
`;

const SubmitBtn = styled.TouchableOpacity`
  position: absolute;
  width: 350px;
  height: 44px;
  bottom: 52px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;
