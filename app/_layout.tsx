import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent native splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    mont: require("../assets/fonts/Montserrat-Regular.ttf"),
    montMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    montBold: require("../assets/fonts/Montserrat-Bold.ttf"),
    raleway: require("../assets/fonts/Raleway-Regular.ttf"),
    ralewayMedium: require("../assets/fonts/Raleway-Medium.ttf"),
    ralewayBold: require("../assets/fonts/Raleway-Bold.ttf"),
  });

  // Hide splash screen when fonts are loaded
  useEffect(() => {
    if (loaded) {
      const hideSplash = async () => {
        try {
          await SplashScreen.hideAsync();
        } catch (err) {
          console.warn("Error hiding splash screen:", err);
        }
      };
      hideSplash();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Wait until fonts are loaded
  }

  return (
    <Stack>
      <Stack.Screen name="(marsiya)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
