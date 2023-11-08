import { useEffect } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TosScreen from "./src/screens/TosScreen";
import NicknameScreen from "./src/screens/NicknameScreen";
import MainDemo from "./src/screens/MainDemo";
import SettingScreen from "./src/screens/SettingScreen";
import AdjNickScreen from "./src/screens/AdjNickScreen";
import WithdrawScreen from "./src/screens/WithdrawScreen";
import SplashScreen from "react-native-splash-screen";

import JobNickname from "./src/screens/JobNickname";
import ChooseJob from "./src/screens/ChooseJob";
import ChooseTime from "./src/screens/ChooseTime";
import ChooseMoney from "./src/screens/ChooseMoney";

import CardScreen from "./src/screens/CardScreen";
import CardPickScreen from "./src/screens/CardPickScreen";

const Stack = createStackNavigator();

function App(): JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 800);
  });

  return (
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
        <Stack.Screen name="Withdraw" component={WithdrawScreen} />
        <Stack.Screen name="JobNickname" component={JobNickname} />              
        <Stack.Screen name="ChooseJob" component={ChooseJob} />
        <Stack.Screen name="ChooseTime" component={ChooseTime} />              
        <Stack.Screen name="ChooseMoney" component={ChooseMoney} />  
        <Stack.Screen name="Card" component={CardScreen}/>
        <Stack.Screen name="CardPick" component={CardPickScreen}/>                        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
