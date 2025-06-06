import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import React from "react";

const MainLayout = () => {
  return (
    <LinearGradient
      colors={["#1A1A2E", "#16213E"]}
      style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 20 }}
    >
      <Stack
        screenOptions={{
          statusBarStyle: "light",
          statusBarAnimation: "fade",
          contentStyle: { backgroundColor: "transparent" },
          animation: "fade",
          animationDuration: 200,
        }}
      >
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="view"
          options={{
            headerShown: false,
            presentation: "card",
            animation: "slide_from_right",
            animationDuration: 350,
          }}
        />
        <Stack.Screen
          name="listen"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="publish"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="contact"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="feedback"
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </LinearGradient>
  );
};

export default MainLayout;
