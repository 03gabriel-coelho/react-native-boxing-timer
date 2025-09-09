import formattingInTime from "@/utils/formattingInTime";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

type SectionTypes = "action" | "interval";

const sectionsTime = {
  action: 15,
  interval: 10,
};

const numberOfRounds = 3;

export default function Timer() {
  const [section, setSection] = useState<SectionTypes | null>();
  const [round, setRound] = useState<number>(1);
  const [timer, setTimer] = useState(sectionsTime["action"]);
  const [intervalId, setIntervalId] = useState<number | null>();
  const [isPaused, setIsPaused] = useState<boolean>(false);

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
  }, [intervalId]);

  const advanceRound = useCallback(() => {
    if (section) {
      const nextSection = section === "interval" ? "action" : "interval";

      if (nextSection === "action" && round === numberOfRounds) {
        resetTimer();
        return;
      }

      setSection(nextSection);
      if (nextSection === "action") setRound((prevRound) => prevRound + 1);
      setTimer(sectionsTime[nextSection]);
    }
  }, [section, resetTimer, round]);

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

              if (nextSection === "action" && round < numberOfRounds)
                setRound((prevRound) => prevRound + 1);

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
  }, [section, intervalId, isPaused, round, resetTimer]);

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
      <View style={{ alignItems: "center" }}>
        <Text style={{ color: "#FFF", fontSize: 30 }}>
          Round {round}/{numberOfRounds}
        </Text>
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {section && (
            <Pressable
              onPress={resetTimer}
              style={{ backgroundColor: "#FFF", padding: 10, marginTop: 10 }}
            >
              <Text
                style={{ color: "#000", textAlign: "center", fontSize: 20 }}
              >
                Resetar
              </Text>
            </Pressable>
          )}
          <Pressable
            onPress={onPressButton}
            style={{ backgroundColor: "#FFF", padding: 10, marginTop: 10 }}
          >
            <Text style={{ color: "#000", textAlign: "center", fontSize: 20 }}>
              {intervalId ? "Pausar" : "Iniciar"}
            </Text>
          </Pressable>
          {section && (
            <Pressable
              onPress={advanceRound}
              style={{ backgroundColor: "#FFF", padding: 10, marginTop: 10 }}
            >
              <Text
                style={{ color: "#000", textAlign: "center", fontSize: 20 }}
              >
                Avançar
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
