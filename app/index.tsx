import Header from "@/components/header";
import Timer from "@/components/timer";
import { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState<string>("black");
  const [hiddenStatusBar, setHiddenStatusBar] = useState<boolean>(false);

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <StatusBar
        animated={false}
        backgroundColor={backgroundColor}
        hidden={hiddenStatusBar}
      />
      <Header
        backgroundAppColor={backgroundColor}
        hiddenStatusBar={hiddenStatusBar}
      />
      <Timer
        setBackgroundColor={setBackgroundColor}
        setHiddenStatusBar={setHiddenStatusBar}
      />
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
