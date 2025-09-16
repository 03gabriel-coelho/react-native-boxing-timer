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

interface Props {
  backgroundAppColor: string;
  hiddenStatusBar: boolean;
}

export default function Header({ backgroundAppColor, hiddenStatusBar }: Props) {
  const [modalEditAction, setModalEditAction] = useState<boolean>(false);
  const positionValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(positionValue, {
      toValue: hiddenStatusBar ? 500 : 0,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [hiddenStatusBar, positionValue]);

  return (
    <Animated.View style={{ ...style.containerInfo, bottom: positionValue }}>
      <ModalToChange
        modalVisible={modalEditAction}
        setModalVisible={setModalEditAction}
      />
      <TouchableOpacity
        style={{ ...style.pressableActions }}
        onPress={() => {
          setModalEditAction(true);
        }}
      >
        <Text style={{ ...style.textInfo, color: backgroundAppColor }}>
          Ação 3:00
        </Text>
        <FeatherIcons name="edit-2" size={18} color={backgroundAppColor} />
      </TouchableOpacity>
      <TouchableOpacity style={{ ...style.pressableActions }}>
        <Text style={{ ...style.textInfo, color: backgroundAppColor }}>
          Descanso 01:00
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
  containerInfo: {
    flexDirection: "row",
    width: "100%",
    paddingTop: 20,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    position: "relative",
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
