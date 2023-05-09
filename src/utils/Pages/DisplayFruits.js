/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Text, View, Image, TextInput, ScrollView } from "react-native";
import Phone from "react-native-phone-number-input";
import { ValidationCheckData } from "../ValidationCheckdata";
import { styles } from "./displayfruitstyles";
import { LinearGradient } from "expo-linear-gradient";
import Box from "./Box";
import Checkout from "./Checkout";

export default function DisplayFruits() {
  const [fruitname, setFruitName] = useState("");

  const [fruits, setFruits] = useState([]);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [newsubtypes, setNewsbtypes] = useState([]);
  const [orderplaced, setOrderplaced] = useState(false);
  const [loadingfruit, setLoadingfruit] = useState(false);
  const phoneInput = useRef(null);

  function promisifiedFunction(subtypes) {
    return new Promise((resolve, reject) => {
      let modifiedsubtypes = [];
      try {
        for (let fruitobject of subtypes) {
          let temp = {};
          for (let key of Object.keys(fruitobject)) {
            if (fruitobject["boxes"] !== "") {
              if (["name", "_id", "boxes"].includes(key)) {
                if (key === "_id") {
                  temp["id"] = fruitobject[key];
                } else {
                  temp[key] = fruitobject[key];
                }
              }
            } else {
              break;
            }
          }

          if (Object.keys(temp).length > 0) {
            modifiedsubtypes.push(temp);
          }
        }
        resolve(modifiedsubtypes);
      } catch (error) {
        reject(error);
      }
    });
  }

  const addPropertyToArray = (subTypes) => {
    return new Promise((resolve, reject) => {
      let arr = [];
      try {
        subTypes.map((subType) => {
          arr.push({ ...subType, boxes: "" });
        });
        resolve(arr);
      } catch (e) {
        reject(e);
      }
    });
  };

  const Order = async () => {
    promisifiedFunction(newsubtypes).then((modifiedsubtypes) => {
      if (modifiedsubtypes.length > 0) {
        let body = {
          name,
          address,
          fruit: {
            name: fruitname,
            subTypes: modifiedsubtypes,
          },
        };
        if (email) {
          body.email = email;
        }
        if (phone) {
          body.phone = phone;
        }
        let willreceive = email ? `email` : "sms";
        if (ValidationCheckData({ phone, email, name, address })) {
          axios
            .post(`https://fruitmanagement.herokuapp.com/order/${id}`, body)
            .then((res) => {
              alert(
                `Order placed succesfully,You will receive an ${willreceive} with the details`
              );
              setName("");
              setFruitName("");
              setAddress("");
              setEmail("");
              setPhone("");

              setFruits([]);

              setOrderplaced(!orderplaced);
            })
            .catch((e) => {
              console.log(e.response.data.error);
              alert(e?.response?.data?.error);
            });
        }
      }
    });
  };

  useEffect(() => {
    setLoadingfruit(true);
    axios
      .get("https://fruitmanagement.herokuapp.com/fruit/list")
      .then((response) => {
        setFruitName(response.data.fruits[0].name);
        setFruits(response.data.fruits);
        setId(response.data.fruits[0]._id);
        addPropertyToArray(response?.data?.fruits[0]?.subTypes).then((arr) =>
          setNewsbtypes(arr)
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoadingfruit(false);
      });
  }, [orderplaced]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={["#c2e59c", "#64b3f4"]}
      >
        {fruits.map((fruit) => (
          <>
            <Text style={styles.header}>{fruit.name}</Text>
            <View style={styles.subtypecontainer}>
              {newsubtypes.map((subtype, index) => {
                return (
                  <View style={styles.subtypecontainerwithimage} key={index}>
                    <Image
                      source={{
                        uri: `https://fruitmanagement.herokuapp.com/${subtype.imageUrl}`,
                      }}
                      style={{ borderRadius: 10 }}
                      height={150}
                      width={"100%"}
                    />
                    <Box subtype={subtype} />
                    <TextInput
                      onChangeText={(val) => (subtype.boxes = val)}
                      placeholder="Enter quantity"
                      style={styles.input}
                    />
                  </View>
                );
              })}
            </View>
          </>
        ))}
        <View style={{ alignItems: "center", marginTop: 17 }}>
          <TextInput
            onChangeText={(val) => setName(val)}
            placeholder="Enter Name"
            value={name}
            style={styles.input}
          />
          <TextInput
            onChangeText={(val) => setAddress(val)}
            placeholder="Enter Address"
            style={styles.input}
          />
          <TextInput
            onChangeText={(val) => setEmail(val)}
            placeholder="Enter Email"
            style={styles.input}
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

          <Checkout onClick={() => Order()} />
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
