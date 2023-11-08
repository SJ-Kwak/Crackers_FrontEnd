import React, { Component } from "react";
import styled from "styled-components/native";

import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const CardView = require("../assets/CardView.gif");

const CardScreen = ({ navigation, route }) => {
  useEffect(() => {
    setTimeout(() => {
      // 화면 전환 코드 작성
      navigation.navigate("CardPick", { hours: route.params.hours });
    }, 4900); // 5초 후에 실행
  }, []); // useEffect를 한 번만 실행하도록 빈 배열을 전달합니다.

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Image source={CardView} style={{alignSelf: "center", width: '100%', height: '100%'}} />
    </SafeAreaView>
  );
};

export default CardScreen;
