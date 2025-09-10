import formattingInTime from "@/utils/formattingInTime";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

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
  const [section, setSection] = useState<SectionTypes | null>();
  const [round, setRound] = useState<number>(1);
  const [timer, setTimer] = useState(sectionsTime["action"]);
  const [intervalId, setIntervalId] = useState<number | null>();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [disableStartButton, setDisableStartButton] = useState<boolean>(false);

  const resetInterval = (id: number) => {
    clearInterval(id);
    setIntervalId(null);
  };

  const resetTimer = useCallback(() => {
    if (intervalId) resetInterval(intervalId);
    setSection(null);
    setTimer(sectionsTime["action"]);
    setIsPaused(false);
    setRound(1);
    setBackgroundColor("black");
  }, [intervalId, setBackgroundColor]);

  const advanceRound = useCallback(() => {
    if (section) {
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
  }, [section, resetTimer, round, setBackgroundColor]);

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
    if (!intervalId || isPaused) {
      const beforeTimer = timer;
      let timerInitial = 5;
      setTimer(timerInitial);
      setDisableStartButton(true);

      const id = setInterval(() => {
        timerInitial -= 1;
        setTimer(timerInitial);
        if (timerInitial === 0) {
          if (!section) {
            setSection("action");
            setTimer(sectionsTime["action"]);
            setBackgroundColor("green");
          }
          if (isPaused) {
            setTimer(beforeTimer);
            setIsPaused(false);
            setBackgroundColor("green");
          }
          setDisableStartButton(false);
          clearInterval(id);
        }
      }, 1000);
    } else {
      setBackgroundColor("orange");
      resetInterval(intervalId);
      setIsPaused(true);
    }
  }, [intervalId, section, isPaused, timer, setBackgroundColor]);

  return (
    <View
      style={{
        flexDirection: "column",
        height: "80%",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#FFF", textAlign: "center", fontSize: 150 }}>
        {formattingInTime(timer)}
      </Text>
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "#FFF", fontSize: 30 }}>
          Round {round}/{numberOfRounds}
        </Text>
        <View
          style={{
            display: "flex",
            width: "95%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {section && (
            <Pressable
              onPress={resetTimer}
              style={{
                backgroundColor: "#FFF",
                padding: 15,
                marginTop: 10,
                borderRadius: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="refresh" size={50} color="black" />
            </Pressable>
          )}
          <Pressable
            onPress={onPressButton}
            disabled={disableStartButton}
            style={{
              backgroundColor: "#FFF",
              padding: 15,
              marginTop: 10,
              borderRadius: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {intervalId ? (
              <Ionicons name="pause" size={50} color="black" />
            ) : (
              <Ionicons name="play" size={50} color="black" />
            )}
          </Pressable>
          {section && (
            <Pressable
              onPress={advanceRound}
              style={{
                backgroundColor: "#FFF",
                padding: 15,
                marginTop: 10,
                borderRadius: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="play-forward" size={50} color="black" />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
