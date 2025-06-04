import { Stack } from "expo-router";
import React from "react";

const MainLayout = () => {
  return (
    <Stack
      screenOptions={{ statusBarStyle: "dark", statusBarAnimation: "fade" }}
    >
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="view"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen name="listen" options={{ headerShown: false }} />
      <Stack.Screen name="publish" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
      <Stack.Screen name="contact" options={{ headerShown: false }} />
      <Stack.Screen name="feedback" options={{ headerShown: false }} />
    </Stack>
  );
};

export default MainLayout;
