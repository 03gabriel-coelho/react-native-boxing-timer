import formattingInTime from "@/utils/formattingInTime";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

type SectionTypes = "action" | "interval";

const sectionsTime = {
  action: 15,
  interval: 10,
};

export default function Timer() {
  const [section, setSection] = useState<SectionTypes | null>();
  const [timer, setTimer] = useState(sectionsTime["action"]);
  const [intervalId, setIntervalId] = useState<number | null>();
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const resetInterval = (id: number) => {
    clearInterval(id);
    setIntervalId(null);
  };

  useEffect(() => {
    if (section && !intervalId && !isPaused) {
      const id = setInterval(() => {
        setTimer((prev: number) => {
          if (prev === 0) {
            resetInterval(id);

            setSection((prevSection) => {
              return prevSection === "interval" ? "action" : "interval";
            });

            if (section) {
              return sectionsTime[
                section === "interval" ? "action" : "interval"
              ];
            }
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
    }
  }, [section, intervalId, isPaused]);

  const onPressButton = useCallback(() => {
    if (!intervalId || isPaused) {
      const beforeTimer = timer;
      let timerInitial = 5;
      setTimer(timerInitial);

      const id = setInterval(() => {
        timerInitial -= 1;
        setTimer(timerInitial);
        if (timerInitial === 0) {
          if (!section) {
            setSection("action");
            setTimer(sectionsTime["action"]);
          }
          if (isPaused) {
            setTimer(beforeTimer);
            setIsPaused(false);
          }
          clearInterval(id);
        }
      }, 1000);
    } else {
      resetInterval(intervalId);
      setIsPaused(true);
    }
  }, [intervalId, section, isPaused, timer]);

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
