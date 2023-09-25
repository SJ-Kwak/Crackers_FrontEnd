import React, { useState, useEffect } from "react";
import { Image, TouchableOpacity, View, Modal, Pressable, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { Display2 } from "../static/text.js";
import DatePicker from "react-native-datepicker";
import { Dimensions } from "react-native";
import { TextPretendard as Text } from "../static/CustomText.js";
import { createStackNavigator } from "@react-navigation/stack";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { setItemToAsync } from "../api/storage.js";
import { asPickerFormat } from "../components/utils.js";
import { BUTTON_HEIGHT, VIEW_WIDTH } from "../components/values.js";
import TimePicker from "../components/TImePicker.js";

const Stack = createStackNavigator();
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const days = ["월", "화", "수", "목", "금", "토", "일"];

export default function ChooseTime({ navigation }) {
  const [isTouched, setIsTouched] = useState(Array(days.length).fill(false));
  const [selectedDayIndex, setSelectedDayIndex] = useState([]);

  const [selectedTime1, setSelectedTime1] = useState(asPickerFormat(new Date(2023,10,11,9,30,0)));
  const [selectedTime2, setSelectedTime2] = useState(asPickerFormat(new Date(2023,10,11,18,30,0)));
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  const [selectedHour1, setSelectedHour1] = useState(0);
  const [selectedMinute1, setSelectedMinute1] = useState(0);
  const [selectedHour2, setSelectedHour2] = useState(0);
  const [selectedMinute2, setSelectedMinute2] = useState(0);
  const [start, setStart] = useState(false);
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
    navigation.navigate('ChooseMoney')
  };

  const convertTime = (time) => {
    const dateTimeString = time ;
    const dateObject = new Date(dateTimeString);

    const hours = dateObject.getHours(); // 시간 추출
    const minutes = dateObject.getMinutes(); // 분 추출

    // 시간과 분을 두 자리 숫자로 포맷팅
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    // 시간 문자열 생성
    return (formattedHours + formattedMinutes);
  }

  const handleTime = async () => {
    if (selectedDayIndex.length > 0 && selectedHour1 !== null && selectedHour2 !== null) {
      const newScheduleList = selectedDayIndex.map((day) => ({
        day,
        // startTime: selectedTime1.getHours().toString().concat(selectedTime1.getMinutes()===0?'00':selectedTime1.getMinutes().toString()),
        // endTime: selectedTime2.getHours().toString().concat(selectedTime2.getMinutes()===0?'00':selectedTime2.getMinutes().toString())
        startTime: convertTime(selectedTime1),
        endTime: convertTime(selectedTime2)
      }));

      await saveScheduleList(newScheduleList);
    }
  };

  const daysList = days.map((day, index) => (
    <Days
      key={index}
      isTouched={isTouched.includes(index)}
      onPress={() => onPressDay(index)}
    >
      <Text style={styles(isTouched.includes(index)).daycontainer}>{day}</Text>
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
          {selectedDayIndex.length > 0 && <Text style={{ top: 10 }}>시작</Text>}
          {selectedDayIndex.length > 0 && (
            <DatePickerContainer>
              <TouchableOpacity style={{backgroundColor: '#f5f5f5', height: 42, width: 260, borderRadius: 100, justifyContent: 'center', alignItems: 'center'}} onPress={() => setStartOpen(true)}>
                <Text style={{color: '#1C1C1C'}}>{convertTime(selectedTime1).substr(0,2)}:{convertTime(selectedTime1).substr(2,2)}</Text>
              </TouchableOpacity>
              <Modal transparent={true} visible={startOpen} animationType="slide" onRequestClose={() => setStartOpen(false)}>
                <View style={{backgroundColor: 'white', position: 'absolute', top: windowHeight *0.5, left: (windowWidth-VIEW_WIDTH)/2, width: VIEW_WIDTH}}>
                  <TimePicker
                    value={selectedTime1}
                    onChange={setSelectedTime1}
                    width={VIEW_WIDTH}
                    buttonHeight={BUTTON_HEIGHT}
                    visibleCount={3}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <Pressable style={{width: '50%', borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}} onPress={() => setStartOpen(false)}>
                      <Text>취소</Text>
                    </Pressable>
                    <Pressable style={{width: '50%', borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}} onPress={() => { setStartOpen(false)}}>
                      <Text>확인</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </DatePickerContainer>
          )}
        </TimePick>
        <TimePick>
          {selectedDayIndex.length > 0 && <Text style={{ top: 10 }}>종료</Text>}
          {selectedDayIndex.length > 0 && (
            <DatePickerContainer>
            <TouchableOpacity style={{backgroundColor: '#f5f5f5', height: 42, width: 260, borderRadius: 100, justifyContent: 'center', alignItems: 'center'}} onPress={() => setEndOpen(true)}>
              <Text style={{color: '#1C1C1C'}}>{convertTime(selectedTime2).substr(0,2)}:{convertTime(selectedTime2).substr(2,2)}</Text>
            </TouchableOpacity>
            <Modal transparent={true} visible={endOpen} animationType="slide" onRequestClose={() => setEndOpen(false)}>
              <View style={{backgroundColor: 'white', position: 'absolute', top: windowHeight *0.5, left: (windowWidth-VIEW_WIDTH)/2, width: VIEW_WIDTH}}>
                <TimePicker
                  value={selectedTime2}
                  onChange={setSelectedTime2}
                  width={VIEW_WIDTH}
                  buttonHeight={BUTTON_HEIGHT}
                  visibleCount={3}
                />
                <View style={{flexDirection: 'row'}}>
                  <Pressable style={{width: '50%', borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}} onPress={() => setEndOpen(false)}>
                    <Text>취소</Text>
                  </Pressable>
                  <Pressable style={{width: '50%', borderWidth: 1, borderColor: 'black', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}} onPress={() => {setEndOpen(false)}}>
                    <Text>확인</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </DatePickerContainer>
          )}
        </TimePick>
      </MainContainer>
      <NextBtnContainer
        onPress={handleTime}
      >
        <Image
          style={{ height: 40, width: 40 }}
          source={selectedDayIndex.length > 0 ? NextBtn : NextBtnGray}
        />
      </NextBtnContainer>
      <BackBtnContainer onPress={() => navigation.navigate("ChooseJob")}>
        <Image style={{ height: 40, width: 40 }} source={BackBtn} />
      </BackBtnContainer>
    </Container>
  );
}

const styles = (isTouched) => StyleSheet.create({
  daycontainer: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16.71,
    color: isTouched ? 'white' : 'black'
  }
})

const Days = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;
  border-radius: 180px;

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
  margin-left: 20px;
  margin-right: 20px;
`;

const DatePickerContainer = styled(View)`
  margin-top: 20px;
  margin-left: 25px;
`;

const Container = styled.SafeAreaView`
  display: flex;
  background-color: white;
  flex: 1;
`;

const MainContainer = styled.View`
  margin: 20px;
`;

const Headerimg = require("../assets/onBoarding/Header3.png");
const HeaderWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
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
  left: ${windowWidth * 0.85}px;
  top: ${windowHeight * 0.9}px;
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
  left: ${windowWidth * 0.72}px;
  top: ${windowHeight * 0.9}px;
  width: 40px;
  height: 40px;
`;
