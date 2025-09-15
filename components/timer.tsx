import useBellSound from "@/hooks/useBellSound";
import formattingInTime from "@/utils/formattingInTime";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, Vibration, View } from "react-native";
import AnimatedPressable from "./ui/animatedPressable";

type SectionTypes = "action" | "interval";

const sectionsTime = {
  action: 180,
  interval: 60,
};

// const sectionsTime = {
//   action: 30,
//   interval: 15,
// };

const numberOfRounds = 12;

export default function Timer({
  setBackgroundColor,
}: {
  setBackgroundColor: (color: string) => void;
}) {
  const { playBell } = useBellSound();

  const [section, setSection] = useState<SectionTypes | null>();
  const [round, setRound] = useState<number>(1);
  const [timer, setTimer] = useState(sectionsTime["action"]);
  const [intervalId, setIntervalId] = useState<number | null>();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [beforeTimer, setBeforeTimer] = useState<number>(5);
  const [beforeId, setBeforeId] = useState<number | null>();

  const resetInterval = (id: number) => {
    clearInterval(id);
    setIntervalId(null);
  };

  const resetTimer = useCallback(() => {
    Vibration.vibrate(500);
    if (intervalId) resetInterval(intervalId);
    setSection(null);
    setTimer(sectionsTime["action"]);
    setIsPaused(false);
    setRound(1);
    setBackgroundColor("black");
  }, [intervalId, setBackgroundColor]);

  const advanceRound = useCallback(() => {
    if (section) {
      Vibration.vibrate(500);
      if (intervalId) resetInterval(intervalId);

      const nextSection = section === "interval" ? "action" : "interval";

      if (nextSection === "action" && round === numberOfRounds) {
        resetTimer();
        return;
      }

      setSection(nextSection);
      if (nextSection === "action") {
        setRound((prevRound) => prevRound + 1);
        setBackgroundColor("green");
      } else {
        setBackgroundColor("red");
      }
      setTimer(sectionsTime[nextSection]);
    }
  }, [section, resetTimer, round, setBackgroundColor, intervalId]);

  useEffect(() => {
    if (section && !intervalId && !isPaused) {
      const id = setInterval(() => {
        setTimer((prev: number) => {
          if (prev === 0) {
            resetInterval(id);

            if (section) {
              const nextSection =
                section === "interval" ? "action" : "interval";

              setSection(nextSection);

              if (nextSection === "interval") setBackgroundColor("red");

              if (nextSection === "action" && round < numberOfRounds) {
                setBackgroundColor("green");
                setRound((prevRound) => prevRound + 1);
              }

              if (nextSection === "action" && round === numberOfRounds)
                resetTimer();
              return sectionsTime[nextSection];
            }
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
    }
  }, [section, intervalId, isPaused, round, resetTimer, setBackgroundColor]);

  const onPressButton = useCallback(() => {
    if (beforeId) {
      clearInterval(beforeId);
      setBeforeId(null);
    }

    if (!beforeId && (!intervalId || isPaused)) {
      let timerInitial = 5;
      setBeforeTimer(timerInitial);

      const id = setInterval(() => {
        timerInitial -= 1;
        setBeforeTimer(timerInitial);
        Vibration.vibrate(500);
        if (timerInitial === 1) playBell();

        if (timerInitial === 0) {
          if (!section) {
            setSection("action");
            setTimer(sectionsTime["action"]);
            setBackgroundColor("green");
          }
          if (isPaused) {
            setIsPaused(false);
            setBackgroundColor(section === "action" ? "green" : "red");
          }
          setTimeout(() => setBeforeId(null), 300);
          clearInterval(id);
        }
      }, 1000);
      setBeforeId(id);
    } else {
      if (section) setBackgroundColor("orange");
      if (intervalId) resetInterval(intervalId);
      if (beforeId) clearInterval(beforeId);
      Vibration.vibrate(500);
      setBeforeId(null);
      setIsPaused(true);
    }
  }, [intervalId, section, isPaused, setBackgroundColor, beforeId, playBell]);

  return (
    <View style={style.container}>
      <View></View>
      <Text style={style.textTimer}>
        {formattingInTime(beforeId ? beforeTimer : timer)}
      </Text>
      <View style={{ alignItems: "center" }}>
        <Text style={style.textRound}>
          Round {round}/{numberOfRounds}
        </Text>
        <View style={style.containerPressables}>
          {section && isPaused ? (
            <AnimatedPressable onPress={resetTimer}>
              <Ionicons name="refresh" size={75} color="#FFF" />
            </AnimatedPressable>
          ) : (
            <View style={{ width: 80, height: 80 }}></View>
          )}
          <AnimatedPressable onPress={onPressButton}>
            {intervalId || beforeId ? (
              <Ionicons name="pause" size={75} color="#FFF" />
            ) : (
              <Ionicons name="play" size={75} color="#FFF" />
            )}
          </AnimatedPressable>
          {section && isPaused ? (
            <AnimatedPressable onPress={advanceRound} directionStarting="right">
              <Ionicons name="play-forward" size={75} color="#FFF" />
            </AnimatedPressable>
          ) : (
            <View style={{ width: 80, height: 80 }}></View>
          )}
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "85%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textTimer: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 150,
    fontWeight: "bold",
  },
  textRound: {
    color: "#FFF",
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  containerPressables: {
    display: "flex",
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
  },
  pressableAction: {
    backgroundColor: "#FFF",
    width: 80,
    height: 80,
    marginTop: 10,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
