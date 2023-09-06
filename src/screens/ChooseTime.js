import React, { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Display2 } from "../static/text.js";
import DatePicker from "react-native-datepicker";

import { createStackNavigator } from "@react-navigation/stack";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { setItemToAsync } from "../api/storage.js";

const Stack = createStackNavigator();

const days = ["월", "화", "수", "목", "금", "토", "일"];

export default function ChooseTime({ navigation }) {
  const [isTouched, setIsTouched] = useState(Array(days.length).fill(false));
  const [selectedDayIndex, setSelectedDayIndex] = useState([]);

  const [selectedTime1, setSelectedTime1] = useState(null);
  const [selectedTime2, setSelectedTime2] = useState(null);

  const [selectedHour1, setSelectedHour1] = useState(0);
  const [selectedMinute1, setSelectedMinute1] = useState(0);
  const [selectedHour2, setSelectedHour2] = useState(0);
  const [selectedMinute2, setSelectedMinute2] = useState(0);
  const [start, setStart] = useState(false);
  const [userdata, setUserData] = useState({
    day: "",
    startTime: null,
    endTime: null,
  }); // userdata에 알바 시간 정보를 저장하기 위한 상태 변수

  const [scheduleList, setScheduleList] = useState([])

  const onPressDay = (index) => {
    if (isTouched.includes(index)) {
      setIsTouched(isTouched.filter(id => id !== index));
      setSelectedDayIndex(selectedDayIndex.filter((id) => id !== days[index]));
    } else {
      setIsTouched([...isTouched, index]);
      setSelectedDayIndex([...selectedDayIndex, days[index]]);
    }

    setStart(true);
  };

  const saveScheduleList = async (scheduleList) => {
    await setItemToAsync('scheduleList', scheduleList);
    console.error('성공!')
    navigation.navigate('ChooseMoney')
  };

  const handleTime = async () => {
    if (selectedDayIndex.length > 0 && selectedHour1 !== null && selectedHour2 !== null) {
      const newScheduleList = selectedDayIndex.map((day) => ({
        day,
        startTime: selectedHour1.toString()+selectedMinute1.toString(),
        endTime: selectedHour2.toString()+selectedMinute2.toString(),
      }));

      await saveScheduleList(newScheduleList);
    }
  };

  const onTimeChange1 = (time) => {
    setSelectedTime1(time);

    const [hour, minute] = time.split(":");
    setSelectedHour1(hour);
    setSelectedMinute1(minute);
  };

  const onTimeChange2 = (time) => {
    setSelectedTime2(time);

    const [hour, minute] = time.split(":");
    setSelectedHour2(hour);
    setSelectedMinute2(minute);
  };

  const daysList = days.map((day, index) => (
    <Days
      key={index}
      isTouched={isTouched.includes(index)}
      onPress={() => onPressDay(index)}
    >
      <DayContainer isTouched={isTouched.includes(index)}>{day}</DayContainer>
    </Days>
  ));

  return (
    <Container>
      <HeaderWrapper>
        <Image style={{ height: 24, width: 217 }} source={Headerimg} />
      </HeaderWrapper>
      <MainContainer>
        <Display2>알바 시간 정하기</Display2>
        <DayListContainer>{daysList}</DayListContainer>
        <TimePick>
          {start && <Text style={{ top: 15 }}>시작</Text>}
          {selectedDayIndex.length > 0 && (
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
          {start && <Text style={{ top: 15 }}>종료</Text>}
          {selectedDayIndex.length > 0 && (
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
      <NextBtnContainer
        onPress={handleTime}
        // onPress={() => {
        //   navigation.navigate("ChooseMoney");
        //   calculateTimeDifference;
        //   saveUserData;
        // }}
      >
        <Image
          style={{ height: 40, width: 40 }}
          source={start ? NextBtn : NextBtnGray}
        />
      </NextBtnContainer>
      <BackBtnContainer onPress={() => navigation.navigate("ChooseJob")}>
        <Image style={{ height: 40, width: 40 }} source={BackBtn} />
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

const Headerimg = require("../assets/onBoarding/Header3.png");
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

const NextBtn = require("../assets/onBoarding/Nextbtn.png");
const NextBtnGray = require("../assets/onBoarding/NextbtnGray.png");

const NextBtnContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  left: 85%;
  bottom: -90%;
  width: 40px;
  height: 40px;
`;

const BackBtn = require("../assets/onBoarding/BackbtnGray.png");
const BackBtnContainer = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  left: 72%;
  bottom: -90%;
  width: 40px;
  height: 40px;
`;
