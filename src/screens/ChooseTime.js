import React, { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Display2 } from "/Users/geunhye/crackersDEMO/crackers/src/static/text.js";
import DatePicker from "react-native-datepicker";

import { createStackNavigator } from "@react-navigation/stack";

import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

const days = ["월", "화", "수", "목", "금", "토", "일"];

export default function ChooseTime({ navigation }) {
  const [isTouched, setIsTouched] = useState(Array(days.length).fill(false));
  const [selectedDayIndex, setSelectedDayIndex] = useState(-1);

  const [selectedTime1, setSelectedTime1] = useState(null);
  const [selectedTime2, setSelectedTime2] = useState(null);

  const [selectedHour1, setSelectedHour1] = useState(null);
  const [selectedMinute1, setSelectedMinute1] = useState(null);
  const [selectedHour2, setSelectedHour2] = useState(null);
  const [selectedMinute2, setSelectedMinute2] = useState(null);
  const [start, setStart] = useState(false);
  const [userdata, setUserData] = useState({
    day: "",
    startTime: null,
    endTime: null,
  }); // userdata에 알바 시간 정보를 저장하기 위한 상태 변수

  useEffect(() => {
    console.log(selectedTime1);
  }, [selectedTime1]);

  useEffect(() => {
    console.log(selectedTime2);
  }, [selectedTime2]);


  const onPressDay = (index) => {
    setIsTouched((prev) => {
      const nextState = [...prev];
      nextState[index] = !prev[index];
      return nextState;
    });
    setSelectedDayIndex(index);
    console.log(selectedDayIndex);
    setStart(true);

     // 선택한 요일 정보를 userdata에 저장
     setUserData((prevData) => ({ ...prevData, day: days[index] }));
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      //return userData ? JSON.parse(userData) : null;

      if (userData) {
        userData.day = userData.day; // 새로운 닉네임 추가
        userData.startTime=userdata.selectedTime1;
        userdata.endTime=userdata.selectedTime2;
        userdata.timeGap=calculateTimeDifference;
        await AsyncStorage.setItem('userData', JSON.stringify(userData)); // 업데이트된 정보 저장
        console.log("일 종류가 저장되었습니다");
        }

    } catch (error) {
      console.log('불러오기 실패:', error);
      return null;
    }
  };

  /*const onTimeChange1 = (time) => {
    setSelectedTime1(time);
    console.log(selectedTime1);
  
    // 선택한 시작 시간을 userdata에 저장
    setUserData((prevData) => ({ ...prevData, startTime: time }));
  };

  const onTimeChange2 = (time) => {
    setSelectedTime2(time);
    console.log(selectedTime2);

    // 선택한 종료 시간을 userdata에 저장
    setUserData((prevData) => ({ ...prevData, endTime: time }));
  };*/

  const onTimeChange1 = (time) => {

    setSelectedTime1(time);

    const [hour, minute] = time.split(":");
    setSelectedHour1(hour);
    setSelectedMinute1(minute);
    console.log(selectedHour1, selectedMinute1);
  };

  const onTimeChange2 = (time) => {

    setSelectedTime2(time);

    const [hour, minute] = time.split(":");
    setSelectedHour2(hour);
    setSelectedMinute2(minute);
    console.log(selectedHour2, selectedMinute2);
  };


  const saveUserData = () => {
    // userdata에 시작 시간과 종료 시간을 저장하는 로직을 구현하세요.
    const userdata = {
      startTime: selectedTime1,
      endTime: selectedTime2,
    };
    // userdata를 서버에 전송하거나 로컬 스토리지 등에 저장하는 등의 작업을 수행할 수 있습니다.
    console.log(userdata);
  };

  const calculateTimeDifference = () => {
    /*if (!selectedTime1 || !selectedTime2) {
      console.log("시작 시간과 종료 시간을 선택해주세요.");
      return;
    }*/

    const startTime = new Date(selectedTime1);
    const endTime = new Date(selectedTime2);
    const timeDifferenceInMilliseconds = endTime - startTime;

    // 시간 간격을 계산하여 원하는 형식으로 표시할 수 있습니다.
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));

    return timeDifferenceInMinutes;
    //console.log("시간 간격:", formattedTimeDifference);
  };

  const daysList = days.map((day, index) => (
    <Days
      key={index}
      isTouched={isTouched[index]}
      onPress={() => onPressDay(index)}
    >
      <DayContainer isTouched={isTouched[index]}>{day}</DayContainer>
    </Days>
  ));

  return (
    <Container>
      <HeaderWrapper>
        <Image 
        style={{height: 24, width: 217}}
        source={Headerimg} />
      </HeaderWrapper>
      <MainContainer>
        <Display2>알바 시간 정하기</Display2>
        <DayListContainer>{daysList}</DayListContainer>
        <TimePick>
          {start && <Text 
          style={{ top: 15 }}>시작</Text>}
          {selectedDayIndex >= 0 && (
            <DatePickerContainer>
              <DatePicker
                style={{ width: 265 }}
                date={selectedTime1}
                mode="time"
                format="HH:mm"
                minuteInterval={1}
                onDateChange={onTimeChange1}
                showIcon={false}
                locale="ko"
                confirmBtnText="확인"
                cancelBtnText="취소"
                customStyles={{
                  dateInput: {
                    display: "flex",
                    borderWidth: 0,
                    width: 265,
                    height: 46,
                    borderRadius: 100,
                    backgroundColor: "#f5f5f5",
                    alignItems: "center",
                    padding: 0,
                    margin: 0,
                  },
                  btnTextConfirm: {
                    color: "#6100FF",
                  },
                  btnTextCancel: {
                    color: "#cccccc",
                  },
                  Text: {
                    color: "#ffffff",
                  },
                }}
                showTime={false}
              />
            </DatePickerContainer>
          )}
        </TimePick>
        <TimePick>
        {start && <Text 
          style={{ top: 15 }}>종료</Text>}
          {selectedDayIndex >= 0 && (
            <DatePickerContainer>
              <DatePicker
                style={{ width: 265 }}
                date={selectedTime2}
                mode="time"
                format="HH:mm"
                minuteInterval={1}
                onDateChange={onTimeChange2}
                showIcon={false}
                locale="ko"
                confirmBtnText="확인"
                cancelBtnText="취소"
                customStyles={{
                  dateInput: {
                    display: "flex",
                    borderWidth: 0,
                    borderRadius: 100,
                    height: 46,
                    backgroundColor: "#f5f5f5",
                    alignItems: "center",
                    padding: 0,
                    margin: 0,
                  },
                  btnTextConfirm: {
                    color: "#6100FF",
                  },
                  btnTextCancel: {
                    color: "#cccccc",
                  },
                  Text: {
                    color: "#ffffff",
                  },
                }}
                showTime={false}
              />
            </DatePickerContainer>
          )}
        </TimePick>
      </MainContainer>
      <NextBtnContainer onPress={() => {
        navigation.navigate("ChooseMoney");
        calculateTimeDifference;
        saveUserData;
      }}>
        <Image 
        style={{height: 40, width: 40}}
        source={start ? NextBtn : NextBtnGray} />
      </NextBtnContainer>
      <BackBtnContainer onPress={() => navigation.navigate("ChooseJob")}>
        <Image 
        style={{height: 40, width: 40}}
        source={BackBtn} />
      </BackBtnContainer>
    </Container>
  );
}

const Days = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;
  border-radius: 50%;

  background-color: ${(props) => (props.isTouched ? "#6100FF" : "#f5f5f5")};
`;

const DayContainer = styled.Text`
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  color: ${(props) => (props.isTouched ? "white" : "black")};
  
`;

const DayListContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 10px;
  margin-left: 20;
  margin-right: 20;
`;

const DatePickerContainer = styled(View)`
  margin-top: 20px;
  margin-left: 25px;
`;

const Container = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  //margin-left: 20px;
  //margin-right: 20px;
`;

const MainContainer = styled.View`
  margin: 20px;
`;

const Headerimg = require("/Users/geunhye/crackersDEMO/crackers/src/assets/onBoarding/Header3.png");
const HeaderWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  //margin-top: 5%;
  margin-top: 24px;
  margin-bottom: 48px;
`;

const TimePick = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const NextBtn = require("/Users/geunhye/crackersDEMO/crackers/src/assets/onBoarding/Nextbtn.png");
const NextBtnGray = require("/Users/geunhye/crackersDEMO/crackers/src/assets/onBoarding/NextbtnGray.png");

const NextBtnContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  left: 85%;
  top: 752px;
  width: 40px;
  height: 40px;
`;

const BackBtn = require("/Users/geunhye/crackersDEMO/crackers/src/assets/onBoarding/BackbtnGray.png");
const BackBtnContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  left: 72%;
  top: 752px;
  width: 40px;
  height: 40px;
`;