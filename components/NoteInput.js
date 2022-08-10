import { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Modal } from "react-native";
import ActionButton from "./ActionButton";

function NoteInput(props) {
  const [enteredNoteText, setEnteredNoteText] = useState("");
  const [enteredNoteTitle, setEnteredNoteTitle] = useState("");
  const [onEditMode, setOnEditMode] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

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
    setEnteredNoteTitle("");
    setEnteredNoteText("");
    setOnEditMode(false);
  }

  function cancelHandler() {
    setEnteredNoteTitle("");
    setEnteredNoteText("");
    setOnEditMode(false);
    props.setSelectedNote(null);
    props.setShowModal(false);
  }

  function canSave() {
    if (onEditMode) {
      return hasChanged && Boolean(enteredNoteTitle && enteredNoteText);
    }

    return Boolean(enteredNoteTitle && enteredNoteText);
  }

  return (
    <Modal visible={props.showModal} animationType="fade">
      <View style={styles.formContainer}>
        <TextInput
          multiline
          numberOfLines={2}
          maxLength={100}
          onChangeText={(enteredTitle) => {
            setEnteredNoteTitle(enteredTitle);
            if (onEditMode) {
              setHasChanged(true);
            }
          }}
          value={enteredNoteTitle}
          style={[styles.textInput, styles.titleInput]}
          color={"#FFF"}
          placeholder="Title"
          placeholderTextColor="#FFFFFFAA"
        />
        <TextInput
          multiline
          onChangeText={(enteredText) => {
            setEnteredNoteText(enteredText);
            if (onEditMode) {
              setHasChanged(true);
            }
          }}
          value={enteredNoteText}
          style={styles.textInput}
          color={"#FFF"}
          placeholder="Note"
          placeholderTextColor="#FFFFFFAA"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <ActionButton
            disabled={!canSave()}
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
    // borderBottomColor: "white",
    // borderWidth: 1
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
