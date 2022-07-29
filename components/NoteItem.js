import { StyleSheet, View, Text, Pressable } from "react-native";

function NoteItem(props) {
  return (
    <View style={styles.noteItem}>
      <Pressable
        android_ripple={{ color: "#5F6368" }}
        onLongPress={() => props.onDeleteItem(props.id)}
      >
        <Text style={styles.noteText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default NoteItem;

const styles = StyleSheet.create({
  noteItem: {
    margin: 3,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#535353",
    backgroundColor: "#202124",
  },
  pressableItem: {
    opacity: 0.5,
  },
  noteText: {
    fontWeight: "bold",
    padding: 10,
    color: "white",
  },
});
