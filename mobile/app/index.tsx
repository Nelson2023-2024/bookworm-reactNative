import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Href } from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href={"/(auth)/signup" as Href}>Signup</Link>
      <Link href={"/(auth)/" as Href}>Login</Link>
    </View>
  );
}
