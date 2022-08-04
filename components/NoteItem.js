import { StyleSheet, View, Text, Pressable } from "react-native";

function NoteItem(props) {
  return (
    <View style={styles.noteItem}>
      <Pressable
        android_ripple={{ color: "#5F6368" }}
        onTouchEnd={() => props.onEditItem(props.id)}
        onLongPress={() => props.onDeleteItem(props.id)}
      >
        <Text style={styles.noteTitle}>{props.title || "Untitled"}</Text>
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
  noteTitle: {
    fontSize: 20,
    padding: 10,
    color: "white",
  },
  noteText: {
    padding: 10,
    color: "white",
  },
});
