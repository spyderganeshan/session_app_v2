import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  PaperProvider,
  Text,
  TextInput,
} from "react-native-paper";
import InputTimePicker from "./InputTimePicker";
import CustomButton from "./CustomButton";

const AddDetails = ({ open, setOpen, onAddCard }) => {
  const [taskName, setTaskName] = React.useState("");
  const [taskDescription, setTaskDescription] = React.useState("");
  const [taskTime, setTasktime] = React.useState("HH:MM");
  const [visible, setTimePickerVisible] = React.useState(false);
  const handleClose = () => {
    setTaskName(""); // Reset input
    setTaskDescription("");
    setTasktime("HH:MM");
    setOpen(false); // Close the dialog
  };
  const handleAddTime = async (hours, minutes) => {
    const tasktime = (hours * 60 + minutes) * 60;
    setTasktime(tasktime);
  };
  const handleSubmit = () => {
    // Handle form submission
    if (taskName.trim() && taskDescription.trim()) {
      console.log("Task Name:", taskName);
      console.log("Task Description:", taskDescription);
      if (typeof taskTime === "number") {
        console.log("Task Time:", taskTime);

        onAddCard(taskName, taskDescription, taskTime); // Notify parent to add the card
        handleClose();
        //   setTaskName(""); // Reset input
        //   setTaskDescription("");
      }
    }
  };

  return (
    <Dialog
      visible={open}
      onDismiss={handleClose}
      style={{ backgroundColor: "white" }}
    >
      <Dialog.Title style={{ fontFamily: "myfont", color: "black" }}>
        Add details
      </Dialog.Title>
      <Dialog.Content>
        {/* <Text variant="bodyMedium">This is simple dialog</Text> */}
        <TextInput
          mode="outlined"
          label="Task"
          style={{ backgroundColor: "white" }}
          value={taskName}
          onChangeText={(text) => setTaskName(text)}
        />
        <TextInput
          mode="outlined"
          label="Description"
          style={{ backgroundColor: "white" }}
          value={taskDescription}
          onChangeText={(text) => setTaskDescription(text)}
        />
        <View
        // style={{

        // flexDirection: "row",
        // alignItems: "center",
        // marginVertical: 10,

        // }}
        >
          {/* <TextInput
            style={{
              flex: 1,
              marginRight: 8, // Space between the field and the button
            }}
            label="Select Time"
            mode="outlined"
            value={taskTime}
            editable={false}
            // pointerEvents="none"
          /> */}
          {/* <Button
            style={{
              height: 45, // Match TextInput height for alignment
              justifyContent: "center",
              fontFamily: "myfont",
            }}
            mode="contained"
            onPress={}
          >
            Select Time
          </Button> */}
          <CustomButton
            Label="select time"
            onPress={() => setTimePickerVisible(true)}
          />
        </View>
        <InputTimePicker
          visible={visible}
          setTimePickerVisible={setTimePickerVisible}
          onAddTime={handleAddTime}
        />
      </Dialog.Content>
      <Dialog.Actions>
        {/* <Button style={{ fontFamily: "myfont" }} onPress={handleClose}>
          cancel
        </Button>
        <Button style={{ fontFamily: "myfont" }} onPress={handleSubmit}>
          Done
        </Button> */}
        <CustomButton Label="cancel" onPress={handleClose} />
        <CustomButton Label="done" onPress={handleSubmit} />
      </Dialog.Actions>
    </Dialog>
  );
};

export default AddDetails;
