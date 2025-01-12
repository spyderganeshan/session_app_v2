import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

const BottomBar = ({ handleAddButton }) => (
  <FAB icon="plus" style={styles.fab} onPress={handleAddButton} />
);

const styles = StyleSheet.create({
  fab: {
    backgroundColor: "#0d749e",
    position: "absolute",
    margin: 16,
    bottom: 0,
    borderRadius: 50, // This makes the FAB circular
  },
});

export default BottomBar;
