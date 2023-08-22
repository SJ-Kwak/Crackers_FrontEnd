import React, { Component } from "react-native";
import styled from "styled-components/native";

import {
    StyleSheet,
    Text,
    View,
    Image,
  } from "react-native";
  import { useState, useEffect } from "react";
  import { createStackNavigator } from "@react-navigation/stack";

  const Stack = createStackNavigator();

  const CardView = require("/Users/geunhye/crackersDEMO/crackers/src/assets/CardView.gif");
  //const [start, setStart] = useState(true);

  const tempCard=require("/Users/geunhye/crackersDEMO/crackers/src/assets/cards/Haedal.png");


  /*export default function CardScreen({navigation}){

    useEffect(()=>{
        if(start) {
        setInterval(()=>{
            return(
                <View style={{flex: 1, backgroundColor: "white"}}>
                <Image source={CardView} 
                style={{width: "100%"}} />
             </View>
            );
        }, 1000);
        }
    }, [start])

 }*/

/*export default function CardScreen({navigation}){

        const CardScreen = ({ navigation }) => {
        useEffect(() => {
            const timer = setTimeout(() => {
            // 화면 전환 코드 작성
            navigation.navigate('Home');
            }, 5000); // 5초 후에 실행

            // 컴포넌트가 언마운트될 때 타이머를 클리어합니다.
            return () => clearTimeout(timer);
        }, []); // useEffect를 한 번만 실행하도록 빈 배열을 전달합니다.
        };


            return(
                <View style={{flex: 1, backgroundColor: "white", paddingTop: 30}}>
                <Image source={CardView} 
                style={{width: "100%"}} />
             </View>
            );

}*/


const CardScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // 화면 전환 코드 작성
      navigation.navigate('CardPick');
      /*return (
        <View style={{flex: 1, backgroundColor: "white"}}>
            <Image
                source={tempCard}/>
        </View>
      );*/
    }, 4900); // 5초 후에 실행

    // 컴포넌트가 언마운트될 때 타이머를 클리어합니다.
    return () => clearTimeout(timer);
  }, []); // useEffect를 한 번만 실행하도록 빈 배열을 전달합니다.

  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
    <Image source={CardView} 
    style={{width: "100%"}} />
 </View>
  );
};

export default CardScreen;

 /*useEffect(() => {
    //if (running) updatePercentage()
    let interval;
    if(running1){
        interval=setInterval(() => {
            setCharge((charge)=>charge+0.2);
        }, 10);
    }
    else if(!running1){
        clearInterval(interval);
    }
    return()=>clearInterval(interval);
  }, [running1]);*/

  /*export default class CardScreen extends React.Component{
    componentDidMount(){
        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(()=>{
             //navigation.navigate("Main");
        }, 5000);
   }

   componentWillUnmount(){
        clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
   }

   render() {
   return (
       <Image source={CardView} 
       style={{width: "100%"}} />
       //How to redirect to another page from here after 5 secs?

   );
 }
}*/