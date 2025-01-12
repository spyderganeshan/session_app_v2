import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function CustomButton({ Label, onPress }) {
  return (
    <View style={styles.shadowWrapper}>
      {/* Button */}
      <TouchableOpacity style={styles.button} onPressOut={onPress}>
        <Text style={styles.text}>{Label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrapper: {
    margin: 6,
    borderRadius: 20,
    shadowColor: "#060d12", // Dark shadow for depth
    shadowOffset: { width: 5, height: 5 }, // Bottom-right shadow
    // shadowOpacity: 1, // Soft shadow opacity
    // shadowRadius: 1, // Softness of the shadow
    elevation: 6, // For Android shadow
    // marginBottom: 10,
  },
  button: {
    padding: 2,
    backgroundColor: "#0f212d", // Button background color
    shadowColor: "white", // Dark shadow for depth
    // shadowOffset: { width: -5, height: -5 }, // Bottom-right shadow
    // shadowOpacity: 10, // Soft shadow opacity
    // shadowRadius: 1, // Softness of the shadow
    borderRadius: 20,
    borderColor: "#0d749e", // Optional border color for added effect
    borderWidth: 2,
    elevation: 3,
  },
  text: {
    fontFamily: "myfont",
    textAlign: "center",
    margin: 5,
    color: "#fff", // Text color inside the button
    paddingBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
  },
});
