import { Text, View } from "react-native";

export default function Header() {
  return (
    <View style={{ width: "100%" }}>
      <Text
        style={{
          textAlign: "center",
          color: "#FFF",
          fontWeight: "bold",
          fontSize: 15,
          marginTop: 10,
        }}
      >
        Boxe Clássico
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 50,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFF", fontSize: 20 }}>Ação 3:00</Text>
        <Text style={{ color: "#FFF", fontSize: 20 }}>Descanso 01:00</Text>
      </View>
    </View>
  );
}
