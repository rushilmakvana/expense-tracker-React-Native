import { Animated, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import ExpenseItem from "./ExpenseItem";

const height = 67;
const ExpanseList = ({ expenses }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    // <View style={styles.container}>
    <Animated.FlatList
      style={styles.container}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      // style={styles.container}
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => {
        const inputRange = [0, height * index, height * (index + 2)];
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [1, 1, 0],
        });
        const opacityRange = [0, height * index, height * (index + 1)];
        const opacity = scrollY.interpolate({
          inputRange: opacityRange,
          outputRange: [1, 1, 0],
        });
        return <ExpenseItem {...item} opacity={opacity} scale={scale} />;
      }}
    />
    // </View>
  );
};

export default ExpanseList;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 16,
    marginBottom: 90,
  },
});
