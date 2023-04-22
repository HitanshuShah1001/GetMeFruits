import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { axiosclient } from "../AxiosClient";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function DisplayFruits() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [fruits, setFruits] = useState([]);
  const [fruit, setFruit] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [subtypes, setSubtypes] = useState([]);
  const [selectedsubtypes, setSelectedsubtypes] = useState([]);
  const [selectedsubtypestosend, setSelectedsubtypestosend] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [totalprice, setTotalprice] = useState();
  useEffect(() => {
    setLoading(true);
    axiosclient
      .get("/fruit/list")
      .then((res) => {
        setFruits(res.fruits);
      })
      .finally(() => setLoading(false));
  }, []);

  const updatedsubtypestosend = (item) => {
    let temp = subtypes.filter((subtype) => item.includes(subtype.name));
    setSelectedsubtypestosend(temp);
  };

  const changePrice = (indsubtype, val) => {
    setTotalprice(
      (totalprice) =>
        totalprice + parseFloat(indsubtype.pricePerBox) * parseFloat(val)
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 20,
        alignItems: "center",
      }}
    >
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        selectedTextStyle={styles.selectedTextStyle}
        data={fruits}
        maxHeight={300}
        placeholder={"Select Fruit"}
        searchPlaceholder="Search..."
        labelField="name"
        valueField="name"
        value={fruit}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setSubtypes(item?.subTypes);
          setFruit(item);
          setSelectedsubtypestosend([]);
          setSelectedsubtypes([]);
        }}
      />
      {subtypes.length !== 0 && (
        <MultiSelect
          style={[
            styles.dropdown,
            isFocus && { borderColor: "blue" },
            { marginTop: 20 },
          ]}
          search
          selectedTextStyle={styles.selectedTextStyle}
          data={subtypes}
          maxHeight={300}
          placeholder={"Select Subtypes"}
          searchPlaceholder="Search..."
          labelField="name"
          valueField="name"
          value={selectedsubtypes}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setSelectedsubtypes(item);
            updatedsubtypestosend(item);
          }}
        />
      )}

      {selectedsubtypestosend.map((indsubtype, index) => {
        return (
          <View
            style={{
              width: "95%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,

              alignItems: "center",
              marginTop: 20,
              backgroundColor: "yellow",
              borderRadius: 15,
            }}
            key={index}
          >
            <View style={{ marginVertical: 10 }}>
              <Text>{indsubtype.name}</Text>
              <Text>Available Boxes :- {indsubtype.availableBoxes}</Text>
              <Text>Price per box :- {indsubtype.pricePerBox}</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                width: "80%",
                alignItems: "center",
              }}
            >
              <TextInput
                value={indsubtype?.boxes}
                onChangeText={(val) => {
                  console.log(val, ":val");
                  indsubtype.boxes = val;
                }}
                style={{
                  width: "50%",
                  backgroundColor: "black",
                  color: "white",
                  paddingHorizontal: 10,
                  height: 30,
                  borderRadius: 13,
                  textAlign: "center",
                }}
                placeholder="Enter quantity"
                placeholderTextColor={"white"}
              />
            </View>
          </View>
        );
      })}
      <Text>Total cost is {totalprice}</Text>
      {selectedsubtypestosend.length !== 0 && (
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
          onPress={() =>
            navigation.navigate("Confirm-Order", {
              fruitname: fruit.name,
              id: fruit._id,
              subtypes: selectedsubtypestosend,
            })
          }
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
            Checkout
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
