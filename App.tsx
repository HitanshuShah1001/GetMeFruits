import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import DisplayFruits from "./src/utils/Pages/DisplayFruits";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CompleteOrder from "./src/utils/Pages/CompleteOrder";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Order Fruit" component={DisplayFruits} />
        <Stack.Screen name="Confirm-Order" component={CompleteOrder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return <DisplayFruits />;
}
