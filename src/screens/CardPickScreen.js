import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, ImageBackground } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { Request } from "../api/request";

const Stack = createStackNavigator();

export default function CardPickScreen({ navigation, route }) {
  const cards = [
    { name: '아보카도가', source: require("../assets/cards/Abocado.png") },
    { name: '개미가', source: require("../assets/cards/Ant.png") },
    { name: '붕어빵이', source: require("../assets/cards/Bbang.png") },
    { name: '고양이가', source: require("../assets/cards/Cat.png") },
    { name: '180도', source: require("../assets/cards/Chicken.png") },
    { name: '접시가', source: require("../assets/cards/Dish.png") },
    { name: '해달이', source: require("../assets/cards/Haedal.png") },
    { name: 'KTX를', source: require("../assets/cards/Ktx.png") },
    { name: '나무늘보가', source: require("../assets/cards/Neulbo.png") },
    { name: '하늘에서', source: require("../assets/cards/Star.png") },
    { name: '파블로프의', source: require("../assets/cards/Abocado.png")}
  ]

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [index, setIndex] = useState(0);
  const [times, setTimes] = useState('');
  const [workTime, setWorkTime] = useState(route.params.hours+'시간');
  const xBtn = require("../assets/tch_btnX.png");
  const request = new Request();
  const [firstWord, setFirstWord] = useState('')

  function extractNumberWithUnit(sentence) {
    // 정규 표현식을 사용하여 실수와 단위 명사를 추출합니다.
    const match = sentence.match(/(\d+(?:\.\d+)?)\s*(.+)/);
  
    // match가 null이면 실수와 단위 명사를 찾지 못한 경우입니다.
    if (match) {
      // 추출한 실수와 단위 명사를 하나의 문자열로 합쳐서 반환합니다.
      const number = match[1];
      const unit = match[2].charAt(0);
      return `${number}${unit}`;
    } else {
      // 실수와 단위 명사를 찾지 못한 경우에는 null 또는 다른 기본값을 반환할 수 있습니다.
      return null;
    }
  }

  const getCard = async () => {
    const response = await request.get('/card/all')
    setTimes(extractNumberWithUnit(response.data[response.data.length-1]))
    for (const card of cards) {
      if (response.data[response.data.length-1].includes(card.name)) {
        setSelectedPhoto(card.source);
        return; // 일치하는 카드를 찾으면 함수를 종료합니다.
      }
    }
  }

  useEffect(() => {
    getCard()
    console.error(selectedPhoto);
  }, [])

  const handleRandomPhoto = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const randomPhoto = cards[randomIndex].source;
    setSelectedPhoto(randomPhoto);
    setIndex(randomIndex);
    console.log(index);
    //handleHowManyTimes(index);
  };

  const handleHowManyTimes = (index) => {
    if (index == 0) {
      setTimes("1번");
    } else if (index == 1) {
      setTimes("2번");
    } else if (index == 2) {
      setTimes("13번");
    } else if (index == 3) {
      setTimes("14번");
    } else if (index == 4) {
      setTimes("16번");
    } else if (index == 5) {
      setTimes("17번");
    } else if (index == 6) {
      setTimes("18번");
    } else if (index == 7) {
      setTimes("19번");
    } else if (index == 8) {
      setTimes("20번");
    } else if (index == 9) {
      setTimes("21번");
    }
  };

  return (
    <View style={{ marginTop: "15%" }}>
      <TouchableOpacity
        style={{
          marginLeft: "89%",
          width: 30,
          height: 30,
        }}
        onPress={() => navigation.navigate("Main")}
      >
        <Image source={xBtn} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 600,
          marginLeft: "5%",
          marginTop: "10%",
        }}
      >
        {workTime + " 일하는 동안..."}
      </Text>
      <View style={{ marginTop: "7%", flex: 1, width: "100%" }}>
        {selectedPhoto && <Image source={selectedPhoto} resizeMode="cover" />}
        <Text
          style={{
            position: "absolute",
            top: 140,
            left: "20%",
            fontSize: 24,
            fontWeight: 600,
            color: "#6100FF",
          }}
        >
          {times}
        </Text>
      </View>
      <View>
        <Image />
      </View>
    </View>
  );
}
