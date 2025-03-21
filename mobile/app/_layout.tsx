import { Stack } from "expo-router";
import "../global.css";
import SafeScreen from "../components/SafeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index"></Stack.Screen>
          <Stack.Screen name="(auth)"></Stack.Screen>
        </Stack>
      </SafeScreen>
      <StatusBar style="dark"/>
    </SafeAreaProvider>
  );
}
