import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
// import { Link } from "expo-router";
import { useRouter } from "expo-router";
import CustomButton from "./CustomButton";
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const CustomCards = ({
  taskName,
  taskDescription,
  taskTime,
  totalTime,
  onDelete,
  addCustom,
}) => {
  const convertSecondsToHHMM = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };
  const router = useRouter();

  return (
    <Card
      style={{
        backgroundColor: "#041827",
        borderRadius: 8,
        // Inset effect: Light shadow on the opposite side
        borderColor: "#0d749e", // Light border color
        borderWidth: 1,
      }}
    >
      {/* <Card.Title title="title name" subtitle="describtion" left={LeftContent} /> */}
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 4,
          }}
        >
          <Text style={{ fontSize: 30, color: "white", fontFamily: "myfont" }}>
            {taskName}
          </Text>
          <Text style={{ color: "white", fontFamily: "geo" }}>total:</Text>
        </View>
        <Text style={{ color: "white", fontFamily: "myfont" }}>
          {taskDescription}
        </Text>
      </Card.Content>
      {/* Divider Line */}
      <View style={styles.divider} />
      {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
      <Card.Content>
        <Text style={{ color: "white", fontFamily: "geo" }}>Start timer</Text>
        <View style={{ flexDirection: "row", paddingTop: 3 }}>
          {/* <Button
            mode="contained"
            onPress={() => {
              router.push({
                pathname: "/timer",
                params: { taskname: taskName, time: taskTime },
              });
            }}
            style={{ marginRight: 10 }}
          >
            {convertSecondsToHHMM(taskTime)}
          </Button> */}
          {/* <Button mode="contained" onPress={() => console.log("Pressed")}>
            +
          </Button> */}
          <CustomButton
            Label={convertSecondsToHHMM(taskTime)}
            onPress={() => {
              router.push({
                pathname: "/timer",
                params: { taskname: taskName, time: taskTime },
              });
            }}
          />
          <CustomButton Label={"+"} />
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1, // Adjust height for desired line thickness
    backgroundColor: "#ddd", // Set the divider color
    // marginHorizontal: 16, // Add margin for spacing from card edges
    marginTop: 10, // Margin from content above
    marginBottom: 10, // Margin from content below
  },
});
export default CustomCards;
