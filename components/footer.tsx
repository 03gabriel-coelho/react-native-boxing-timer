import { TimerTypes } from "@/types/timer";
import { formattingInTime } from "@/utils/formattingInTime";
import FeatherIcons from "@expo/vector-icons/Feather";
import FontAwesome6Icons from "@expo/vector-icons/FontAwesome6";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import ModalToChange from "./modalToChange";

interface FooterProps {
  backgroundAppColor: string;
  hiddenStatusBar: boolean;
  timer: TimerTypes;
  setTimer: React.Dispatch<React.SetStateAction<TimerTypes>>;
}

export default function Footer({
  backgroundAppColor,
  hiddenStatusBar,
  timer,
  setTimer,
}: FooterProps) {
  const [modalEditAction, setModalEditAction] = useState<boolean>(false);
  const [modalEditInterval, setModalEditInterval] = useState<boolean>(false);
  const positionValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(positionValue, {
      toValue: hiddenStatusBar ? -200 : 10,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [hiddenStatusBar, positionValue]);

  return (
    <Animated.View style={{ ...style.containerFooter, bottom: positionValue }}>
      <ModalToChange
        section="action"
        modalVisible={modalEditAction}
        setModalVisible={setModalEditAction}
        backgroundColorButton={backgroundAppColor}
        timer={timer}
        onSaveTime={(time) =>
          setTimer((prevTimer) => {
            const newActionTime = time.minutes * 60 + time.seconds;

            return {
              ...prevTimer,
              action: newActionTime,
              actualTimer: newActionTime,
              section: prevTimer.section !== null ? "action" : null,
              round: prevTimer.section !== null ? 1 : prevTimer.round,
            };
          })
        }
      />
      <ModalToChange
        section="interval"
        modalVisible={modalEditInterval}
        setModalVisible={setModalEditInterval}
        backgroundColorButton={backgroundAppColor}
        timer={timer}
        onSaveTime={(time) =>
          setTimer((prevTimer) => {
            const newIntervalTime = time.minutes * 60 + time.seconds;

            return {
              ...prevTimer,
              interval: newIntervalTime,
              actualTimer: prevTimer.action,
              section: prevTimer.section !== null ? "action" : null,
              round: prevTimer.section !== null ? 1 : prevTimer.round,
            };
          })
        }
      />
      <TouchableOpacity
        style={{ ...style.pressableActions }}
        onPress={() => {
          setModalEditAction(true);
        }}
      >
        <Text style={{ ...style.textInfo, color: backgroundAppColor }}>
          Ação {formattingInTime(timer.action)}
        </Text>
        <FeatherIcons name="edit-2" size={18} color={backgroundAppColor} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...style.pressableActions }}
        onPress={() => {
          setModalEditInterval(true);
        }}
      >
        <Text style={{ ...style.textInfo, color: backgroundAppColor }}>
          Descanso {formattingInTime(timer.interval)}
        </Text>
        <FeatherIcons name="edit-2" size={18} color={backgroundAppColor} />
      </TouchableOpacity>
      <TouchableOpacity style={{ ...style.pressableActions }}>
        <FontAwesome6Icons name="gear" size={23} color={backgroundAppColor} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const style = StyleSheet.create({
  containerFooter: {
    flexDirection: "row",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
  },
  textInfo: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  pressableActions: {
    backgroundColor: "#FFF",
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
