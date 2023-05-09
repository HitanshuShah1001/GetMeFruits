import React from "react";
import { View, Text } from "react-native";
import { styles } from "./displayfruitstyles";

export default function Box({ subtype }) {
  return (
    <View style={styles.box}>
      <View style={{ marginLeft: 8, marginTop: 10 }}>
        <Text style={{ marginBottom: 0, fontSize: 18 }}>
          Price {subtype.pricePerBox}
        </Text>
        <Text style={{ marginBottom: 0, fontSize: 18 }}>
          Available {subtype.availableBoxes}
        </Text>
      </View>
      <View style={styles.name}>
        <Text style={{ color: "green", fontSize: 18 }}>{subtype.name}</Text>
      </View>
    </View>
  );
}
