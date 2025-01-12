import { Stack } from "expo-router";
//   import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    myfont: require("../assets/fonts/SpaceGrotesk-Light.ttf"),
    geo: require("../assets/fonts/Geo-Regular.ttf"),
    dot: require("../assets/fonts/Doto-Black.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "session", // Set the title
            headerTitleAlign: "center", // Center the title
            headerStyle: {
              backgroundColor: "transparent", // Make the header background transparent
              borderBottomWidth: 0, // Remove the border under the header
            },
            headerTintColor: "#fff", // Set the color of the header title
            headerTransparent: true, // Make the entire header transparent
            headerTitleStyle: {
              fontFamily: "myfont", // Apply your custom font
            },
          }}
        />
        <Stack.Screen
          name="timer"
          options={{
            headerTitle: "Timer", // Set the title for the timer screen
            headerTitleAlign: "center", // Center the title
            headerStyle: {
              backgroundColor: "transparent", // Make the header background transparent
              borderBottomWidth: 0, // Remove the border under the header
            },
            headerTintColor: "#02040d", // Set the color of the header title
            headerTransparent: true, // Make the entire header transparent
            headerTitleStyle: {
              fontFamily: "MyFont", // Apply your custom font
            },
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
