import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 30,
  },

  container: { flex: 1 },
  subtypecontainerwithimage: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "space-around",
    marginTop: 15,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    width: "70%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    color: "white",
  },

  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  name: {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: 8,
  },

  subtypecontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },

  checkout: {
    alignSelf: "center",
    width: "30%",
    height: 40,
    backgroundColor: "black",
    marginTop: 30,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  checkouttext: { color: "white", fontSize: 18, fontWeight: "500" },
});
