import { Image, TouchableOpacity, StyleSheet } from "react-native";

function ActionButton(props) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={[
        styles.actionButton,
        props.disabled
          ? (props.disabledColor && { backgroundColor: props.disabledColor }) ||
            styles.defaultDisabledColor
          : (props.enabledColor && { backgroundColor: props.enabledColor }) ||
            styles.defaultEnabledColor,
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
  defaultEnabledColor: {
    backgroundColor: "#FFF",
  },
  defaultDisabledColor: {
    backgroundColor: "#FFFFFF55",
  },
});
