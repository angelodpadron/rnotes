import { StyleSheet, View, Text, Pressable } from "react-native";

function NoteItem({
  onSelectNote,
  onEditItem,
  selectedNotes,
  id,
  title,
  text,
}) {
  const onSelectionHandler = () => onSelectNote(id);
  const isSelected = () =>
    selectedNotes.some((selectedId) => selectedId === id);
  const onPressHandler = () => {
    if (selectedNotes.length) {
      onSelectionHandler();
    } else {
      onEditItem(id);
    }
  };

  return (
    <View style={[styles.noteItem, isSelected() ? styles.selected : {}]}>
      <Pressable
        android_ripple={{ color: "#5F6368", borderless: true }}
        onPress={onPressHandler}
        onLongPress={() => onSelectionHandler()}
      >
        <Text style={styles.noteTitle}>{title}</Text>
        <Text numberOfLines={25} style={styles.noteText}>
          {text}
        </Text>
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
    fontWeight: "bold",
    color: "white",
  },
  noteText: {
    padding: 10,
    color: "white",
  },
  selected: {
    borderColor: "#FFF",
    backgroundColor: "#535353",
  },
});
