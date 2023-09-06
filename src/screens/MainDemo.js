import React from "react-native";
import { useEffect, useRef } from "react";
import styled from "styled-components/native";
import Carousel from "react-native-carousel-control";
import LiquidProgress from "react-native-liquid-progress";
import Swiper from "react-native-swiper";
import { Display2 } from "../static/text.js";
import DatePicker from "react-native-datepicker";

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Button,
  SafeAreaView,
  Pressable,
  FlatList,
  TouchableOpacity,
  Animated,
  ScrollView,
  Modal,
} from "react-native";
import { useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Request } from "../api/request";
import { createStackNavigator } from "@react-navigation/stack";
import { getItemFromAsync } from "../api/storage.js";

const Stack = createStackNavigator();
const settingBtn = require("../assets/tch_btnSettings.png");

const days = ["월", "화", "수", "목", "금", "토", "일"];
const categories = ['카페∙베이커리', '편의점', '레스토랑', '학원∙과외', '배달', '물류∙포장', '공연∙전시스탭', '기타']

export default function MainDemo({ navigation }) {
  const [start, setStart] = useState(false);
  const [charge, setCharge] = useState(0);
  const [startBtnTxt, setStartBtnTxt] = useState("시작하기");
  const [value, setValue] = useState(30);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [circlePo, setCirclePo] = useState(-50);
  const [circleTouched, setCircleTouched] = useState(false);
  const [mainColor, setMainColor] = useState("#6100FF");
  const [duringTime, setDuringTime] = useState(10);
  const [startTxt, setStartTxt] = useState("");
  const [workSpace, setWorkSpace] = useState([])
  const [schedule, setSchedule] = useState([])
  // const [isTouched, setIsTouched] = useState([])
  const [selectedTime1, setSelectedTime1] = useState('');
  const [selectedTime2, setSelectedTime2] = useState('');
  const [wage, setWage] = useState('')
  const [isTouched, setIsTouched] = useState(Array(days.length).fill(false));
  const [selectedDayIndex, setSelectedDayIndex] = useState([]);
  const [name, setName] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState(0);
  const [workSpaceId, setWorkSpaceId] = useState(0);

  const request = new Request();

  const erase = require("../assets/tch_btnTxtX.png");
  const checked = require("../assets/tch_icnTxtCheck.png");
  const calender = require("../assets/icnCalendar.png");
  const job = require("../assets/icnCategory.png");
  const money = require("../assets/icnWage.png");
  const rightBtn = require("../assets/btnRight.png");

  const getUserInfo = async () => {
    const response = await request.get('/accounts/profile')
    setStartTxt(response.data.nickname + '님, \n오늘의 근무를 \n시작하세요')
  }

  const getWorkSpace = async () => {
    const response = await request.get('/workspaces');
    setWorkSpace(response.data[0])
    let _schedule = response.data[0].schedules.map(schedule => schedule.day)
    const defaultSelectedDays = days.reduce((acc, day, index) => {
      if (_schedule.includes(day)) {
        acc.push(index);
      }
      return acc;
    }, []);
    setSelectedDayIndex(defaultSelectedDays);
    setIsTouched(isTouched.map((value, index) =>
      defaultSelectedDays.includes(index) ? true : value
    ));
    setName(response.data[0].name)
    setSelectedBusiness(response.data[0].categoryId)
    setSelectedTime1(response.data[0].schedules[0].startTime)
    setSelectedTime2(response.data[0].schedules[0].endTime)
    setWage(response.data[0].wage)
    setSchedule(response.data[0].schedules)
  }

  useEffect(() => {
    getUserInfo(); 
    getWorkSpace();
  }, [modalVisible])

  const [workDt, setWorkDt] = useState('')
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const getTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}${minutes}`;
    setWorkDt(formattedDate);
    return formattedTime;
  }

  const convertToMinutes = (time) => {
    const hours = parseInt(time.slice(0,2), 10);
    const minutes = parseInt(time.slice(2), 10);
    return hours * 60 + minutes;
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeModal2 = () => {
    setModalVisible2(false);
  };

  const [modalTrigger, setModalTrigger] = useState(false);

  const [time, setTime] = useState(0);
  const [running1, setRunning1] = useState(false);
  const [running2, setRunning2] = useState(false);

  const updatePercentage = () => {
    setTimeout(() => {
      setCharge(charge + 1);
    }, 5);
  };

  useEffect(() => {
    //if (running) updatePercentage()
    let interval;

    const steps = duringTime * 60 - 1; // duringTime에 60을 곱해 총 단계 수를 계산합니다.
    const stepSize = 260 / steps; // 각 단계별 증가량을 계산합니다.

    if (running1) {
      interval = setInterval(() => {
        setCharge((charge) => {
          const updatedCharge = charge + stepSize;
          return updatedCharge >= 260 ? 260 : updatedCharge; // charge가 260보다 크면 260으로 설정하여 꽉 찬 상태로 유지합니다.
        });
      }, 1000); // 타이머가 duringTime에 맞춰 charge를 채우도록 설정

      if (charge >= 260) {
        setRunning1(false);
        setRunning2(false);

        setMainColor("#FFAF15");
        setStartBtnTxt("카드받기");
        setStartTxt("오늘의 \n알바 완료!");
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running1, running2, charge, duringTime]);

  useEffect(() => {
    let interval;
    if (running2) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
      if (time >= duringTime * 60 * 1000) {
        setRunning1(false);
        setRunning2(false);
        setMainColor("#FFAF15");
        setStartBtnTxt("카드받기");
        setStartTxt("오늘의 \n알바 완료!");
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running1, running2, time, duringTime]);

  const handleScroll = (event) => {
    const { x, y } = event.nativeEvent.contentOffset;
    console.log(event.nativeEvent.contentOffset.x);
    setScrollPosition({ x, y });
  };

  const scrollViewRef = useRef(null);

  const scrollToRight = () => {
    // ScrollView를 맨 위로 스크롤합니다.
    scrollViewRef.current.scrollTo({ x: -300, animated: true });
  };

  const scrollToLeft = () => {
    // ScrollView를 맨 아래로 스크롤합니다.
    scrollViewRef.current.scrollTo({ x: -15, animated: true });
  };

  const onPressDay = (index) => {
    const updatedIsTouched = [...isTouched];
    updatedIsTouched[index] = !updatedIsTouched[index];
    setIsTouched(updatedIsTouched);
  
    if (updatedIsTouched[index]) {
      setSelectedDayIndex([...selectedDayIndex, index]);
    } else {
      setSelectedDayIndex(selectedDayIndex.filter((selectedDay) => selectedDay !== index));
    }
  };
  

  const onTimeChange1 = (time) => {
    setSelectedTime1(time);
  };

  const onTimeChange2 = (time) => {
    setSelectedTime2(time);
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
  // const daysList = days.map((day, index) => (
  //   <Days
  //     key={index}
  //     isSelected={selectedDayIndex.includes(index)}
  //     onPress={() => onPressDay(index)}
  //   >
  //     <DayContainer isSelected={selectedDayIndex.includes(index)}>{day}</DayContainer>
  //   </Days>
  // ));

  const [workHistoryId, setWorkHistoryId] = useState(0);
  const createWorkHistory = async () => {

    const startMinutes = convertToMinutes(startTime);
    const endMinutes = convertToMinutes(getTime());

    // 임금 계산
    const totalHours = (endMinutes - startMinutes) / 60;
    const totalWage = totalHours * workSpace.wage;
    const data = {
      workspaceId: workSpace.workspaceId,
      workDt: workDt,
      startTime: parseInt(startTime),
      endTime: parseInt(getTime()),
      totalWage: parseInt(totalWage)
    }
    const response = await request.post('/history', {
      workspaceId: workSpace.workspaceId,
      workDt: workDt,
      startTime: parseInt(startTime),
      endTime: parseInt(getTime()),
      totalWage: parseInt(totalWage)
    })
    const response_get = await request.get('/history')
    setWorkHistoryId(response_get.data[response_get.data.length-1].workHistoryId)
  }

  const showAlert = () => {
    // setEndTime(getTime())
    Alert.alert(
      "퇴근하기\n",
      "오늘 근무를\n 여기서 마칠까요?",
      [
        { text: "취소", onPress: () => console.log("cnlth") },
        {
          text: "퇴근",
          onPress: () => {
            setMainColor("#FFAF15");
            setStartBtnTxt("카드받기");
            setStartTxt("오늘의 \n알바 완료!");
            createWorkHistory();
          },
          color: "#6100FF",
        },
      ],
      { cancelable: false }
    );
  };

  const createCard = async () => {
    const response = await request.post('/card', {
      workHistoryId: workHistoryId,
      randNum: Math.floor(Math.random() * 9) + 1
    })
    if(response.status === 200) {
      navigation.navigate('Card')
    }
  }

  const changeTxt = () => {
    setStartBtnTxt("퇴근하기");
    setStartTxt("오늘 \n하루도 \n화이팅!");
  };


  const handleBusinessSelection = (business) => {
    setSelectedBusiness(categories.indexOf(business))
  };

  const handleTime = async () => {
    if (selectedDayIndex.length > 0 && selectedTime1 && selectedTime2) {
      console.log(selectedDayIndex)
      const newScheduleList = selectedDayIndex.map((day) => ({
        day: days[day],
        startTime: selectedTime1.replace(":", ""),
        endTime: selectedTime2.replace(":", ""),
      }));
      // scheduleList와 newSchedule 배열 비교
      for (const newSched of newScheduleList) {
        let isMatch = false;

        for (const sched of workSpace.schedules) {
          if (
            newSched.day === sched.day &&
            newSched.startTime === sched.startTime &&
            newSched.endTime === sched.endTime
          ) {
            isMatch = true;
            break;
          }
        }

        if (!isMatch) {
          setSchedule(newScheduleList)
        }
      }
    }
  };

  const [update, setUpdated] = useState(false)

  const handleSchedule = async () => {
    await handleTime();
    const response = await request.patch('/workspaces/update', {
      workspaceId: (workSpace.workspaceId).toString(),
      name: (name !== workSpace.name ? name : workSpace.name).toString(),
      wage: (wage !== workSpace.wage ? wage : workSpace.wage).toString(),
      categoryId: (selectedBusiness !== workSpace.categoryId ? selectedBusiness : workSpace.categoryId).toString(),
      scheduleList: schedule
    })
    if(response.status === 200 ){
      closeModal();
    }
  }

  const CategoryItem = ({item}) => {
    const category = categories.indexOf(item)
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 0.17,
          borderColor: "lightgray",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 300,
            marginBottom: 17,
            marginTop: 17,
            flex: 1
          }}
        >
          {item}
        </Text>
        <View>
          <TouchableOpacity
            style={{
              width: 18,
              height: 18,
              borderRadius: 30,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              //paddingHorizontal: 10,
              borderColor:
                category === selectedBusiness
                  ? "#6100FF"
                  : "#D9D9D9",
            }}
            onPress={() => handleBusinessSelection(item)}
          >
            <View
              style={{
                width: 9,
                height: 9,
                borderRadius: 30,
                backgroundColor:
                  category === selectedBusiness
                    ? "#6100FF"
                    : "white",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <AlbaFrame>
        <Text>{workSpace.name}</Text>
      </AlbaFrame>
      <StartTxt>{startTxt}</StartTxt>
      <TouchableOpacity
        style={[styles.circle2, { left: circlePo, borderColor: mainColor, top: "35%" }]}
        //onPress={()=>{scrollPosition.x>-100 ? scrollToRight : scrollToLeft}}
        onPress={() => {
          circlePo == -50 ? setCirclePo(200) : setCirclePo(-50);
          setCircleTouched(true);
        }}
      >
        <View
          style={[
            styles.circleFill2,
            { height: charge, backgroundColor: mainColor },
          ]}
        />
      </TouchableOpacity>
      <View style={styles.circle1}>
        <View style={[styles.circleFill1, { height: "100%" }]} />

        {circlePo == -50 ? (
          <Text
            style={{
              position: "absolute",
              //width: 109,
              height: 33,
              //left: 82,
              top: 130,
              fontWeight: 500,
              fontSize: 28,
              alignSelf: "center",
            }}
            //disabled={circleTouched}
          >
            {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:
            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
          </Text>
        ) : (
          <Text
            style={{
              position: "absolute",
              //width: 109,
              height: 33,
              //left: 87,
              top: 130,
              fontWeight: 500,
              fontSize: 28,
              alignSelf: "center",
            }}
            //disabled={circleTouched}
          >
            {("0" + Math.floor((time / 60000) % 60)) * 160.167 + "원"}
          </Text>
        )}
      </View>
      <AdjustBtn
        style={{
          backgroundColor: "white",
          borderColor: !start ? "white" : mainColor,
          borderWidth: 1,
          //flex: 1,
          //justifyContent: "flex-end",
        }}
        //onPress={()=>{setStart(true)}}
        onPress={() => {
          setModalVisible(true);
        }}
        disabled={!start}
      >
        <Text
          style={{
            color: !start ? "white" : "#858585",
            textAlign: "center",
            fontSize: 16,
            fontWeight: 400,
          }}
        >
          일정조정
        </Text>
      </AdjustBtn>
      <StartBtn
        style={{
          backgroundColor: mainColor,
          //flex: 1,
          //justifyContent: "flex-end",
        }}
        onPress={() => {
          startBtnTxt == "시작하기" ? setRunning1(true) : setRunning1(false);
          startBtnTxt == "시작하기" ? setRunning2(true) : setRunning2(false);
          startBtnTxt == "시작하기" && setStartTime(getTime())
          startBtnTxt == "시작하기" && changeTxt();
          setStart(true)
          startBtnTxt == "퇴근하기" && setEndTime(getTime())
          startBtnTxt == "퇴근하기" && showAlert();
          startBtnTxt == "카드받기" && createCard();

          //Alert.alert(scrollPosition)
          //setRunning(true)
        }}
        //disabled={startBtnTxt=="퇴근하기"}
      >
        <SubmitTxt>{startBtnTxt}</SubmitTxt>
      </StartBtn>
      <SettingBtn
        onPress={() => {
          navigation.navigate("Setting");
        }}
      >
        <Image source={settingBtn} />
      </SettingBtn>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View
          style={styles.modalContainer}
          // onPressOut={closeModal}
        >
          <View style={styles.modalContainer}>
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 15,
                  width: 390,
                  height: 700,
                  borderRadius: 10,
                }}
              >
                <View style={{ flexDirection: "row", marginBottom: 20 }}>
                  <TouchableOpacity onPressOut={closeModal}>
                    <Image source={erase} />
                  </TouchableOpacity>
                  <TouchableOpacity onPressOut={handleSchedule}>
                    <Image
                      style={{ width: 25, height: 25, marginLeft: 310 }}
                      source={checked}
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={{
                    fontSize: 24,
                    marginLeft: 20,
                    fontWeight: '600',
                    marginBottom: 20,
                  }}
                  value={name}
                  onChangeText={setName}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderTopWidth: 0.17,
                    borderBottomWidth: 0.17,
                    borderColor: "lightgray",
                  }}
                >
                  <Image
                    source={calender}
                    style={{
                      width: 20,
                      height: 20,
                      marginBottom: 17,
                      marginTop: 17,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      marginBottom: 17,
                      marginTop: 17,
                    }}
                  >
                    일정
                  </Text>
                </View>
                <DayListContainer>{daysList}</DayListContainer>
                <TimePick>
                  <Text disabled={!isTouched} style={{ top: 10 }}>
                    시작
                  </Text>
                  {selectedDayIndex.length > 0 && (
                    <DatePickerContainer>
                      <DatePicker
                        style={{ width: 90 }}
                        date={selectedTime1 || "9:30"}
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
                            height: 40,
                            borderRadius: 10,
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
                        showTime={true}
                      />
                    </DatePickerContainer>
                  )}
                  <View style={{ width: 10 }} />
                  <Text style={{ top: 10 }}>종료</Text>
                  {selectedDayIndex.length > 0 && (
                    <DatePickerContainer>
                      <DatePicker
                        style={{ width: 90 }}
                        date={selectedTime2 || "15:00"}
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
                            borderRadius: 10,
                            height: 40,
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
                        showTime={true}
                      />
                    </DatePickerContainer>
                  )}
                </TimePick>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 30,
                    borderTopWidth: 0.17,
                    borderBottomWidth: 0.17,
                    borderColor: "lightgray",
                  }}
                >
                  <Image
                    source={job}
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 17,
                      marginBottom: 17,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      marginTop: 17,
                      marginBottom: 17,
                    }}
                  >
                    업종
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "gray",
                      marginLeft: 10,
                      marginTop: 17,
                      marginBottom: 17,
                      flex: 1
                    }}
                  >
                    {categories[selectedBusiness]}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible2(true);
                    }}
                  >
                    <Image
                      style={{ width: 13, height: 13, marginRight: 5 }}
                      source={rightBtn}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 0.17,
                    borderColor: "lightgray",
                  }}
                >
                  <Image
                    source={money}
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 17,
                      marginBottom: 17,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      marginTop: 17,
                      marginBottom: 17,
                    }}
                  >
                    시급
                  </Text>
                  <TextInput
                    style={{
                      fontSize: 16,
                      color: "gray",
                      marginLeft: 10,
                      marginTop: 17,
                      marginBottom: 17,
                    }}
                    value={wage.toString()}
                    onChangeText={setWage}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={closeModal2}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={0.1}
            onPressOut={closeModal2}
          >
            <View style={styles.modalContainer}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 15,
                    width: 390,
                    height: 520,
                    borderRadius: 10,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      borderBottomWidth: 0.17,
                      borderColor: "lightgray",
                      marginTop: -1,
                    }}
                  >
                    <View
                      style={{ width: 30, height: 1, backgroundColor: "gray" }}
                    />
                    <Text
                      style={{
                        color: "#858585",
                        fontSize: 12,
                        fontWeight: 300,
                        marginBottom: 17,
                        marginTop: 20,
                      }}
                    >
                      알바 업종 리스트
                    </Text>
                  </View>
                  <FlatList data={categories} renderItem={({item}) => { return (
                    <CategoryItem item={item} />
                  )}} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  row: {
    alignSelf: "center",
    flexDirection: "row",
    height: 70,
  },
  scrollViewContent: {
    //alignItems: 'center',
    justifyContent: "center",
    flexDirection: "row", // 가로 방향으로 정렬
  },
  circle1: {
    width: 288,
    height: 288,
    borderRadius: 288 / 2,
    //borderWidth: 2,
    //borderColor: "#000000",
    //overflow: "hidden",
    //position: "absolute",
    //left: -200,s
    //top: 278,
    //bottom: 278,
    //shadowOffset: { width: 1, height: 1 },
    //shadowOpacity: 1,
    //shadowColor: "#BDBDBD",
    //shadowRadius: 7,
    //elevation: 5,
    backgroundColor: "white",
  },
  circle2: {
    width: 260,
    height: 260,
    borderRadius: 260 / 2,
    borderWidth: 1,
    overflow: "hidden",
    position: "absolute",
    //left: -81,
    //left: circlePo,
    //top: 292,
    //bottom: 320,
  },
  circle3: {
    width: 260,
    height: 260,
    borderRadius: 260 / 2,
    borderWidth: 1,
    borderColor: "#8A15FF",
    overflow: "hidden",
    position: "absolute",
    //left: -81,
    //top: 292,
    //bottom: 292,
  },
  circleFill1: {
    //backgroundColor: "white",
    width: "100%",
    bottom: 0,
    position: "absolute",
  },
  circleFill2: {
    width: "100%",
    bottom: 0,
    position: "absolute",
  },
  row: {
    alignSelf: "center",
    flexDirection: "row",
    height: 70,
  },
  text: {
    color: "white",
    fontSize: 47,
  },
  buttonLayer: { flex: 0.25, flexDirection: "row" },
  button: {
    width: 100,
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 30,
    elevation: 10,
  },
  buttonText: { fontSize: 15, color: "white" },
  title: { fontSize: 40, flex: 0.5, color: "gray" },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // 흐린 회색 배경
    justifyContent: "center",
    alignItems: "center",
  },
});

const AlbaFrame = styled.View`
  position: absolute;
  // width: fit-content;
  height: 38px;
  top: 78px;
  //background: #FFFFFF;
  border: 1px solid #b0b0b0;
  border-radius: 30px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
`;

const AlbaTxt = styled.Text`
  position: absolute;
  //width: 42px;
  //height: 19px;
  //top: 88px;
  //font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  //display: flex;
  //align-items: center;
  //text-align: center;
  color: #1c1c1c;
`;
const StartTxt = styled.Text`
  position: absolute;
  //width: 131px;
  height: 108px;
  left: 20px;
  top: 148px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
`;
const StartBtn = styled.TouchableOpacity`
  background-color: #6100ff;
  position: absolute;
  width: 290;
  height: 52;
  top: 88%;
  padding: 10px;
  border-radius: 100;
  justify-content: center;
`;
const AdjustBtn = styled.TouchableOpacity`
  //background-color: #395B64;
  position: absolute;
  width: 290;
  height: 52;
  top: 80%;
  padding: 10px;
  border-radius: 100;
  justify-content: center;
`;
const SubmitTxt = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 16;
  font-weight: 400;
`;
const SettingBtn = styled.TouchableOpacity`
  position: absolute;
  width: 40px;
  height: 40px;
  //left: 340px;
  right: 10px;
  top: 50px;
`;

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
  margin-top: 30px;
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
  align-content: center;
`;
