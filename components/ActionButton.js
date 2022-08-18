import { Image, TouchableOpacity, StyleSheet } from "react-native";

function ActionButton({
  disabled,
  onPress,
  imagePath,
  disabledColor,
  enabledColor,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.actionButton,
        disabled
          ? (disabledColor && { backgroundColor: disabledColor }) ||
            styles.defaultDisabledColor
          : (enabledColor && { backgroundColor: enabledColor }) ||
            styles.defaultEnabledColor,
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Image source={imagePath} />
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
    borderRadius: 15,
  },
  defaultEnabledColor: {
    backgroundColor: "#FFF",
  },
  defaultDisabledColor: {
    backgroundColor: "#FFFFFF55",
  },
});
