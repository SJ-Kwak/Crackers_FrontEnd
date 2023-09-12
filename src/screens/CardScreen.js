import React, { Component } from "react";
import styled from "styled-components/native";

import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const CardView = require("../assets/CardView.gif");
const tempCard = require("../assets/cards/Haedal.png");

const CardScreen = ({ navigation, route }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // 화면 전환 코드 작성
      navigation.navigate("CardPick", { hours: route.params.hours});
    }, 4900); // 5초 후에 실행

    // 컴포넌트가 언마운트될 때 타이머를 클리어합니다.
    return () => clearTimeout(timer);
  }, []); // useEffect를 한 번만 실행하도록 빈 배열을 전달합니다.

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Image source={CardView} style={{ width: "100%" }} />
    </SafeAreaView>
  );
};

export default CardScreen;