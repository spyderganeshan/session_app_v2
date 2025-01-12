import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CircularProgress from "react-native-circular-progress-indicator";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "../components/CustomButton";

const TimerScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // Get time (in seconds) from params or default to 300 seconds (5 minutes)
  const { taskname: taskName, time: Time } = route.params || {}; // Get params from navigation
  const [remainingTime, setRemainingTime] = useState(Time);
  const [isPaused, setIsPaused] = useState(false);
  const progressRef = useRef(null);
  const handleBack = async () => {
    const timeCompleted = Time - remainingTime;
    const now = new Date();
    const currentTime = now.toLocaleTimeString(); // e.g., "14:30:00"
    const currentDate = now.toLocaleDateString(); // e.g., "12/08/2024"

    navigation.goBack(); // Navigate back to home screen
  };
  useEffect(() => {
    let timerInterval;

    if (!isPaused && remainingTime > 0) {
      timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isPaused, remainingTime]);

  const handlePauseResume = () => {
    if (isPaused) {
      progressRef.current.play(); // Resume progress animation
      setIsPaused(false);
    } else {
      progressRef.current.pause(); // Pause progress animation
      setIsPaused(true);
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    // <View style={styles.container}>
    <LinearGradient
      // Background Linear Gradient
      colors={["#0d749e", "#02040d"]}
      locations={[0.1, 0.8]}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.glowContainer}>
        <CircularProgress
          ref={progressRef}
          value={Time - remainingTime} // Progress value
          maxValue={Time} // Max value for the timer
          radius={120} // Circle radius
          valueSuffix="" // No suffix
          title={formatTime(remainingTime)} // Show time in MM:SS format
          titleStyle={styles.timerText}
          activeStrokeWidth={12}
          inActiveStrokeWidth={12}
          activeStrokeColor={"#0f212d"}
          inActiveStrokeColor={"#0d749e"}
          duration={Time} // Duration in seconds
          showProgressValue={false} // Show progress value
          clockwise={false}
          strokeLinecap={"butt"}
        />
      </View>
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <CustomButton
          Label={isPaused ? "Resume" : "Pause"}
          onPress={handlePauseResume}
        />
        <CustomButton Label="give up" onPress={handleBack} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "#02040d",
  // },
  timerText: {
    fontSize: 36,
    fontFamily: "dot",
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "60%",
  },
  glowContainer: {
    width: 240, // Container size should be larger than the CircularProgress radius
    height: 240,
    borderRadius: "50%", // Make it a perfect circle
    backgroundColor: "#02040d", // Soft glow color (green with transparency)
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black", // Glow color

    elevation: 20, // For Android devices
  },
});

export default TimerScreen;
