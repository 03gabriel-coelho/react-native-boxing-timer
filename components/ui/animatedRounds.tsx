import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

interface Props {
  round: number;
  numberOfRounds: number;
}

export default function AnimatedRounds({ round, numberOfRounds }: Props) {
  const [actualRound, setActualRound] = useState<number>(round);

  const positionLeft = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const duration = 300;
    if (round >= 2) {
      Animated.timing(positionLeft, {
        toValue: 500,
        duration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

      setTimeout(() => {
        setActualRound(round);
        positionLeft.setValue(-500);
        Animated.timing(positionLeft, {
          toValue: 0,
          duration,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      }, duration);
    } else {
      positionLeft.setValue(-500);
      setActualRound(round);
      Animated.timing(positionLeft, {
        toValue: 0,
        duration,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    }
  }, [round, positionLeft]);

  return (
    <Animated.Text style={[style.textRound, { left: positionLeft }]}>
      Round {actualRound}/{numberOfRounds}
    </Animated.Text>
  );
}

const style = StyleSheet.create({
  textRound: {
    color: "#FFF",
    fontSize: 40,
    bottom: 50,
    fontWeight: "bold",
    fontStyle: "italic",
    position: "relative",
  },
});
