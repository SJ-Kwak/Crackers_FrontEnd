import Carousel from "react-native-carousel-control";

import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";


export default function CaroScreen() {

    const [charge, setCharge] = useState("30%");

    return(
    <View style={{
        flex: 1,         
        justifyContent: "center",
        alignSelf: "stretch"}}>
        <Carousel
        pageStyle={ {flex:1, backgroundColor: "white", borderRadius: 5} }>
            <View style={styles.circle2}>
                <View style={[styles.circleFill2, { height: charge }]} />
            </View>
            <View style={styles.circle1}>
                <View style={[styles.circleFill1, { height: "100%" }]} />
            </View>
        </Carousel>
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
	circle1: {
		width: 288,
		height: 288,
		borderRadius: 288 / 2,
		//borderWidth: 2,
		//borderColor: "#000000",
		//overflow: "hidden",
		position: "absolute",
		left: 51,
		top: 294,
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
		top: 292,
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
	}
})