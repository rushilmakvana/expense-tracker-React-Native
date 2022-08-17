import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

export default function Iconbtn({ size, color, onPress, icon }) {
  return (
    <Pressable
      onPress={onPress}
      //   android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => (pressed ? { opacity: 0.75 } : null)}
    >
      <View style={styles.container}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 3,
    // borderWidth: 2,
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
