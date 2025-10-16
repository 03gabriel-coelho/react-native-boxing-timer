import Footer from "@/components/footer";
import Timer from "@/components/timer";
import { TimerTypes } from "@/types/timer";
import { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState<string>("black");
  const [hiddenStatusBar, setHiddenStatusBar] = useState<boolean>(false);
  const [timer, setTimer] = useState<TimerTypes>({
    actualTimer: 180,
    action: 180,
    interval: 60,
    section: null,
    round: 1,
    isPaused: false,
    beforeTimer: 5,
  });

  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <View
        style={{
          width: "100%",
          height: hiddenStatusBar ? (StatusBar.currentHeight || 20) - 20 : 0,
        }}
      ></View>
      <StatusBar
        animated={false}
        backgroundColor={backgroundColor}
        hidden={hiddenStatusBar}
      />
      <Timer
        setBackgroundColor={setBackgroundColor}
        setHiddenStatusBar={setHiddenStatusBar}
        setTimer={setTimer}
        timer={timer}
      />
      <Footer
        backgroundAppColor={backgroundColor}
        hiddenStatusBar={hiddenStatusBar}
        timer={timer}
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
