import { useRef, useState } from "react";
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

interface TimerListProps {
  defaultTimer: number;
}

export default function TimerList({ defaultTimer }: TimerListProps) {
  const [scrollY, setScrollY] = useState(0);
  const [selectedTimer, setSelectedTimer] = useState<number>(defaultTimer);
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

    // console.log(nextValue, 'NEXT VALUE'); ERRO NA ANIMAÇÃO FICAR RETORNANDO ONDE ESTAVA ANTES DE ROLAR
    // console.log(scrollY, 'SCROLL ATUAL')

    scrollRef?.scrollTo({ y: nextValue});

    setSelectedTimer(nextValue / 40);
  };

  return (
    <VirtualizedList
      style={{ height: 120, width: 100 }}
      ref={listRef}
      initialNumToRender={3}
      showsVerticalScrollIndicator={false}
      renderItem={(data) => {
        // console.log(data.separators, 'DATA')
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
      initialScrollIndex={defaultTimer} // 30 VALOR DEFAULT
      // onScrollEndDrag={onScrollEnd}
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
