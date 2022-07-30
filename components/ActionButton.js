import { Image, TouchableOpacity, StyleSheet } from "react-native";

function ActionButton(props) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[
        styles.actionButton,
        props.disabled ? styles.disabled : styles.enabled,
      ]}
      activeOpacity={0.7}
      onPress={props.onPress}
    >
      <Image source={props.imagePath} />
    </TouchableOpacity>
  );
}

export default ActionButton;

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  enabled: {
    backgroundColor: "#FFF",
  },
  disabled: {
    backgroundColor: "#FFFFFF55",
  },
});
