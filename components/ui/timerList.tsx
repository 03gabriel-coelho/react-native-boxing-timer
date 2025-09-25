import { useRef } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
  VirtualizedList,
} from "react-native";

const Item = ({ title }: any) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const getItem = (_data: unknown, index: number) => ({
  id: index + 1,
  title: `${index + 1 < 10 ? "0" : ""}${index + 1}`,
});

const getItemCount = (_data: unknown) => 60;

export default function TimerList() {
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

    scrollRef?.scrollTo({ y: nextValue, animated: true });

    console.log(nextValue / 40 + 2, 'VALOR SELECIONADO!!!')
  };

  return (
    <VirtualizedList
      style={{ height: 120 }}
      ref={listRef}
      initialNumToRender={3}
      renderItem={(data) => {
        // console.log(data, "DATA");
        return <Item title={data.item.title} />;
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
      getItem={getItem}
      initialScrollIndex={30 - 2} // 30 VALOR DEFAULT
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
    // padding: 20,
  },
  title: {
    fontSize: 20,
  },
});
