import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import "react-native-reanimated";

// Prevent native splash screen from auto-hiding
SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore error */
});

export default function RootLayout() {
  const [loaded] = useFonts({
    mont: require("../assets/fonts/Montserrat-Regular.ttf"),
    montMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    montBold: require("../assets/fonts/Montserrat-Bold.ttf"),
    raleway: require("../assets/fonts/Raleway-Regular.ttf"),
    ralewayMedium: require("../assets/fonts/Raleway-Medium.ttf"),
    ralewayBold: require("../assets/fonts/Raleway-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn("Error hiding splash screen:", e);
      }
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <LinearGradient colors={["#1A1A2E", "#16213E"]} style={{ flex: 1 }} />
    );
  }

  return (
    <LinearGradient
      colors={["#1A1A2E", "#16213E"]}
      style={{ flex: 1 }}
      onLayout={onLayoutRootView}
    >
      <Stack screenOptions={{ statusBarStyle: "light" }}>
        <Stack.Screen
          name="(marsiya)"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </LinearGradient>
  );
}
