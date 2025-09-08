import formattingInTime from "@/utils/formattingInTime";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

const sectionsTime = {
  "action": 180,
  "interval": 60,
};

export default function Timer() {
  const [timer, setTimer] = useState(sectionsTime["action"]);
  const [intervalId, setIntervalId] = useState<number | null>();

  const resetInterval = (id: number) => {
    clearInterval(id);
    setIntervalId(null);
  };

  const onPressButton = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        setTimer((prev: number) => {
          if (prev) return prev - 1;
          resetInterval(id);
          return 0;
        });
      }, 1000);
      setIntervalId(id);
    } else {
      resetInterval(intervalId);
    }
  };

  return (
    <View
      style={{
        flexDirection: "column",
        height: "80%",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#FFF", textAlign: "center", fontSize: 130 }}>
        {formattingInTime(timer)}
      </Text>
      <View>
        <Text style={{ color: "#FFF", fontSize: 30 }}>Round 1/12</Text>
        <Pressable
          onPress={onPressButton}
          style={{ backgroundColor: "#FFF", padding: 10, marginTop: 10 }}
        >
          <Text style={{ color: "#000", textAlign: "center", fontSize: 20 }}>
            {intervalId ? "Pausar" : "Iniciar"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
