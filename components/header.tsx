import FeatherIcons from "@expo/vector-icons/Feather";
import FontAwesome6Icons from "@expo/vector-icons/FontAwesome6";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  backgroundAppColor: string;
}

export default function Header({ backgroundAppColor }: Props) {
  return (
    <View style={style.containerInfo}>
      <Pressable style={{ ...style.pressableActions }}>
        <Text style={{ ...style.textInfo, color: backgroundAppColor }}>
          Ação 3:00
        </Text>
        <FeatherIcons name="edit-2" size={18} color={backgroundAppColor} />
      </Pressable>
      <Pressable style={{ ...style.pressableActions }}>
        <Text style={{ ...style.textInfo, color: backgroundAppColor }}>
          Descanso 01:00
        </Text>
        <FeatherIcons name="edit-2" size={18} color={backgroundAppColor} />
      </Pressable>
      <Pressable style={{ ...style.pressableActions }}>
        <FontAwesome6Icons name="gear" size={23} color={backgroundAppColor} />
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  containerInfo: {
    flexDirection: "row",
    width: "100%",
    // height: 50,
    paddingTop: 20,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
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
