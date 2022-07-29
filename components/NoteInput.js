import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Modal,
  Alert,
} from "react-native";

// function addHandler(noteTitle, noteText) {
//   setEnteredNoteText(enteredNote);
// }

function NoteInput(props) {
  // const [enteredNoteTitle, setEnteredNoteTitle] = useState("");
  const [enteredNoteText, setEnteredNoteText] = useState("");

  return (
    <Modal visible={props.showModal} animationType="fade">
      <View style={styles.inputContainer}>
        {/* <TextInput
          multiline
          numberOfLines={2}
          onChangeText={enteredTitle => setEnteredNoteTitle(enteredTitle)}
          value={enteredNoteText}
          style={styles.textInput}
          placeholder="Title..."
          placeholderTextColor="white"
        /> */}
        <TextInput
          multiline
          numberOfLines={2}
          onChangeText={enteredText => setEnteredNoteText(enteredText)}
          value={enteredNoteText}
          style={styles.textInput}
          placeholder="Note..."
          placeholderTextColor="white"
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title="submit"
              color="#5F6368"
              disabled={!enteredNoteText}
              onPress={() => {
                props.addNoteHandler(enteredNoteText);
                setEnteredNoteText("");
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="cancel"
              color="red"
              onPress={() => {
                props.setShowModal(false);
                setEnteredNoteText("");
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default NoteInput;

const styles = StyleSheet.create({
  textInput: {
    width: "75%",
    borderBottomWidth: 0.5,
    borderBottomColor: "white",
    fontWeight: "bold",
    color: "white",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#202124",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    width: "40%",
    padding: 10,
  },
});
