import { Pressable, Text, View } from "react-native";

export default function Timer() {
  const onPressStart = () => {
    console.log("start");
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
        00:00
      </Text>
      <View>
        <Text style={{ color: "#FFF", fontSize: 30 }}>Round 1/12</Text>
        <Pressable
          onPress={onPressStart}
          style={{ backgroundColor: "#FFF", padding: 10, marginTop: 10 }}
        >
          <Text style={{ color: "#000", textAlign: "center", fontSize: 20 }}>
            Iniciar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
