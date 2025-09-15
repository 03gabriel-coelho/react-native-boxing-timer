import Header from "@/components/header";
import Timer from "@/components/timer";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState<string>("black");

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <Header backgroundAppColor={backgroundColor}/>
      <Timer setBackgroundColor={setBackgroundColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
