import { Alert } from "react-native";
import { Emailtest } from "./Emailregextest";

export const ValidationCheckData = ({ phone, email, name, address }) => {
  if (email) {
    if (!Emailtest.test(email)) {
      Alert.alert("Please enter a valid email");
      return false;
    }
  }

  if (!email && !phone) {
    Alert.alert("Please enter either email or phone!");
    return false;
  }

  if (name == "" || address == "") {
    Alert.alert("Please enter name and address!");
    return false;
  }
  return true;
};
