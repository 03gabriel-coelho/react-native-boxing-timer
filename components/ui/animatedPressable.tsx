import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  children: any;
  onPress: (event: any) => void;
  disabled?: boolean;
  directionStarting?: "left" | "right" | "bottom" | "top";
  styleAnimated?: StyleSheet;
  visible: boolean;
}

export default function AnimatedPressable({
  children,
  onPress,
  disabled,
  directionStarting,
  styleAnimated,
  visible,
}: Props) {
  const size = useRef(new Animated.Value(80)).current;
  const position = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(position, {
        toValue: 0,
        duration: 350,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(position, {
        toValue: -200,
        duration: 350,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [position, visible]);

  return (
    <Animated.View
      style={{
        ...style.view,
        ...styleAnimated,
        width: size,
        height: size,
        [directionStarting || "left"]: position,
      }}
    >
      <TouchableOpacity
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
      </TouchableOpacity>
    </Animated.View>
  );
}

const style = StyleSheet.create({
  view: {
    position: "relative",
    width: 80,
    height: 80,
    marginTop: 10,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
