import Header from "@/components/header";
import Timer from "@/components/timer";
import { useState } from "react";
import { View } from "react-native";

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState<string>("black");

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: backgroundColor,
      }}
    >
      <Header />
      <Timer setBackgroundColor={setBackgroundColor} />
    </View>
  );
}
