import React, { useEffect, useRef, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Phone from "react-native-phone-number-input";
import { axiosclient } from "../AxiosClient";
import { useNavigation } from "@react-navigation/native";

export default function CompleteOrder(props) {
  console.log(props.route.params, "paramsss");
  const navigation = useNavigation();
  const { id, fruitname, subtypes } = props.route.params;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const phoneInput = useRef(null);
  const Order = async () => {
    let newsubtypes = [];
    for (let fruitobject of subtypes) {
      let temp = {};
      for (let key of Object.keys(fruitobject)) {
        if (["name", "_id", "boxes"].includes(key)) {
          if (key == "_id") {
            temp["id"] = fruitobject[key];
          } else {
            temp[key] = fruitobject[key];
          }
        }
      }
      newsubtypes.push(temp);
    }

    let body = {
      name,
      address,
      email,
      fruit: {
        name: fruitname,
        subTypes: newsubtypes,
      },
    };
    console.log(body, id);
    axiosclient.post(`/order/${id}`, body).then((res) => {
      Alert.alert("Order placed succesfully");
      navigation.goBack();
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", paddingVertical: 10 }}>
      <TextInput
        style={{
          width: "80%",
          height: 40,
          borderRadius: 13,
          backgroundColor: "white",
          paddingHorizontal: 10,
        }}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter Name of the receiver (Required)"
      />
      <TextInput
        style={{
          width: "80%",
          height: 40,
          borderRadius: 13,
          backgroundColor: "white",
          paddingHorizontal: 10,
          marginTop: 20,
        }}
        value={address}
        onChangeText={(text) => setAddress(text)}
        placeholder="Enter Address of the receiver (Required)"
      />
      <TextInput
        style={{
          width: "80%",
          height: 40,
          borderRadius: 13,
          backgroundColor: "white",
          paddingHorizontal: 10,
          marginTop: 20,
        }}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter Email of the receiver"
      />
      <Phone
        ref={phoneInput}
        defaultValue={phone}
        defaultCode={"CY"}
        layout="first"
        onChangeFormattedText={(text) => {
          setPhone(text);
        }}
        containerStyle={{ marginTop: 20 }}
      />
      <TouchableOpacity
        style={{
          alignSelf: "center",
          width: "30%",
          height: 40,
          backgroundColor: "black",
          marginTop: 30,
          borderRadius: 13,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => Order()}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
          Order
        </Text>
      </TouchableOpacity>
    </View>
  );
}
