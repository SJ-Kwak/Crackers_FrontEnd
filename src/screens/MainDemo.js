import React from "react-native";
import { useEffect, useRef } from 'react';
import styled from "styled-components/native";
import Carousel from "react-native-carousel-control";
import LiquidProgress from "react-native-liquid-progress";
import Swiper from 'react-native-swiper';
import { Display2 } from "/Users/geunhye/crackersDEMO/crackers/src/static/text.js";
import DatePicker from "react-native-datepicker";

import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  SafeAreaView,
  Pressable,
  FlatList,
  TouchableOpacity,
  Animated,
  ScrollView,
  Modal
} from "react-native";
import { useState } from "react";
//import { ScrollView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const settingBtn=require("/Users/geunhye/crackersDEMO/crackers/src/assets/tch_btnSettings.png");

const days = ["월", "화", "수", "목", "금", "토", "일"];


export default function MainDemo({navigation}){

    const [start, setStart] = useState(false);
    const [charge, setCharge] = useState(0);
    const [startBtnTxt, setStartBtnTxt] = useState("시작하기");
    const [value, setValue] = useState(30);
    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
    const [circlePo, setCirclePo]=useState(-50);
    const [circleTouched, setCircleTouched]=useState(false);
    const [mainColor, setMainColor]=useState("#6100FF");
    const [jobNick, setJobNick]=useState("");
    const [duringTime, setDuringTime]=useState(10);
    const [userName, setUserName]=useState("로키");
    const [startTxt, setStartTxt] = useState(userName+"님, \n오늘의 근무를 \n시작하세요");


    const erase=require("/Users/geunhye/crackersDEMO/crackers/src/assets/tch_btnTxtX.png");
    const checked=require("/Users/geunhye/crackersDEMO/crackers/src/assets/tch_icnTxtCheck.png");
    const calender=require("/Users/geunhye/crackersDEMO/crackers/src/assets/icnCalendar.png");
    const job=require("/Users/geunhye/crackersDEMO/crackers/src/assets/icnCategory.png");
    const money=require("/Users/geunhye/crackersDEMO/crackers/src/assets/icnWage.png");
    const rightBtn=require("/Users/geunhye/crackersDEMO/crackers/src/assets/btnRight.png");
    
    useEffect(() => {
  
    const loadUserData = async () => {

      try {
          const storedUser = await AsyncStorage.getItem('user');
          const user = JSON.parse(storedUser);
      
          if(user!=null){
            setJobNick(user.jobNickname);
            setDuringTime(user.timeGap);
          }
        } catch (error) {
          console.log('Error retrieving data: ', error);
        }
      };
      
      loadUserData();
      
    }, []);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);

    const closeModal = () => {
      setModalVisible(false);
    };

    const closeModal2 = () => {
        setModalVisible2(false);
      };

    const [modalTrigger, setModalTrigger] =  useState(false);

    const [time, setTime]=useState(0);
    const [running1,setRunning1]=useState(false);
    const [running2,setRunning2]=useState(false);

    const updatePercentage = () => {
        setTimeout(() => {
          setCharge(charge + 1)
        }, 5)
      }

    useEffect(() => {
        //if (running) updatePercentage()
        let interval;

        const steps = duringTime * 60 -1; // duringTime에 60을 곱해 총 단계 수를 계산합니다.
        const stepSize = 260 / steps; // 각 단계별 증가량을 계산합니다.

        if(running1){
            interval=setInterval(() => {
                setCharge((charge)=>{
                  const updatedCharge = charge + stepSize;
                  return updatedCharge >= 260 ? 260 : updatedCharge; // charge가 260보다 크면 260으로 설정하여 꽉 찬 상태로 유지합니다.
                });
              }, 1000); // 타이머가 duringTime에 맞춰 charge를 채우도록 설정
  
            if(charge>=260){
              setRunning1(false);
              setRunning2(false);

              setMainColor("#FFAF15");
              setStartBtnTxt("카드받기");
              setStartTxt("오늘의 \n알바 완료!");
            }
        }
        else{
            clearInterval(interval);
        }
        return()=>clearInterval(interval);
      }, [running1, running2, charge, duringTime]);

    useEffect(()=>{
        let interval;
        if(running2){
            interval=setInterval(() => {
                setTime((prevTime)=>prevTime+1000);
            }, 1000);
            if(time>=duringTime*60*1000){
              setRunning1(false);
              setRunning2(false);
              setMainColor("#FFAF15");
              setStartBtnTxt("카드받기");
              setStartTxt("오늘의 \n알바 완료!");
            }
        }
        else{
            clearInterval(interval);
        }
        return()=>clearInterval(interval);
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

    const defaultSelectedDays = [1, 3]; // 화요일과 목요일에 해당하는 요일 인덱스
    //const [isTouched, setIsTouched] = useState(Array(days.length).fill(false));
    const [isTouched, setIsTouched] = useState(
      days.map((_, index) => defaultSelectedDays.includes(index))
    );
    const [selectedDayIndex, setSelectedDayIndex] = useState(1);
    const [selectedTime1, setSelectedTime1] = useState(null);
    const [selectedTime2, setSelectedTime2] = useState(null);
    //const [start, setStart] = useState(false);
  
    const onPressDay = (index) => {
      setIsTouched((prev) => {
        const nextState = [...prev];
        nextState[index] = !prev[index];
        return nextState;
      });
      setSelectedDayIndex(index);
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

    const showAlert = () => {
      Alert.alert(
        '퇴근하기\n',
        '오늘 근무를\n 여기서 마칠까요?',
        [
          { text: '취소', onPress: () =>  console.log("cnlth"),},
          { text: '퇴근', onPress: () => {
            setMainColor("#FFAF15") 
            setStartBtnTxt("카드받기")
            setStartTxt("오늘의 \n알바 완료!")
          }, color: "#6100FF" }
        ],
        { cancelable: false }
      );
    };

    const changeTxt = () => {
      setStartBtnTxt("퇴근하기");
      setStartTxt("오늘 \n하루도 \n화이팅!")
    }

      const [selectedBusiness, setSelectedBusiness] = useState("");
    
      const handleBusinessSelection = (business) => {
        setSelectedBusiness(business);
      };

    return(

		<View style={styles.container}>
            <AlbaFrame>
              <Text>
                별다방
              </Text>
            </AlbaFrame>
            <StartTxt>{startTxt}</StartTxt>
            <TouchableOpacity 
                style={[styles.circle2, {left: circlePo, 		borderColor: mainColor,
              }]}
                //onPress={()=>{scrollPosition.x>-100 ? scrollToRight : scrollToLeft}}        
                onPress={()=>{
                    circlePo==-50? setCirclePo(200) : setCirclePo(-50)
                    setCircleTouched(true);
                    }}
                    >
                <View style={[styles.circleFill2, { height: charge, backgroundColor: mainColor }]} />
            </TouchableOpacity>
            <View style={styles.circle1}>
                <View style={[styles.circleFill1, { height: "100%" }]} />

                    {
                      circlePo==-50 ? 
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
                      >{("0"+Math.floor((time/3600000)%60)).slice(-2)}:{("0"+Math.floor((time/60000)%60)).slice(-2)}:{("0"+Math.floor((time/1000)%60)).slice(-2)}
                                      </Text>
                        : 
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
                        >{("0"+Math.floor((time/60000)%60))*160.167+"원"}</Text>                        
                    }
            </View>
            <AdjustBtn
                style={{
                    backgroundColor: "white",
                    borderColor: !start? "white" : mainColor,
                    borderWidth: 1,
                    //flex: 1,
                    //justifyContent: "flex-end",
                }}
                //onPress={()=>{setStart(true)}}
                onPress={()=>{setModalVisible(true)}}
                disabled={!start}
                >
                <Text
                    style={{
                        color: !start? "white" : "#858585",
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: 400,
                    }}
                >일정조정
                </Text>
            </AdjustBtn>
            <StartBtn
                                style={{
                                    backgroundColor: mainColor
                                    //flex: 1,
                                    //justifyContent: "flex-end",
                                }}
                                onPress={()=>{
                                    startBtnTxt=="시작하기" ? setRunning1(true) : setRunning1(false)
                                    startBtnTxt=="시작하기" ? setRunning2(true) : setRunning2(false)
                                    setStart(true)
                                    startBtnTxt=="시작하기" && changeTxt();
                                    //startBtnTxt=="퇴근하기" && !running1 ? navigation.navigate("Card") : setStartBtnTxt("퇴근하기")
                                    startBtnTxt=="퇴근하기" && !running1 && showAlert()
                                    startBtnTxt=="카드받기" && !running1 && navigation.navigate("Card")

                                    //Alert.alert(scrollPosition)
                                    //setRunning(true)
                                }}
                                //disabled={startBtnTxt=="퇴근하기"}
                                >
                                <SubmitTxt>{startBtnTxt}</SubmitTxt>
            </StartBtn>
            <SettingBtn 
                onPress={()=>{navigation.navigate('Setting')}}
            >
                <Image source={settingBtn}/>
            </SettingBtn>

                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                    >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={0.1}
          onPressOut={closeModal}
        >
                    <View style={styles.modalContainer}>
                        <View
                            style={{
                                flex: 1, 
                                backgroundColor: "transparent", 
                                justifyContent: "flex-end",
                                alignItems: "center",
                                }}>
                                    <View
                                        style={{backgroundColor: "white",
                                        padding: 15,
                                        width: 390,
                                        height: 700,
                                        borderRadius: 10}}>
                                        <View 
                                            style={{flexDirection: "row", marginBottom: 20}}>
                                            <TouchableOpacity
                                                onPressOut={closeModal}>
                                                <Image
                                                    source={erase}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPressOut={closeModal}>
                                                <Image
                                                    style={{width: 25, height: 25, marginLeft: 310}}
                                                    source={checked}/>
                                            </TouchableOpacity>
                                        </View>
                                        <Text
                                            style={{fontSize: 24, marginLeft: 20, fontWeight: 600, marginBottom: 20}}>
                                                별다방</Text>
                                        <View
                                            style={{flexDirection: "row", alignItems: "center", borderTopWidth: 0.17, borderBottomWidth: 0.17, borderColor: "lightgray"}}>
                                        <Image 
                                            source={calender}
                                            style={{width: 20, height: 20, marginBottom: 17, marginTop: 17}}/>
                                        <Text
                                            style={{fontSize: 16, marginLeft: 10, marginBottom: 17, marginTop: 17}}>일정</Text>
                                        </View>
                                        <DayListContainer>{daysList}</DayListContainer>
        <TimePick>
          <Text 
          disabled={!isTouched}
          style={{ top: 10 }}>시작</Text>
          {selectedDayIndex >= 0 && (
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
          <View style={{width: 10}}/>
          <Text style={{ top: 10 }}>종료</Text>
          {selectedDayIndex >= 0 && (
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
                                            style={{flexDirection: "row", alignItems: "center", marginTop: 30, borderTopWidth: 0.17, borderBottomWidth: 0.17, borderColor: "lightgray"}}>
                                        <Image 
                                            source={job}
                                            style={{width: 20, height: 20, marginTop: 17, marginBottom: 17}}/>
                                        <Text
                                            style={{fontSize: 16, marginLeft: 10, marginTop: 17, marginBottom: 17}}>업종</Text>
                                        <Text
                                            style={{fontSize: 16, color: "gray", marginLeft: 10, marginTop: 17, marginBottom: 17, marginRight: 180}}>카페∙베이커리</Text>
                                        <TouchableOpacity
                                            onPress={()=>{setModalVisible2(true)}}
                                        >
                                            <Image 
                                            style={{width: 13, height: 13}}
                                            source={rightBtn}/>
                                        </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{flexDirection: "row", alignItems: "center", borderBottomWidth: 0.17, borderColor: "lightgray"}}>
                                        <Image 
                                            source={money}
                                            style={{width: 20, height: 20, marginTop: 17, marginBottom: 17}}/>
                                        <Text
                                            style={{fontSize: 16, marginLeft: 10, marginTop: 17, marginBottom: 17}}>시급</Text>
                                        <Text
                                            style={{fontSize: 16, color: "gray", marginLeft: 10, marginTop: 17, marginBottom: 17}}>9,610원</Text>
                                        </View>
                            </View>
                        </View>
                    </View>
                    </TouchableOpacity>
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
                                }}>
                                    <View
                                        style={{backgroundColor: "white",
                                        padding: 15,
                                        width: 390,
                                        height: 520,
                                        borderRadius: 10}}>
                                        <View 
                                            style={{alignItems: "center" , borderBottomWidth: 0.17, borderColor: "lightgray", marginTop: -1}}>
                                            <View style={{width: 30, height: 1, backgroundColor: "gray"}}/>
                                            <Text
                                                style={{color: "#858585", fontSize: 12, fontWeight: 300, marginBottom: 17, marginTop: 20}}>
                                            알바 업종 리스트
                                            </Text>
                                        </View>                
                                        <View 
                                            style={{flexDirection: "row", alignItems: "center", borderBottomWidth: 0.17, borderColor: "lightgray"}}>
                                            <Text
                                                style={{fontSize: 14, fontWeight: 300, marginBottom: 17, marginTop: 17}}>
                                            카페∙베이커리
                                            </Text>
                                            <View>
                                            <TouchableOpacity
                                              style={{
                                                width: 18, 
                                                height: 18,
                                                borderRadius: 30,
                                                borderWidth: 1,
                                                marginLeft: "82%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                //paddingHorizontal: 10,
                                                borderColor: selectedBusiness === "카페∙베이커리" ? "#6100FF" : "#D9D9D9",
                                              }}
                                              onPress={() => handleBusinessSelection("카페∙베이커리")}
                                            >
                                              <View
                                                style={{
                                                  width: 9, 
                                                  height: 9,
                                                  borderRadius: 30,
                                                  backgroundColor: selectedBusiness === "카페∙베이커리" ? "#6100FF" : "white"
                                                  }}/>
                                            </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View 
                                            style={{flexDirection: "row", alignItems: "center", borderBottomWidth: 0.17, borderColor: "lightgray"}}>
                                            <Text
                                                style={{fontSize: 14, fontWeight: 300, marginBottom: 17, marginTop: 17}}>
                                            편의점
                                            </Text>
                                            <View>
                                            <TouchableOpacity
                                              style={{
                                                width: 18, 
                                                height: 18,
                                                borderRadius: 30,
                                                borderWidth: 1,
                                                marginLeft: "88.8%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                //paddingHorizontal: 10,
                                                borderColor: selectedBusiness === "편의점" ? "#6100FF" : "#D9D9D9",
                                              }}
                                              onPress={() => handleBusinessSelection("편의점")}
                                            >
                                              <View
                                                style={{
                                                  width: 9, 
                                                  height: 9,
                                                  borderRadius: 30,
                                                  backgroundColor: selectedBusiness === "편의점" ? "#6100FF" : "white"
                                                  }}/>
                                            </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View 
                                            style={{flexDirection: "row", alignItems: "center", borderBottomWidth: 0.17, borderColor: "lightgray"}}>
                                            <Text
                                                style={{fontSize: 14, fontWeight: 300, marginBottom: 17, marginTop: 17}}>
                                            레스토랑
                                            </Text>
                                            <View>
                                            <TouchableOpacity
                                              style={{
                                                width: 18, 
                                                height: 18,
                                                borderRadius: 30,
                                                borderWidth: 1,
                                                marginLeft: "87%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                //paddingHorizontal: 10,
                                                borderColor: selectedBusiness === "레스토랑" ? "#6100FF" : "#D9D9D9",
                                              }}
                                              onPress={() => handleBusinessSelection("레스토랑")}
                                            >
                                              <View
                                                style={{
                                                  width: 9, 
                                                  height: 9,
                                                  borderRadius: 30,
                                                  backgroundColor: selectedBusiness === "레스토랑" ? "#6100FF" : "white"
                                                  }}/>
                                            </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View 
                                            style={{flexDirection: "row", alignItems: "center", borderBottomWidth: 0.17, borderColor: "lightgray"}}>
                                            <Text
                                                style={{fontSize: 14, fontWeight: 300, marginBottom: 17, marginTop: 17}}>
                                            학원∙과외
                                            </Text>
                                            <View>
                                            <TouchableOpacity
                                              style={{
                                                width: 18, 
                                                height: 18,
                                                borderRadius: 30,
                                                borderWidth: 1,
                                                marginLeft: "85.5%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                //paddingHorizontal: 10,
                                                borderColor: selectedBusiness === "학원∙과외" ? "#6100FF" : "#D9D9D9",
                                              }}
                                              onPress={() => handleBusinessSelection("학원∙과외")}
                                            >
                                              <View
                                                style={{
                                                  width: 9, 
                                                  height: 9,
                                                  borderRadius: 30,
                                                  backgroundColor: selectedBusiness === "학원∙과외" ? "#6100FF" : "white"
                                                  }}/>
                                            </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View 
                                            style={{flexDirection: "row", alignItems: "center", borderBottomWidth: 0.17, borderColor: "lightgray"}}>
                                            <Text
                                                style={{fontSize: 14, fontWeight: 300, marginBottom: 17, marginTop: 17}}>
                                            배달
                                            </Text>
                                            <View>
                                            <TouchableOpacity
                                              style={{
                                                width: 18, 
                                                height: 18,
                                                borderRadius: 30,
                                                borderWidth: 1,
                                                marginLeft: "90.6%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                //paddingHorizontal: 10,
                                                borderColor: selectedBusiness === "배달" ? "#6100FF" : "#D9D9D9",
                                              }}
                                              onPress={() => handleBusinessSelection("배달")}
                                            >
                                              <View
                                                style={{
                                                  width: 9, 
                                                  height: 9,
                                                  borderRadius: 30,
                                                  backgroundColor: selectedBusiness === "배달" ? "#6100FF" : "white"
                                                  }}/>
                                            </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View 
                                            style={{flexDirection: "row", alignItems: "center", borderBottomWidth: 0.17, borderColor: "lightgray"}}>
                                            <Text
                                                style={{fontSize: 14, fontWeight: 300, marginBottom: 17, marginTop: 17}}>
                                            물류∙포장
                                            </Text>
                                            <View>
                                            <TouchableOpacity
                                              style={{
                                                width: 18, 
                                                height: 18,
                                                borderRadius: 30,
                                                borderWidth: 1,
                                                marginLeft: "85.5%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                //paddingHorizontal: 10,
                                                borderColor: selectedBusiness === "물류∙포장" ? "#6100FF" : "#D9D9D9",
                                              }}
                                              onPress={() => handleBusinessSelection("물류∙포장")}
                                            >
                                              <View
                                                style={{
                                                  width: 9, 
                                                  height: 9,
                                                  borderRadius: 30,
                                                  backgroundColor: selectedBusiness === "물류∙포장" ? "#6100FF" : "white"
                                                  }}/>
                                            </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View 
                                            style={{flexDirection: "row", alignItems: "center", borderBottomWidth: 0.17, borderColor: "lightgray"}}>
                                            <Text
                                                style={{fontSize: 14, fontWeight: 300, marginBottom: 17, marginTop: 17}}>
                                            공연∙전시스텝
                                            </Text>
                                            <View>
                                            <TouchableOpacity
                                              style={{
                                                width: 18, 
                                                height: 18,
                                                borderRadius: 30,
                                                borderWidth: 1,
                                                marginLeft: "81.8%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                //paddingHorizontal: 10,
                                                borderColor: selectedBusiness === "공연∙전시스텝" ? "#6100FF" : "#D9D9D9",
                                              }}
                                              onPress={() => handleBusinessSelection("공연∙전시스텝")}
                                            >
                                              <View
                                                style={{
                                                  width: 9, 
                                                  height: 9,
                                                  borderRadius: 30,
                                                  backgroundColor: selectedBusiness === "공연∙전시스텝" ? "#6100FF" : "white"
                                                  }}/>
                                            </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View 
                                            style={{flexDirection: "row", alignItems: "center", borderBottomWidth: 0.17, borderColor: "lightgray"}}>
                                            <Text
                                                style={{fontSize: 14, fontWeight: 300, marginBottom: 17, marginTop: 17}}>
                                            기타
                                            </Text>
                                            <View>
                                            <TouchableOpacity
                                              style={{
                                                width: 18, 
                                                height: 18,
                                                borderRadius: 30,
                                                borderWidth: 1,
                                                marginLeft: "90.6%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                //paddingHorizontal: 10,
                                                borderColor: selectedBusiness === "기타" ? "#6100FF" : "#D9D9D9",
                                              }}
                                              onPress={() => handleBusinessSelection("기타")}
                                            >
                                              <View
                                                style={{
                                                  width: 9, 
                                                  height: 9,
                                                  borderRadius: 30,
                                                  backgroundColor: selectedBusiness === "기타" ? "#6100FF" : "white"
                                                  }}/>
                                            </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                        </View>
                </View>
            </TouchableOpacity>
        </Modal>
                </Modal>
        </View>

    )
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
        justifyContent: 'center',
        flexDirection: 'row', // 가로 방향으로 정렬
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
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 1,
        shadowColor: "#BDBDBD",
        shadowRadius: 7,
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
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // 흐린 회색 배경
        justifyContent: 'center',
        alignItems: 'center',
      },
});

const AlbaFrame = styled.View`
    position: absolute;
    width: fit-content;
    height: 38px;
    top: 78px;
    //background: #FFFFFF;
    border: 1px solid #B0B0B0;
    border-radius: 30px;
    padding: 10px;
    padding-left: 15px;
    padding-right: 15px;
    align-items: center;
`

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
    color: #1C1C1C;
`
const StartTxt = styled.Text`
    position: absolute;
    //width: 131px;
    height: 108px;
    left: 20px;
    top: 148px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
`
const StartBtn = styled.TouchableOpacity`
    background-Color: #6100FF;
    position: absolute;
    width: 290;
    height: 52;
    top: 88%;
    padding: 10px;
    border-radius: 100;
    justify-content: center;
`
const AdjustBtn = styled.TouchableOpacity`
    //background-color: #395B64;
    position: absolute;
    width: 290;
    height: 52;
    top: 80%;
    padding: 10px;
    border-radius: 100;
    justify-content: center;    
`
const SubmitTxt =styled.Text`
    color: #fff;
    text-Align: center;
    font-Size: 16;
    font-Weight: 400;
`
const SettingBtn = styled.TouchableOpacity`
    position: absolute;
    width: 40px;
    height: 40px;
    //left: 340px;
    right: 10px;
    top: 50px;
`


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
  align-content: center;
`;