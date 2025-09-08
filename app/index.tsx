import Header from "@/components/header";
import Timer from "@/components/timer";
import { View } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
      }}
    >
      <Header />
      <Timer />
    </View>
  );
}
