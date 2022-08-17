import { StatusBar } from "expo-status-bar";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import ManageExpenses from "./screens/ManageExpenses";
import { GlobalStyles } from "./constants/styles";
import Iconbtn from "./icons/Headerbtn";
import ExpenseContextProvider from "./store/expense-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef } from "react";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const margin = 16;
const { width } = Dimensions.get("window");
const tabBarWidth = width - margin * 2;
const tabWidth = tabBarWidth / 2;
function MyTabBar({ state, descriptors, navigation }) {
  const translateX = useRef(new Animated.Value(0)).current;

  const translate = (idx) => {
    Animated.spring(translateX, {
      toValue: idx * tabWidth,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translate(state.index);
    // AsyncStorage.removeItem("expenses");
  }, [state.index]);

  return (
    <View style={styles.tabBar}>
      <Animated.View
        style={[styles.tabslide, { transform: [{ translateX }] }]}
      ></Animated.View>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons
              name={options.tabBarIcon.icon}
              size={24}
              color={isFocused ? "white" : "gray"}
            />
            <Text style={{ color: isFocused ? "white" : "gray" }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function Overview() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={({ navigation }) => ({
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        headerTitleAlign: "center",
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => {
          return (
            <Iconbtn
              icon="add"
              color={tintColor}
              size={24}
              onPress={() => {
                navigation.navigate("Manage Expenses");
              }}
            />
          );
        },
        // tabBarInactiveTintColor: "white",
      })}
    >
      <Tab.Screen
        options={{
          headerTitle: "Recent Expenses",
          title: "Recent",
          tabBarIcon: {
            icon: "hourglass",
          },
        }}
        name="Recent Expenses"
        component={RecentExpenses}
      />
      <Tab.Screen
        options={{
          title: "All",
          headerTitle: "All Expenses",
          tabBarIcon: {
            icon: "calendar",
          },
        }}
        name="All Expenses"
        component={AllExpenses}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ExpenseContextProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        >
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ExpensesOverview"
            component={Overview}
          />
          <Stack.Screen name="Manage Expenses" component={ManageExpenses} />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpenseContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBar: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "white",
    width: tabBarWidth,
    position: "absolute",
    bottom: margin,
    right: margin,
    left: margin,
    overflow: "hidden",
    borderRadius: margin / 2,
    borderWidth: 2,
    borderColor: "white",
  },
  tabslide: {
    backgroundColor: GlobalStyles.colors.primary500,
    width: tabWidth,
    height: "100%",
    borderRadius: margin / 2,
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});
