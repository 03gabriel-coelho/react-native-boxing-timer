import formattingInTime from "@/utils/formattingInTime";
import React, { useState } from "react";
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

  const resetInterval = (id: number) => {
    clearInterval(id);
    setTimer(sectionsTime["action"]);
    setSection(null);
    setIntervalId(null);
  };

  console.log(timer, "TIMER");
  console.log(section, "SECTION");

  const continueTimer = () => {
    if (!section) {
      setSection("action");
      setTimer(sectionsTime["action"]);
    }

    const id = setInterval(() => {
      setTimer((prev: number) => {
        console.log(prev, "PREVVVV");
        // console.log(section, "SECTIOOOOOOOOOOONN");
        if (prev === 0) {
          let actualSection = section;

          setSection((prevSection) => {
            if(prevSection === "interval") {
              actualSection = "action";
              return "action";
            }
            actualSection = "interval";
            return "interval";
          });
          console.log(actualSection, 'ACTUAL SECTION')
          if(actualSection) {
            console.log("ENTROU AQUI NO IFFF")
            return sectionsTime[actualSection];
          }

          // if (section === "interval") {
          //   setSection("action");
          //   return sectionsTime["action"];
          // }
          // setSection("interval");
          // return sectionsTime["interval"];
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(id);
  };

  const startingTimer = () => {
    let timerInitial = 5;
    setTimer(timerInitial);

    const id = setInterval(() => {
      timerInitial -= 1;
      setTimer(timerInitial);
      if (timerInitial === 0) {
        continueTimer();
        clearInterval(id);
      }
    }, 1000);
  };

  const onPressButton = () => {
    if (!intervalId) {
      startingTimer();
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
