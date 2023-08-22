import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function CardPickScreen({navigation}){


const cards = [
    require("/Users/geunhye/crackersDEMO/crackers/src/assets/cards/Abocado.png"),
    require("/Users/geunhye/crackersDEMO/crackers/src/assets/cards/Ant.png"),
    require("/Users/geunhye/crackersDEMO/crackers/src/assets/cards/Bbang.png"),
    require("/Users/geunhye/crackersDEMO/crackers/src/assets/cards/Cat.png"),
    require("/Users/geunhye/crackersDEMO/crackers/src/assets/cards/Chicken.png"),
    require("/Users/geunhye/crackersDEMO/crackers/src/assets/cards/Dish.png"),
    require("/Users/geunhye/crackersDEMO/crackers/src/assets/cards/Haedal.png"),
    require("/Users/geunhye/crackersDEMO/crackers/src/assets/cards/Ktx.png"),
    require("/Users/geunhye/crackersDEMO/crackers/src/assets/cards/Neulbo.png"),
    require("/Users/geunhye/crackersDEMO/crackers/src/assets/cards/Star.png"),    
  ];

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [index, setIndex]=useState(0);
  const [times, setTimes]=useState("0번");
  const [workTime, setWorkTime]=useState("n시간");
  const xBtn=require("/Users/geunhye/crackersDEMO/crackers/src/assets/tch_btnX.png");


  useEffect(() => {

    handleRandomPhoto();

},[]);


useEffect(() => {

    handleHowManyTimes(index);

},[]);

  const handleRandomPhoto = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    const randomPhoto = cards[randomIndex];
    setSelectedPhoto(randomPhoto);
    setIndex(randomIndex);
    console.log(index);
    //handleHowManyTimes(index);
  };

  const handleHowManyTimes = (index) => {
    if(index==0){
        setTimes("1번");
    }
    else if(index==1){
        setTimes("2번");
    }
    else if(index==2){
        setTimes("13번");
    }
    else if(index==3){
        setTimes("14번");
    }
    else if(index==4){
        setTimes("16번");
    }
    else if(index==5){
        setTimes("17번");
    }
    else if(index==6){
        setTimes("18번");
    }
    else if(index==7){
        setTimes("19번");
    }
    else if(index==8){
        setTimes("20번");
    }
    else if(index==9){
        setTimes("21번");
    }
  }

  return (
    <View
    style={{marginTop: "15%"}}>
        <TouchableOpacity
            style={{
                marginLeft: "89%",
                width: 30,
                height: 30}}
            onPress={()=> navigation.navigate('Main')}
            >
            <Image 
            source={xBtn}
            style={{width: 30, height: 30}}
            />
        </TouchableOpacity>
        <Text
            style={{
                fontSize: 24,
                fontWeight: 600,
                marginLeft: "5%",
                marginTop: "10%",
            }}
        >{workTime+"일하는 동안..."}</Text>
    <View
    style={{ marginTop: "7%", flex: 1, width: "100%" }}>
      {selectedPhoto &&(
        <Image
          source={selectedPhoto}
          resizeMode="cover"
        />
      )}
              <Text
            style={{
                position: "absolute",
                top: 142,
                left: "24%",
                fontSize: 24,
                fontWeight: 600,
                color: "#6100FF",
            }}
        >{times}</Text>
    </View>
    <View>
        <Image />
    </View>
    </View>
  );
};
