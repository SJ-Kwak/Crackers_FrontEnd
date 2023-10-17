import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native";
import { TextPretendard as Text } from "../static/CustomText";
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
  const [workTime, setWorkTime] = useState(route.params.hours.toFixed(1)+'시간');
  const xBtn = require("../assets/tch_btnX.png");
  const request = new Request();
  const [firstWord, setFirstWord] = useState('')

  function extractNumberWithUnit(sentence) {
    // 정규 표현식. 실수, 단위 명사 추출
    const match = sentence.match(/(\d+(?:\.\d+)?)\s*(.+)/);
  
    if (match) {
      // 문자열로 병합
      const number = match[1];
      const unit = match[2].charAt(0);
      return `${number}${unit}`;
    } else {
      return null;
    }
  }

  const getCard = async () => {
    const response = await request.get('/card/all')
    setTimes(extractNumberWithUnit(response.data[response.data.length-1]))
    for (const card of cards) {
      if (response.data[response.data.length-1].includes(card.name)) {
        setSelectedPhoto(card.source);
        return;
      }
    }
  }

  useEffect(() => {
    getCard()
  }, [])

  const handleRandomPhoto = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const randomPhoto = cards[randomIndex].source;
    setSelectedPhoto(randomPhoto);
    setIndex(randomIndex);
  };

  return (
    <SafeAreaView style={{ marginTop: "15%" }}>
      <TouchableOpacity
        style={{
          marginLeft: "89%",
          width: 30,
          height: 30,
        }}
        onPress={() => navigation.replace("Main")}
      >
        <Image source={xBtn} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '600',
          marginLeft: "5%",
          marginTop: "10%",
        }}
      >
        {workTime + " 일하는 동안..."}
      </Text>
      <View style={{ marginTop: "7%", flex: 1, width: "100%", alignItems: 'center' }}>
        {selectedPhoto && <Image source={selectedPhoto} resizeMode="cover" />}
        <Text
          style={{
            position: "absolute",
            top: 140,
            left: "20%",
            fontSize: 24,
            fontWeight: '600',
            color: "#6100FF",
          }}
        >
          {times}
        </Text>
      </View>
      <View>
        <Image />
      </View>
    </SafeAreaView>
  );
}
