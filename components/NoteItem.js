import { StyleSheet, View, Text, Pressable, ToastAndroid } from "react-native";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";

function NoteItem(props) {
  const [isSelected, setIsSelected] = useState(false);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(props.title + "\n\n" + props.text);
  };

  const onSelectionHandler = () => {
    setIsSelected(!isSelected);
    props.onSelectNote(props.id)
  };

  return (
    <View style={[styles.noteItem, isSelected ? styles.selected : {}]}>
      <Pressable
        android_ripple={{ color: "#5F6368", borderless: true }}
        onPress={() => {
          props.onEditItem(props.id);
        }}
        onLongPress={() => {
          onSelectionHandler();
          // copyToClipboard();
          // ToastAndroid.show("Copied to clipboard", ToastAndroid.BOTTOM);
        }}
      >
        <Text style={styles.noteTitle}>{props.title}</Text>
        <Text numberOfLines={25} style={styles.noteText}>
          {props.text}
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
