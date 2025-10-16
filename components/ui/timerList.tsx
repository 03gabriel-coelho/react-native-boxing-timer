import { useCallback, useEffect, useRef, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from "react-native";

const Item = ({ title, id, scrollY }: any) => {
  // console.log(id, selectedValue, 'aaa')

  const idHeight = id * 40;

  const isSelected = scrollY >= idHeight - 60 && scrollY < idHeight - 20;

  const opacityText = isSelected ? 1 : 0.3;
 
  const fontSize = isSelected ? 24 : 20;
  
  return (
    <View style={styles.item}>
      <Text
        style={{
          ...styles.title,
          color: `rgba(0, 0, 0, ${opacityText})`,
          fontSize,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const getItem = (_data: unknown, index: number) => ({
  id: index,
  title:
    index === 0 || index === 62
      ? ""
      : `${index - 1 < 10 ? "0" : ""}${index - 1}`,
});

const getItemCount = (data: any) => 63;

interface TimeListProps {
  type: "minutes" | "seconds";
  time: {
    minutes: number;
    seconds: number;
  };
  onChangeTime: (time: number) => void;
}

export default function TimeList({ type, time, onChangeTime }: TimeListProps) {
  const [scrollY, setScrollY] = useState(0);
  const listRef = useRef<VirtualizedList<any>>(null);

  const onScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollValue = event.nativeEvent.contentOffset.y;

    const isCentralized = scrollValue % 40;

    const scrollRef = listRef?.current?.getScrollRef() as ScrollView;

    let nextValue = scrollValue;

    if (isCentralized > 20) {
      nextValue = nextValue - isCentralized + 40;
    } else {
      nextValue = nextValue - isCentralized;
    }

    scrollRef?.scrollTo({ y: nextValue });

    onChangeTime(nextValue / 40);
  };

  const validateInvalidNumber = useCallback(() => {
    const scrollRef = listRef?.current?.getScrollRef() as ScrollView;

    if (!time.minutes && !time.seconds && type === "minutes") {
      scrollRef?.scrollTo({ y: 40 });
    }
  }, [time, type]);

  useEffect(() => {
    validateInvalidNumber();
  }, [time, validateInvalidNumber]);

  return (
    <VirtualizedList
      style={{ height: 120, width: 100 }}
      ref={listRef}
      initialNumToRender={3}
      showsVerticalScrollIndicator={false}
      renderItem={(data) => {
        return (
          <Item title={data.item.title} id={data.item.id} scrollY={scrollY} />
        );
      }}
      keyExtractor={(item: any) => {
        return item.id;
      }}
      getItemLayout={(_data: any, index: number) => {
        return {
          length: 40,
          offset: 40 * index,
          index,
        };
      }}
      getItemCount={getItemCount}
      onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
      getItem={getItem}
      initialScrollIndex={time[type]}
      onMomentumScrollEnd={onScrollEnd}
      scrollEventThrottle={16}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
});
