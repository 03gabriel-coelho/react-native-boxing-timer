import { useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet } from "react-native";

interface Props {
  children: any;
  onPress: (event: any) => void;
  disabled?: boolean;
}

export default function AnimatedPressable({
  children,
  onPress,
  disabled,
}: Props) {
  const size = useRef(new Animated.Value(80)).current;

  return (
    <Animated.View style={{ ...style.view, width: size, height: size }}>
      <Pressable
        onPress={(event) => {
          Animated.timing(size, {
            toValue: 88,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start();

          setTimeout(() => {
            Animated.timing(size, {
              toValue: 80,
              duration: 300,
              easing: Easing.linear,
              useNativeDriver: false,
            }).start();
          }, 310);
          onPress(event);
        }}
        disabled={disabled}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

const style = StyleSheet.create({
  view: {
    width: 80,
    height: 80,
    marginTop: 10,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
