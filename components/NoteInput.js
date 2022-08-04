import { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Modal } from "react-native";
import ActionButton from "./ActionButton";

function NoteInput(props) {
  const [enteredNoteText, setEnteredNoteText] = useState("");
  const [enteredNoteTitle, setEnteredNoteTitle] = useState("");
  const [onEditMode, setOnEditMode] = useState(false);

  useEffect(() => {
    if (props.editNoteItem) {
      setOnEditMode(true);
      setEnteredNoteText(props.editNoteItem.text || "");
      setEnteredNoteTitle(props.editNoteItem.title || "");
    }
  }, [props.showModal]);

  function submitHandler() {
    props.addNoteHandler({
      title: enteredNoteTitle,
      text: enteredNoteText,
    });
    setEnteredNoteTitle("");
    setEnteredNoteText("");
  }

  function updateHandler() {
    props.updateNoteHandler({
      title: enteredNoteTitle,
      text: enteredNoteText,
      key: props.editNoteItem.key,
    });
    setEnteredNoteText("");
    setEnteredNoteText("");
  }

  function cancelHandler() {
    setEnteredNoteTitle("");
    setEnteredNoteText("");
    props.setSelectedNote(null);
    props.setShowModal(false);
  }

  return (
    <Modal visible={props.showModal} animationType="fade">
      <View style={styles.formContainer}>
        <TextInput
          multiline
          numberOfLines={2}
          onChangeText={(enteredTitle) => setEnteredNoteTitle(enteredTitle)}
          value={enteredNoteTitle}
          style={[styles.textInput, styles.titleInput]}
          placeholder="Title"
          placeholderTextColor="#FFFFFFAA"
        />
        <TextInput
          multiline
          onChangeText={(enteredText) => setEnteredNoteText(enteredText)}
          value={enteredNoteText}
          style={styles.textInput}
          placeholder="Note"
          placeholderTextColor="#FFFFFFAA"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <ActionButton
            disabled={!Boolean(enteredNoteTitle && enteredNoteText)}
            onPress={onEditMode ? updateHandler : submitHandler}
            imagePath={require("../assets/content-save.png")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <ActionButton
            onPress={cancelHandler}
            imagePath={require("../assets/close.png")}
          />
        </View>
      </View>
    </Modal>
  );
}

export default NoteInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#202124",
  },
  textInput: {
    color: "#FFF",
  },
  titleInput: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  textInput: {
  },
  formContainer: {
    flex: 5,
    padding: 30,
    backgroundColor: "#202124",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#202124",
  },
  buttonContainer: {
    paddingTop: 10,
    right: 30,
    bottom: 30,
  },
});
