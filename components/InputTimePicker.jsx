import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { TimePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function InputTimePicker({
  visible,
  setTimePickerVisible,
  onAddTime,
}) {
  const onDismiss = React.useCallback(() => {
    setTimePickerVisible(false);
  }, [setTimePickerVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setTimePickerVisible(false);
      console.log({ hours, minutes });
      onAddTime(hours, minutes); // Notify parent to add the time
    },
    [setTimePickerVisible]
  );

  return (
    // <SafeAreaProvider>
    <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
      <TimePickerModal
        visible={visible}
        use24HourClock="true"
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={24}
        minutes={0}
      />
    </View>
    // </SafeAreaProvider>
  );
}
