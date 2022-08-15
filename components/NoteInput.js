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
      setHasChanged(false);
      setEnteredNoteText(props.editNoteItem.text);
      setEnteredNoteTitle(props.editNoteItem.title);
    } else {
      setOnEditMode(false);
      setEnteredNoteText("");
      setEnteredNoteTitle("");
    }
  }, [props.showModal]);

  function submitHandler() {
    props.addNoteHandler({
      title: enteredNoteTitle,
      text: enteredNoteText,
    });
  }

  function updateHandler() {
    props.updateNoteHandler({
      title: enteredNoteTitle,
      text: enteredNoteText,
      key: props.editNoteItem.key,
    });
  }

  function cancelHandler() {
    props.setSelectedNote(null);
    props.setShowModal(false);
  }

  function deleteHandler() {
    props.setSelectedNote(null);
    props.setShowModal(false);
    props.deleteNoteHandler(props.editNoteItem.key);
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
            disabled={!onEditMode}
            onPress={deleteHandler}
            enabledColor="#DC3545"
            disabledColor="#DC354555"
            imagePath={require("../assets/delete.png")}
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
  formContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: "#202124",
  },
  buttonsContainer: {
    position: "absolute",
    right: 30,
    bottom: 30,
    elevation: 3,
    zIndex: 3,
  },
  buttonContainer: {
    paddingTop: 10,
  },
});
