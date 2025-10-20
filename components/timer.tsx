import useBellSound from "@/hooks/useBellSound";
import { TimerTypes } from "@/types/timer";
import { formattingInTime } from "@/utils/formattingInTime";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Vibration,
  View,
  useWindowDimensions,
} from "react-native";
import AnimatedPressable from "./ui/animatedPressable";
import AnimatedRounds from "./ui/animatedRounds";

const numberOfRounds = 12;

export default function Timer({
  setBackgroundColor,
  setHiddenStatusBar,
  setTimer,
  timer,
}: {
  setBackgroundColor: (color: string) => void;
  setHiddenStatusBar: (status: boolean) => void;
  setTimer: React.Dispatch<React.SetStateAction<TimerTypes>>;
  timer: TimerTypes;
}) {
  const { playBell } = useBellSound();
  const { width } = useWindowDimensions();
  const [intervalId, setIntervalId] = useState<number | null>();
  const [beforeTimer, setBeforeTimer] = useState<number>(timer.beforeTimer);
  const [beforeId, setBeforeId] = useState<number | null>();

  const resetInterval = (id: number) => {
    clearInterval(id);
    setIntervalId(null);
  };

  const resetTimer = useCallback(() => {
    Vibration.vibrate(100);
    if (intervalId) resetInterval(intervalId);
    setTimer((prevTimer) => ({
      ...prevTimer,
      actualTimer: prevTimer.action,
      section: null,
      round: 1,
      isPaused: false,
    }));
    setBackgroundColor("black");
  }, [intervalId, setBackgroundColor, setTimer]);

  const advanceRound = useCallback(() => {
    if (timer.section) {
      Vibration.vibrate(100);
      if (intervalId) resetInterval(intervalId);

      const nextSection = timer.section === "interval" ? "action" : "interval";

      if (nextSection === "action" && timer.round === numberOfRounds) {
        resetTimer();
        return;
      }

      setTimer((prevTimer) => ({
        ...prevTimer,
        section: nextSection,
      }));
      if (nextSection === "action") {
        setTimer((prevTimer) => ({
          ...prevTimer,
          round: prevTimer.round + 1,
        }));
        setBackgroundColor("green");
      } else {
        setBackgroundColor("red");
      }

      setTimer((prevTimer) => ({
        ...prevTimer,
        actualTimer: prevTimer[nextSection],
      }));
    }
  }, [
    resetTimer,
    timer.round,
    setBackgroundColor,
    intervalId,
    setTimer,
    timer.section,
  ]);

  useEffect(() => {
    if (timer.section && !intervalId && !timer.isPaused) {
      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer.actualTimer === 1) playBell();
          if (prevTimer.actualTimer === 0) {
            resetInterval(id);

            if (timer.section) {
              const nextSection =
                timer.section === "interval" ? "action" : "interval";
              Vibration.vibrate(1000);
              setTimer((prevTimer) => ({ ...prevTimer, section: nextSection }));

              if (nextSection === "interval") setBackgroundColor("red");

              if (nextSection === "action" && timer.round < numberOfRounds) {
                setBackgroundColor("green");
                setTimer((prevTimer) => ({
                  ...prevTimer,
                  round: prevTimer.round + 1,
                }));
              }

              if (nextSection === "action" && timer.round === numberOfRounds)
                resetTimer();

              return {
                ...prevTimer,
                actualTimer: prevTimer[nextSection],
              };
            }
          }

          return {
            ...prevTimer,
            actualTimer: prevTimer.actualTimer - 1,
          };
        });
      }, 1000);
      setIntervalId(id);
    }
  }, [
    timer.section,
    intervalId,
    timer.isPaused,
    timer.round,
    resetTimer,
    setBackgroundColor,
    playBell,
    setTimer,
  ]);

  const onPressMainButton = useCallback(() => {
    if (beforeId) {
      clearInterval(beforeId);
      setBeforeId(null);
    }

    if (!beforeId && (!intervalId || timer.isPaused)) {
      let timerInitial = timer.beforeTimer;
      setBeforeTimer(timerInitial);

      const id = setInterval(() => {
        timerInitial -= 1;
        setBeforeTimer(timerInitial);
        Vibration.vibrate(100);
        if (timerInitial === 1) playBell();

        if (timerInitial === 0) {
          if (!timer.section) {
            setTimer((prevTimer) => ({
              ...prevTimer,
              actualTimer: prevTimer["action"],
              section: "action",
            }));
            setTimeout(() => setBackgroundColor("green"), 500);
          }
          if (timer.isPaused) {
            setTimer((prevTimer) => ({
              ...prevTimer,
              isPaused: false,
            }));
            setTimeout(
              () =>
                setBackgroundColor(
                  timer.section === "action" ? "green" : "red"
                ),
              500
            );
          }
          setTimeout(() => setBeforeId(null), 300);
          setHiddenStatusBar(true);
          clearInterval(id);
        }
      }, 1000);
      setBeforeId(id);
    } else {
      setHiddenStatusBar(false);
      if (timer.section) setBackgroundColor("orange");
      if (intervalId) resetInterval(intervalId);
      if (beforeId) clearInterval(beforeId);
      Vibration.vibrate(100);
      setBeforeId(null);
      setTimer((prevTimer) => ({
        ...prevTimer,
        isPaused: true,
      }));
    }
  }, [
    intervalId,
    timer.section,
    timer.isPaused,
    timer.beforeTimer,
    setBackgroundColor,
    beforeId,
    playBell,
    setHiddenStatusBar,
    setTimer,
  ]);

  return (
    <View style={style.container}>
      <View></View>
      <Text style={{ ...style.textTimer, fontSize: width * 0.37 }}>
        {formattingInTime(beforeId ? beforeTimer : timer.actualTimer)}
      </Text>
      <View style={{ alignItems: "center" }}>
        <AnimatedRounds round={timer.round} numberOfRounds={numberOfRounds} />
        <View style={style.containerPressables}>
          <AnimatedPressable
            onPress={resetTimer}
            directionStarting="left"
            visible={!!(timer.section && timer.isPaused)}
          >
            <Ionicons name="refresh" size={75} color="#FFF" />
          </AnimatedPressable>
          {!(timer.section && timer.isPaused) && (
            <View style={{ width: 80, height: 80 }}></View>
          )}
          <AnimatedPressable
            onPress={onPressMainButton}
            directionStarting="bottom"
            visible
          >
            {intervalId || beforeId ? (
              <Ionicons name="pause" size={75} color="#FFF" />
            ) : (
              <Ionicons name="play" size={75} color="#FFF" />
            )}
          </AnimatedPressable>
          <AnimatedPressable
            onPress={advanceRound}
            directionStarting="right"
            visible={!!(timer.section && timer.isPaused)}
          >
            <Ionicons name="play-forward" size={75} color="#FFF" />
          </AnimatedPressable>
          {!(timer.section && timer.isPaused) && (
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
    fontWeight: "bold",
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
