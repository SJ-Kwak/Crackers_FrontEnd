import React, { useEffect, useRef } from "react";
import styled from "styled-components/native";
import Carousel from "react-native-carousel-control";
import Swiper from "react-native-swiper";
import { Display2 } from "../static/text.js";
import { asPickerFormat } from "../components/utils.js";
import { BUTTON_HEIGHT, VIEW_WIDTH } from "../components/values.js";
import TimePicker from "../components/TImePicker.js";
import { randomTxt } from "../components/randomTxt.js";
import { TextPretendard as Text } from "../static/CustomText.js";
import {
  Alert,
  StyleSheet,
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
  Dimensions,
  ImageBackground
} from "react-native";
import { useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Request } from "../api/request";
import { createStackNavigator } from "@react-navigation/stack";
import { getItemFromAsync } from "../api/storage.js";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const Stack = createStackNavigator();
const settingBtn = require("../assets/tch_btnSettings.png");
const { width, height } = Dimensions.get("window");
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const days = ["월", "화", "수", "목", "금", "토", "일"];
const categories = [
  "카페∙베이커리",
  "편의점",
  "레스토랑",
  "학원∙과외",
  "배달",
  "물류∙포장",
  "공연∙전시스탭",
  "기타",
];

const BACKGROUND_FETCH_TASK = 'background-fetch';
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 0.001, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export default function MainDemo({ navigation }) {
  const [start, setStart] = useState(false);
  const [adjBtn, setAdjBtn] = useState(true);
  const [charge, setCharge] = useState(0);
  const [startBtnTxt, setStartBtnTxt] = useState("시작하기");
  const [value, setValue] = useState(30);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [circlePo, setCirclePo] = useState(-50);
  const [circleTouched, setCircleTouched] = useState(false);
  const [mainColor, setMainColor] = useState("#6100FF");
  const [duringTime, setDuringTime] = useState(0); // 소요시간
  const [startTxt, setStartTxt] = useState("");
  const [workSpace, setWorkSpace] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [wage, setWage] = useState("");
  const [isTouched, setIsTouched] = useState(Array(days.length).fill(false));
  const [selectedDayIndex, setSelectedDayIndex] = useState([]);
  const [name, setName] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState(0);
  const [workSpaceId, setWorkSpaceId] = useState(0);
  const [time1, setTime1] = useState(null);
  const [time2, setTime2] = useState(null);

  const [afterCard, setAfterCard] = useState(false);
  const [nick, setNick] = useState(null);

  const request = new Request();

  const erase = require("../assets/tch_btnTxtX.png");
  const checked = require("../assets/tch_icnTxtCheck.png");
  const calender = require("../assets/icnCalendar.png");
  const job = require("../assets/icnCategory.png");
  const money = require("../assets/icnWage.png");
  const rightBtn = require("../assets/btnRight.png");

  const getUserInfo = async () => {
    const response = await request.get("/accounts/profile");
    if(response.status != 200) {
      navigation.navigate('JobNickname');
      return;   
    } else {
      setStartTxt(response.data.nickname + "님, \n오늘의 근무를 \n시작하세요");
      setNick(response.data.nickname);
    }
  };

  const getWorkSpace = async () => {
    const response = await request.get("/workspaces");
    if(response.status != 200){
      navigation.navigate('JobNickname')
      return;
    } else {
      setWorkSpace(response.data[0]);
      setDuringTime(
        (parseInt(response.data[0].schedules[0].endTime/100)-parseInt(response.data[0].schedules[0].startTime/100))*60
        + (parseInt(response.data[0].schedules[0].endTime%100)-parseInt(response.data[0].schedules[0].startTime%100))
      );
      let _schedule = response.data[0].schedules.map((schedule) => schedule.day);
      const defaultSelectedDays = days.reduce((acc, day, index) => {
        if (_schedule.includes(day)) {
          acc.push(index);
        }
        return acc;
      }, []);
      setSelectedDayIndex(defaultSelectedDays);
      setIsTouched(
        isTouched.map((value, index) =>
          defaultSelectedDays.includes(index) ? true : value
        )
      );
      setName(response.data[0].name);
      setSelectedBusiness(response.data[0].categoryId);
      setWage(response.data[0].wage);
      setSchedule(response.data[0].schedules);
      setTime1(
        asPickerFormat(
          new Date(
            2023,
            10,
            11,
            response.data[0].schedules[0].startTime / 100,
            response.data[0].schedules[0].startTime % 100,
            0
          )
        )
      );
      setTime2(
        asPickerFormat(
          new Date(
            2023,
            10,
            11,
            response.data[0].schedules[0].endTime / 100,
            response.data[0].schedules[0].endTime % 100,
            0
          )
        )
      );
    }
  };

  useFocusEffect(useCallback(() => {
    const checkLogin = async () => {
      if(await getItemFromAsync('accessToken')){
        getUserInfo();
        getWorkSpace();
      } else {
        navigation.replace('Home')
      }
    }
    checkLogin();
  }, [modalVisible]));

  const [workDt, setWorkDt] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const getTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}${minutes}`;
    setWorkDt(formattedDate);
    return formattedTime;
  };

  const convertTime = (time) => {
    const dateTimeString = time;
    const dateObject = new Date(dateTimeString);

    const hours = dateObject.getHours(); // 시간 추출
    const minutes = dateObject.getMinutes(); // 분 추출

    // 시간과 분을 두 자리 숫자로 포맷팅
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    // 시간 문자열 생성
    return formattedHours + formattedMinutes;
  };

  const convertToMinutes = (time) => {
    const hours = parseInt(time.slice(0, 2), 10);
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

  const [time, setTime] = useState(0);
  const [running1, setRunning1] = useState(false);
  const [running2, setRunning2] = useState(false);

  async function startBackground() {
    await registerBackgroundFetchAsync();
  }

  async function stopBackground() {
    await unregisterBackgroundFetchAsync();
  }

  useEffect(() => {
    startBackground();
    let interval;

    const steps = duringTime * 60; // duringTime에 60을 곱해 총 단계 수를 계산합니다.
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
        stopBackground();

        setMainColor("#FFAF15");
        setStartBtnTxt("카드받기");
        setStartTxt(" 오늘의 \n 알바 완료!");
        createWorkHistory();
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running1, running2, charge, duringTime]);

  useEffect(() => {
    startBackground();
    let interval;
    if (running2) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1000);
      }, 1000);
      if (time >= duringTime * 60 * 1000) {
        setRunning1(false);
        setRunning2(false);
        stopBackground();
        setMainColor("#FFAF15");
        setStartBtnTxt("카드받기");
        setStartTxt(" 오늘의 \n 알바 완료!");
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running1, running2, time, duringTime]);
  

  const scrollViewRef = useRef(null);

  const onPressDay = (index) => {
    const updatedIsTouched = [...isTouched];
    updatedIsTouched[index] = !updatedIsTouched[index];
    setIsTouched(updatedIsTouched);

    if (updatedIsTouched[index]) {
      setSelectedDayIndex([...selectedDayIndex, index]);
    } else {
      setSelectedDayIndex(
        selectedDayIndex.filter((selectedDay) => selectedDay !== index)
      );
    }
  };

  const daysList = days.map((day, index) => (
    <Days
      key={index}
      isTouched={isTouched[index]}
      onPress={() => onPressDay(index)}
    >
      <Text style={dayStyles(isTouched[index]).day}>{day}</Text>
    </Days>
  ));

  const [workHistoryId, setWorkHistoryId] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const createWorkHistory = async () => {
    // 시작 타임
    const startMinutes = convertToMinutes(startTime);
    const endMinutes = convertToMinutes(getTime());

    const _start = convertToMinutes(convertTime(time1).substr(0, 2).concat(convertTime(time1).substr(2, 2)))
    const _end = convertToMinutes(convertTime(time2).substr(0, 2).concat(convertTime(time2).substr(2, 2)))

    // 임금 계산
    const totalHours = (endMinutes - startMinutes) / 60;
    const _totalHours = (_end - _start) / 60;
    setTotalTime(totalHours !== _totalHours ? totalHours : _totalHours);
    const totalWage = totalHours * workSpace.wage;
    const _totalWage = _totalHours * workSpace.wage;
    const response = await request.post("/history", {
      workspaceId: workSpace.workspaceId,
      workDt: workDt,
      startTime: parseInt(startTime) !== parseInt(time1) ? parseInt(startTime) : parseInt(time1),
      endTime: parseInt(getTime()) !== parseInt(time2) ? parseInt(getTime()) : parseInt(time2),
      totalWage: totalWage <= _totalWage ? totalWage : _totalWage,
    });
    const response_get = await request.get("/history");
    setWorkHistoryId(
      response_get.data[response_get.data.length - 1].workHistoryId
    );
  };

  const showAlert = () => {
    Alert.alert(
      "퇴근하기\n",
      "오늘 근무를\n여기서 마칠까요?",
      [
        { text: "취소", onPress: () => {
          setRunning1(true);
          setRunning2(true);
        } },
        {
          text: "퇴근",
          onPress: () => {
            setMainColor("#FFAF15");
            setStartBtnTxt("카드받기");
            setStartTxt("오늘의 \n알바 완료!");
            // setEndTime(getTime());
            createWorkHistory();
          },
          color: "#6100FF",
        },
      ],
      { cancelable: false }
    );
  };

  const createCard = async () => {
    const response = await request.post("/card", {
      workHistoryId: workHistoryId,
      randNum: Math.floor(Math.random() * 9) + 1,
    });
    if (response.status === 200) {
      navigation.navigate("Card", { hours: totalTime });
      setAfterCard(true);
    }
  };

  const changeTxt = () => {
    setStartBtnTxt("퇴근하기");
    setStartTxt(randomTxt(selectedBusiness)._j);
  };

  const handleBusinessSelection = (business) => {
    setSelectedBusiness(categories.indexOf(business)+1);
  };

  const handleTime = async () => {
    if (selectedDayIndex.length > 0 && time1 && time2) {
      const newScheduleList = selectedDayIndex.map((day) => ({
        day: days[day],
        startTime: convertTime(time1).toString(),
        endTime: convertTime(time2).toString()
      }));
      // scheduleList와 newSchedule 배열 비교
      for (const newSched of newScheduleList) {
        let isMatch = false;

        for (const sched of workSpace.schedules) {
          if (
            newSched.day === sched.day &&
            newSched.startTime === sched.startTime.toString() &&
            newSched.endTime === sched.endTime.toString()
          ) {
            isMatch = true;
            break;
          }
        }

        if (!isMatch) {
          return newScheduleList;
        } else {
          return schedule;
        }
      }
    }
  };

  const [update, setUpdated] = useState(false);

  const handleSchedule = async () => {
    console.error(selectedBusiness);
    const response = await request.patch("/workspaces/update", {
      workspaceId: workSpace.workspaceId.toString(),
      name: (name !== workSpace.name ? name : workSpace.name).toString(),
      wage: (wage !== workSpace.wage ? wage : workSpace.wage).toString(),
      categoryId: selectedBusiness,
      scheduleList: await handleTime(),
    });
    if (response.status === 200) {
      closeModal();
    }
  };

  const CategoryItem = ({ item }) => {
    const category = categories.indexOf(item)+1;
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 0.17,
          borderColor: "lightgray",
        }}
        onPress={() => handleBusinessSelection(item)}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 300,
            marginBottom: 17,
            marginTop: 17,
            flex: 1,
          }}
        >
          {item}
        </Text>
        <View>
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 30,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              //paddingHorizontal: 10,
              borderColor:
                category === selectedBusiness ? "#6100FF" : "#D9D9D9",
            }}
            // onPress={() => handleBusinessSelection(item)}
          >
            <View
              style={{
                width: 9,
                height: 9,
                borderRadius: 30,
                backgroundColor:
                  category === selectedBusiness ? "#6100FF" : "white",
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const resetStatus = () => {
    setStart(false);  
    setAdjBtn(true);
    setCharge(0);
    setRunning1(false);
    setRunning2(false);

    setMainColor("#6100FF");
    setStartBtnTxt("시작하기");
    setStartTxt(nick + "님, \n오늘의 근무를 \n시작하세요");

    setTime(0);
    setAfterCard(true);
  }


  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  return (
    <View style={styles.container}>
      <AlbaFrame>
        <Text>{workSpace.name}</Text>
      </AlbaFrame>
      <Text style={styles.start}>{startTxt}</Text>
      <TouchableOpacity
        style={[
          styles.circle2,
          { left: circlePo, borderColor: mainColor },
        ]}
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
      <ImageBackground source={require('../assets/BlurCircle.png')} style={styles.circle1} imageStyle={{borderRadius: 280, backfaceVisibility: 'visible'}} blurRadius={60}>
        {circlePo == -50 ?  
        (
          <View>
          <Text
            style={{
              height: 33,
              //left: 82,
              top: 130,
              fontWeight: 500,
              fontSize: 28,
              alignSelf: "center",
            }}
            //disabled={circleTouched}
          >
            {(((time/3600000)%60) * workSpace.wage).toFixed(0) + "원"}
          </Text>
            <Text
              style={{
                color: "#B5B5B5",
                height: 33,
                //left: 82,
                top: 180,
                fontWeight: 500,
                fontSize: 14,
                alignSelf: "center",
              }}
              //disabled={circleTouched}
            >
              {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}시
              {("0" + Math.floor((time / 60000) % 60)).slice(-2)}분
              {("0" + Math.floor((time / 1000) % 60)).slice(-2)}초
            </Text>
            </View>
        )
        : (
          <View>
          <Text
            style={{
              height: 33,
              //left: 82,
              top: 130,
              fontWeight: 500,
              fontSize: 28,
              alignSelf: "center",
            }}
            //disabled={circleTouched}
          >
              {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}시
              {("0" + Math.floor((time / 60000) % 60)).slice(-2)}분
              {("0" + Math.floor((time / 1000) % 60)).slice(-2)}초            
            </Text>
            <Text
              style={{
                color: "#B5B5B5",
                height: 33,
                //left: 82,
                top: 180,
                fontWeight: 500,
                fontSize: 14,
                alignSelf: "center",
              }}
              //disabled={circleTouched}
            >
            {(((time/3600000)%60) * workSpace.wage).toFixed(0) + "원"}
            </Text>
            </View>
        )}
      </ImageBackground>
      <AdjustBtn
        style={{
          backgroundColor: "white",
          borderColor: !adjBtn ? "transparent" : mainColor,
          borderWidth: 1,
          //flex: 1,
          //justifyContent: "flex-end",
        }}
        //onPress={()=>{setStart(true)}}
        onPress={() => {
          setModalVisible(true);
        }}
        disabled={!adjBtn}
      >
        <Text
          style={{
            color: !adjBtn ? "white" : "#858585",
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
        }}
        onPress={() => {
          startBtnTxt == "시작하기" ? setRunning1(true) : setRunning1(false);
          startBtnTxt == "시작하기" ? setRunning2(true) : setRunning2(false);
          startBtnTxt == "시작하기" && setStartTime(getTime());
          startBtnTxt == "시작하기" && changeTxt();
          setStart(true);
          setAdjBtn(false);
          startBtnTxt == "퇴근하기" && showAlert();
          startBtnTxt == "카드받기" && createCard();
          startBtnTxt == "카드받기" && afterCard==false && resetStatus();
        }}
      >
        <Text style={styles.submit}>{startBtnTxt}</Text>
      </StartBtn>
      <SettingBtn
        onPress={() => {
          navigation.navigate("Setting");
        }}
      >
        <Image source={settingBtn} style={{width: 40, height: 40}} />
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
                  width: "100%",
                  height: "80%",
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 20,
                    padding: 15,
                  }}
                >
                  <TouchableOpacity style={{flex: 1}} onPressOut={closeModal}>
                    <Image source={erase} />
                  </TouchableOpacity>
                  <TouchableOpacity onPressOut={handleSchedule}>
                    <Image
                      style={{ width: 25, height: 25 }}
                      source={checked}
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={{
                    fontSize: 24,
                    marginLeft: 20,
                    fontWeight: "600",
                    marginBottom: 20,
                    fontFamily: 'Pretendard'
                  }}
                  value={name}
                  onChangeText={setName}
                />
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#f5f5f5",
                    width: width,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 15,
                  }}
                >
                  <Image
                    source={calender}
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 3,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    일정
                  </Text>
                </View>
                <DayListContainer>{daysList}</DayListContainer>
                <TimePick>
                  {selectedDayIndex.length > 0 && (
                    <Text style={{ top: 10, color: "#858585" }}>시작</Text>
                  )}
                  {selectedDayIndex.length > 0 && (
                    <DatePickerContainer>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#f5f5f5",
                          height: 40,
                          width: 90,
                          borderRadius: 8,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => setStartOpen(true)}
                      >
                        <Text style={{ color: "#1C1C1C" }}>
                          {convertTime(time1).substr(0, 2)}:
                          {convertTime(time1).substr(2, 2)}
                        </Text>
                      </TouchableOpacity>
                      <Modal
                        transparent={true}
                        visible={startOpen}
                        animationType="slide"
                        onRequestClose={() => setStartOpen(false)}
                      >
                        <View
                          style={{
                            backgroundColor: "white",
                            position: "absolute",
                            top: height * 0.5,
                            left: (width - VIEW_WIDTH) / 2,
                            width: VIEW_WIDTH,
                          }}
                        >
                          <TimePicker
                            value={time1}
                            onChange={setTime1}
                            width={VIEW_WIDTH}
                            buttonHeight={BUTTON_HEIGHT}
                            visibleCount={3}
                          />
                          <View style={{ flexDirection: "row" }}>
                            <Pressable
                              style={{
                                width: "50%",
                                borderWidth: 1,
                                borderColor: "black",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingVertical: 10,
                              }}
                              onPress={() => setStartOpen(false)}
                            >
                              <Text>취소</Text>
                            </Pressable>
                            <Pressable
                              style={{
                                width: "50%",
                                borderWidth: 1,
                                borderColor: "black",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingVertical: 10,
                              }}
                              onPress={() => {
                                setStartOpen(false);
                              }}
                            >
                              <Text>확인</Text>
                            </Pressable>
                          </View>
                        </View>
                      </Modal>
                    </DatePickerContainer>
                  )}
                  <View
                    style={{
                      width: 10,
                      marginHorizontal: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      height: 40,
                      marginTop: 20,
                    }}
                  >
                    <Text style={{ color: "#858585" }}>~</Text>
                  </View>
                  {selectedDayIndex.length > 0 && (
                    <Text style={{ top: 10, color: "#858585" }}>종료</Text>
                  )}
                  {selectedDayIndex.length > 0 && (
                    <DatePickerContainer>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#f5f5f5",
                          height: 40,
                          width: 90,
                          borderRadius: 8,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => setEndOpen(true)}
                      >
                        <Text style={{ color: "#1C1C1C" }}>
                          {convertTime(time2).substr(0, 2)}:
                          {convertTime(time2).substr(2, 2)}
                        </Text>
                      </TouchableOpacity>
                      <Modal
                        transparent={true}
                        visible={endOpen}
                        animationType="slide"
                        onRequestClose={() => setEndOpen(false)}
                      >
                        <View
                          style={{
                            backgroundColor: "white",
                            position: "absolute",
                            top: height * 0.5,
                            left: (width - VIEW_WIDTH) / 2,
                            width: VIEW_WIDTH,
                          }}
                        >
                          <TimePicker
                            value={time2}
                            onChange={setTime2}
                            width={VIEW_WIDTH}
                            buttonHeight={BUTTON_HEIGHT}
                            visibleCount={3}
                          />
                          <View style={{ flexDirection: "row" }}>
                            <Pressable
                              style={{
                                width: "50%",
                                borderWidth: 1,
                                borderColor: "black",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingVertical: 10,
                              }}
                              onPress={() => setEndOpen(false)}
                            >
                              <Text>취소</Text>
                            </Pressable>
                            <Pressable
                              style={{
                                width: "50%",
                                borderWidth: 1,
                                borderColor: "black",
                                justifyContent: "center",
                                alignItems: "center",
                                paddingVertical: 10,
                              }}
                              onPress={() => {
                                setEndOpen(false);
                              }}
                            >
                              <Text>확인</Text>
                            </Pressable>
                          </View>
                        </View>
                      </Modal>
                    </DatePickerContainer>
                  )}
                </TimePick>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#f5f5f5",
                    width: width,
                    marginTop: 20,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 15,
                    height: 55,
                    borderColor: "#f5f5f5",
                  }}
                >
                  <Image
                    source={job}
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 3,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    업종
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "gray",
                      marginLeft: 10,
                      flex: 1,
                    }}
                  >
                    {categories[selectedBusiness-1]}
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
                    borderBottomWidth: 1,
                    borderBottomColor: "#f5f5f5",
                    width: width,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    height: 55,
                    paddingHorizontal: 15,
                  }}
                >
                  <Image
                    source={money}
                    style={{
                      width: 20,
                      height: 20,
                      marginTop: 3,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    시급
                  </Text>
                  <TextInput
                    style={{
                      fontSize: 16,
                      color: "gray",
                      marginLeft: 10,
                      fontFamily: 'Pretendard'
                    }}
                    value={wage.toString()}
                    onChangeText={setWage}
                  />
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#f5f5f5",
                    width: width,
                  }}
                />
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
                    width: width,
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
                  <FlatList
                    data={categories}
                    renderItem={({ item }) => {
                      return <CategoryItem item={item} />;
                    }}
                  />
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
    position: "absolute",
    width: 288,
    height: 288,
    borderRadius: 288,
    top: windowHeight * 0.29,
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 1,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    // shadowRadius: 7,
    elevation: 5,
    // backgroundColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    // backgroundColor: 'rgba(255, 255, 255)'
    borderColor: "#F5F5F5",
    borderWidth: 1
    
  },
  circle2: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 260 / 2,
    borderWidth: 1,
    overflow: "hidden",
    position: "absolute",
    //left: -81,
    //left: circlePo,
    top: windowHeight * 0.31,
    //bottom: 320,
  },
  circleFill1: {
    bottom: 0,
    position: "absolute",
    opacity: 0.5
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
  start: {
    position: "absolute",
    width: '100%',
    height: 108,
    left: '5%',
    top: windowHeight * 0.13,
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 36
  },
  submit: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
});

const dayStyles = (isTouched) => StyleSheet.create({
  day: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16.71,
    color: isTouched ? 'white' : 'black'
  }
})

const AlbaFrame = styled.View`
  position: absolute;
  height: 38px;
  top: ${windowHeight * 0.05}px;
  border: 1px solid #b0b0b0;
  border-radius: 30px;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  justify-content: center;
`;

const StartBtn = styled.TouchableOpacity`
  position: absolute;
  background-color: #6100ff;
  width: 290px;
  height: 52px;
  //top: 15%;
  bottom: ${windowHeight * 0.025}px;
  padding: 10px;
  border-radius: 100px;
  justify-content: center;
`;
const AdjustBtn = styled.TouchableOpacity`
  position: absolute;
  width: 290px;
  height: 52px;
  bottom: ${windowHeight * 0.115}px;
  padding: 10px;
  border-radius: 100px;
  justify-content: center;
`;

const SettingBtn = styled.TouchableOpacity`
  position: absolute;
  top: ${windowHeight * 0.05}px;
  right: 10px;
  width: 40px;
  height: 40px;
  align-self: flex-end;
`;

const Days = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;
  border-radius: 180px;

  background-color: ${(props) => (props.isTouched ? "#6100FF" : "#f5f5f5")};
`;

const DayListContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
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
  justify-content: center;
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
  align-content: center;
`;
