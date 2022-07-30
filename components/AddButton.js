import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

function AddButton(props) {
  return (
    <TouchableOpacity
      style={styles.addButton}
      activeOpacity={0.7}
      onPress={props.onPress}
    >
      <Image source={require("../assets/plus-thick.png")} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 100,
    elevation: 3,
    zIndex: 3,
    backgroundColor: "#fff",
  },
});

export default AddButton;
