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

  export default class CardScreen extends React.Component{
    componentDidMount(){
        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(()=>{
             navigation.navigate("Main");
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


}