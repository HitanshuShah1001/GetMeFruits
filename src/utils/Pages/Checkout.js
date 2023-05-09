import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./displayfruitstyles";

export default function Checkout({ onClick }) {
  return (
    <TouchableOpacity style={styles.checkout} onPress={onClick}>
      <Text style={styles.checkouttext}>Order</Text>
    </TouchableOpacity>
  );
}
