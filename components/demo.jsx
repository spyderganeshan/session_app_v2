import React from "react";
import { Animated, View, Text, FlatList, Alert } from "react-native";
import CustomCards from "@/components/CustomCards";
import BottomBar from "@/components/BottomBar";
import AddDetails from "@/components/AddDetails";
import { SwipeListView } from "react-native-swipe-list-view";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useFonts, isLoaded } from "expo-font";
import { initializeDatabase } from "./db";

function index() {
  const [open, setOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  useEffect(() => {
    initializeDatabase();
    fetchCards();
  }, []);

  // Fetch all cards from the database
  const fetchCards = () => {
    getAllActivities((data) => {
      setCards(
        data.map((item) => ({
          id: item.task_name, // Using task_name as the unique ID
          taskName: item.task_name,
          taskDescription: item.task_description,
          taskTime: item.task_time,
        }))
      );
    });
  };

  const handleAddCard = async (taskName, taskDescription, taskTime) => {
    console.log("Add card");
    console.log({ taskName, taskDescription, taskTime });
    const newCard = {
      id: Date.now().toString(),
      taskName,
      taskDescription,
      taskTime,
    };
    setCards((prevCards) => [newCard, ...prevCards]); // Add the new card to the beginning of the list
  };
  const handleAddButton = () => {
    setOpen(true); // Open the dialog for details
  };

  // Handle card deletion
  const handleDelete = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  // Render the delete button
  const renderDeleteButton = (id) => (
    // <View
    //   style={{
    //     backgroundColor: "red",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100%",
    //     position: "absolute",
    //     right: 0, // Position delete button on the right
    //     paddingBottom: 20,
    //   }}
    // >
    <View
      style={{
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 90,
        height: "93%",
        position: "absolute",
        right: 0, // Position delete button on the right
        // borderBottomWidth: ,
        borderRadius: 8,
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
          fontFamily: "myfont",
        }}
        onPress={() => handleDelete(id)}
      >
        delete
      </Text>
    </View>
    // </View>
  );

  // Render each card with swipeable functionality
  const renderCard = ({ item }) => (
    <View
      style={{
        marginBottom: 10, // Adds space between cards
        backgroundColor: "#fff",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <CustomCards
        taskName={item.taskName}
        taskDescription={item.taskDescription}
        taskTime={item.taskTime}
      />
    </View>
  );

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     backgroundColor: "red",
    //   }}
    // >
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#02040d", // Fallback color if gradient fails
      }}
    >
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
        }}
      >
        {/* <Text>home</Text> */}
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            // padding: 10,
            // paddingVertical: 20,
            paddingRight: 20,
            paddingLeft: 20,
            paddingBottom: 60,
            marginTop: 70,
          }}
        >
          <SwipeListView
            data={cards} // The list of cards
            keyExtractor={(item) => item.id} // Unique key for each card
            renderItem={renderCard} // Render the card itself
            renderHiddenItem={({ item }) => renderDeleteButton(item.id)} // Render the delete button on swipe
            leftOpenValue={0} // No swipe action on the left
            rightOpenValue={-75} // Swipe to the left reveals the delete button
            ListEmptyComponent={
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  // marginTop: 20,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    paddingTop: 100,
                  }}
                >
                  No cards yet
                </Text>
              </View>
            }
            contentContainerStyle={{ paddingVertical: 10 }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 10, // Space between cards
                }}
              />
            )}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <BottomBar handleAddButton={handleAddButton} />
        </View>
        <AddDetails open={open} setOpen={setOpen} onAddCard={handleAddCard} />
      </LinearGradient>
    </SafeAreaView>
    // </View>
  );
}

export default index;
