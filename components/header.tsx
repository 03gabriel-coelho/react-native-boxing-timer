import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={{ width: "100%" }}>
      <Text style={style.text}>Boxe Clássico</Text>
      <View style={style.containerInfo}>
        <Text style={style.textInfo}>Ação 3:00</Text>
        <Text style={style.textInfo}>Descanso 01:00</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
  },
  containerInfo: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  textInfo: {
    color: "#FFF",
    fontSize: 20,
  },
});
