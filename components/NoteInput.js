import { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Modal, Text } from "react-native";
import getTimeStamp from "../utils/Timestamp";
import ActionButton from "./ActionButton";

function NoteInput({
  addNoteHandler,
  updateNoteHandler,
  deleteNoteHandler,
  editNoteItem,
  setEditNote,
  showModal,
  setShowModal,
}) {
  const [enteredNoteText, setEnteredNoteText] = useState("");
  const [enteredNoteTitle, setEnteredNoteTitle] = useState("");
  const [onEditMode, setOnEditMode] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (editNoteItem) {
      setOnEditMode(true);
      setHasChanged(false);
      setEnteredNoteText(editNoteItem.text);
      setEnteredNoteTitle(editNoteItem.title);
    } else {
      setOnEditMode(false);
      setEnteredNoteText("");
      setEnteredNoteTitle("");
    }
  }, [showModal]);

  function submitHandler() {
    addNoteHandler({
      title: enteredNoteTitle.trim(),
      text: enteredNoteText.trim(),
      date: getTimeStamp(),
    });
  }

  function updateHandler() {
    updateNoteHandler({
      title: enteredNoteTitle.trim(),
      text: enteredNoteText.trim(),
      key: editNoteItem.key,
      date: getTimeStamp(),
    });
  }

  function cancelHandler() {
    setEditNote(null);
    setShowModal(false);
  }

  function deleteHandler() {
    setEditNote(null);
    setShowModal(false);
    deleteNoteHandler(editNoteItem.key);
  }

  function canSave() {
    if (onEditMode) {
      return hasChanged && Boolean(enteredNoteTitle && enteredNoteText);
    }

    return Boolean(enteredNoteTitle && enteredNoteText);
  }

  return (
    <Modal visible={showModal} animationType="fade">
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
          maxLength={1500}
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
      {editNoteItem && (
        <View style={styles.timeStampContainer}>
          <Text style={{ color: "#CCC" }}>
            Last update: {editNoteItem.date}
          </Text>
        </View>
      )}
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
            enabledColor="#E94235"
            disabledColor="#E9423555"
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
    right: 15,
    bottom: 15,
    elevation: 3,
    zIndex: 3,
  },
  buttonContainer: {
    padding: 5,
  },
  timeStampContainer: {
    position: "absolute",
    left: 15,
    bottom: 15,
  },
});
