import { View, Text } from "react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
//import TosScreen from "./src/screens/TosScreen";
//import TempScreen from "./src/screens/TempScreen";
import TosScreen from "./src/screens/TosScreen";
import NicknameScreen from "./src/screens/NicknameScreen";
import LiquidScreen from "./src/screens/LiquidScreen";
import MainScreen from "./src/screens/MainScreen"; 
import CaroScreen from "./src/screens/CaroScreen";
import MainDemo from "./src/screens/MainDemo";
import SettingScreen from "./src/screens/SettingScreen";
import AdjNickScreen from "./src/screens/AdjNickScreen";
import { MyCarousel } from "./src/screens/MyCarousel";
import styled from "styled-components/native";

import JobNickname from "./src/screens/JobNickname";
import ChooseJob from "./src/screens/ChooseJob";
import ChooseTime from "./src/screens/ChooseTime";
import ChooseMoney from "./src/screens/ChooseMoney";

import CardScreen from "./src/screens/CardScreen";
import CardPickScreen from "./src/screens/CardPickScreen";

//import JobNickname from "./src/screens/JobNickname";

import { AuthProvider } from "./AuthContext";

const Stack = createStackNavigator();

export default function App() {
  //return <HomeScreen />;
  //return <LoginScreen/>;
  //return <SignupScreen/>;
  //return <TempScreen/>;
  //return <TosScreen/>;
  //return <NicknameScreen/>;
  //return <MainScreen/>;
  //return <MainDemo/>;
  //return <SettingScreen/>;
  //return <JobNickname/>;
  //return <ChooseJob/>;
  //return <ChooseTime/>;
  //return <ChooseMoney/>;
  //return <LiquidScreen/>;
  //return <CardScreen/>;
  //return <CardPickScreen/>;

  
    
  return(
    <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Tos" component={TosScreen} />
            <Stack.Screen name="Nickname" component={NicknameScreen} />
            <Stack.Screen name="Main" component={MainDemo} />
            <Stack.Screen name="Setting" component={SettingScreen} />   
            <Stack.Screen name="AdjNickname" component={AdjNickScreen} />    
            <Stack.Screen name="JobNickname" component={JobNickname} />              
            <Stack.Screen name="ChooseJob" component={ChooseJob} />              
            <Stack.Screen name="ChooseTime" component={ChooseTime} />              
            <Stack.Screen name="ChooseMoney" component={ChooseMoney} />  
            <Stack.Screen name="Card" component={CardScreen}/>
            <Stack.Screen name="CardPick" component={CardPickScreen}/>                        
          </Stack.Navigator>
        </NavigationContainer>
    </AuthProvider>
  );

  //return <CaroScreen/>
  //return <MyCarousel/>
}
