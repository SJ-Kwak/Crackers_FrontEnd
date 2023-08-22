import React from "react-native";
import { useRef } from 'react';
import styled from "styled-components/native";
import Carousel from "react-native-carousel-control";
import LiquidProgress from "react-native-liquid-progress";
import Swiper from 'react-native-swiper';




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
} from "react-native";
import { useState } from "react";
//import { ScrollView } from "react-native-gesture-handler";

//const Stack = createStackNavigator();

export default function MainScreen({list}){

    const [start, setStart] = useState(false);
    const [charge, setCharge] = useState("30%");
    const [startBtnTxt, setStartBtnTxt] = useState("시작하기");
    const [startTxt, setStartTxt] = useState("로키님,          오늘의 근무를 시작하세요");
    const [value, setValue] = useState(30);
    const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

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

    return(
        /*
        <FlatList
            data={list}
            horizontal
            keyExtractor={i=> i.id}
            renderItem={({item})=>{
                return(
                    <View style={styles.container}>
                    <LiquidProgress
                        backgroundColor={"black"}
                        frontWaveColor={"blue"}
                        backWaveColor={"skyblue"}
                        fill={value}
                        size={290}
                    >
                        <Animated.View style={styles.row}>
                            <Text style={styles.text}>{(value * 100).toFixed(2)}%</Text>
                        </Animated.View>
                    </LiquidProgress>
                </View>
                )
            }}/>
        */
		<View style={styles.container}>
            <AlbaFrame/>
            <StartTxt>{startTxt}</StartTxt>
            {/*<Carousel>
            <View style={styles.circle2}>
                <View style={[styles.circleFill2, { height: charge }]} />
            </View>
            <View style={styles.circle1}>
                <View style={[styles.circleFill1, { height: "100%" }]} />
            </View>
        </Carousel>*/}
        {/*<View style={{justifyContent: "center"}}>
            <Swiper
                bounces={true}
                showsPagination={false} 
                scrollsToTop={true}
                automaticallyAdjustContentInsets={true}
                //width={300}
                //</View>height={250}
            >
            <View style={styles.circle2}>
                <View style={[styles.circleFill2, { height: charge }]} />
            </View>
            <View style={styles.circle1}>
                <View style={[styles.circleFill1, { height: "100%" }]} />
            </View>
            </Swiper>
        </View>*/}
        <View style={{flex: 1, height: 260, position: "absolute", bottom: 320, width: "100%"}}>
        <ScrollView
            horizontal={true}
            contentInset={{left: 300, right: 400, bottom: 0, top: 0}}
            contentContainerStyle={styles.scrollViewContent}
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            ref={scrollViewRef}
            scrollEventThrottle={16}
        >
            <View 
                style={styles.circle2}
                //onPress={()=>{scrollPosition.x>-100 ? scrollToRight : scrollToLeft}}        
                onPress={()=>{scrollToRight}}        
>
                <View style={[styles.circleFill2, { height: charge }]} />
            </View>
        </ScrollView>
        </View>
            <View style={styles.circle1}>
                <View style={[styles.circleFill1, { height: "100%" }]} />
            </View>
            <AdjustBtn
                style={{
                    backgroundColor: "white",
                    borderColor: !start? "white" : "#6100FF",
                    borderWidth: 1,
                    //flex: 1,
                    //justifyContent: "flex-end",
                }}
                //onPress={()=>{setStart(true)}}
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
                                    backgroundColor: "#6100FF"
                                    //flex: 1,
                                    //justifyContent: "flex-end",
                                }}
                                onPress={()=>{
                                    setStart(true)
                                    setStartBtnTxt("퇴근하기")
                                    setStartTxt("오늘              하루도                화이팅!")
                                    //Alert.alert(scrollPosition)
                                }}
                                disabled={start}
                                >
                                <SubmitTxt>{startBtnTxt}</SubmitTxt>
            </StartBtn>
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
		borderColor: "#8A15FF",
		overflow: "hidden",
		position: "absolute",
		left: -81,
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
		backgroundColor: "#6100FF",
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
});

const AlbaFrame = styled.View`
    position: absolute;
    width: 74px;
    height: 38px;
    top: 78px;
    //background: #FFFFFF;
    border: 1px solid #B0B0B0;
    border-radius: 100px;
    padding: 10px;
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
    width: 131px;
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
