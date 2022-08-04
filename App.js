import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  ToastAndroid,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import NoteInput from "./components/NoteInput";
import NoteItem from "./components/NoteItem";
import MasonryList from "@react-native-seoul/masonry-list";
import AddButton from "./components/AddButton";
import { storeNote, getAllNotes } from "./Storage";

export default function App() {
  const [updateStorage, setUpdateStorage] = useState(false);
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const initializeNotes = async () => {
      getAllNotes()
        .then((notes) => setNotes(notes))
        .catch((error) => console.error(error));
    };
    const updateNotes = async (notes) => {
      storeNote(notes)
        .then(() => console.log("notes updated", notes))
        .catch((error) => console.error(error));
    };

    if (!notes.length) {
      initializeNotes();
    }

    if (updateStorage) {
      updateNotes(notes);
      setUpdateStorage(false);
    }
  }, [updateStorage]);

  function addNoteHandler(enteredNoteText) {
    let key =
      Date.now().toString(36) +
      Math.floor(
        Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
      ).toString(36);

    setNotes((currentNotes) => [
      ...currentNotes,
      {
        title: enteredNoteText.title,
        text: enteredNoteText.text,
        key,
      },
    ]);

    setUpdateStorage(true);
    setShowModal(false);

    ToastAndroid.show("Note added", ToastAndroid.BOTTOM);
  }

  function updateNoteHandler(noteObject) {
    setNotes((notes) => {
      return notes.filter((noteItem) => noteItem.key !== noteObject.key);
    });
    setNotes((currentNotes) => [...currentNotes, noteObject]);
    setUpdateStorage(true);
    setShowModal(false);
    setSelectedNote(null);

    ToastAndroid.show("Note updated", ToastAndroid.BOTTOM);
  }

  function startAddNoteHandler() {
    setShowModal(true);
  }

  function deleteNoteHandler(key) {
    setNotes((notes) => {
      return notes.filter((noteItem) => noteItem.key !== key);
    });
    setUpdateStorage(true);
    ToastAndroid.show("Note deleted", ToastAndroid.BOTTOM);
  }

  function editNoteHandler(key) {
    const selectedNote = notes.filter((note) => note.key === key);
    setSelectedNote(selectedNote[0]);
    setShowModal(true);
  }

  return (
    <>
      <StatusBar
        style="inverted"
        translucent={true}
        backgroundColor="rgba(32, 33, 36, 0.8)"
      />
      <SafeAreaView style={custom.appContainer}>
        <View style={custom.listNotesContainer}>
          <NoteInput
            showModal={showModal}
            setShowModal={setShowModal}
            addNoteHandler={addNoteHandler}
            updateNoteHandler={updateNoteHandler}
            setSelectedNote={setSelectedNote}
            editNoteItem={selectedNote}
          />
          {notes.length === 0 && (
            <View style={custom.emptyNotes}>
              <Text style={custom.emptyNoteText}>
                No notes to display here. {"\n"}Press + to add one.
              </Text>
            </View>
          )}
          <MasonryList
            numColumns={notes.length < 2 ? 1 : 2}
            data={notes}
            keyExtractor={(_, index) => index.toString()}
            renderItem={(noteData) => {
              return (
                <View key={1}>
                  {(noteData.i == 0 || noteData.i == 1) && (
                    <View style={{ paddingTop: 40 }}></View>
                  )}
                  <NoteItem
                    title={noteData.item.title}
                    text={noteData.item.text}
                    id={noteData.item.key}
                    onDeleteItem={deleteNoteHandler}
                    onEditItem={editNoteHandler}
                  />
                </View>
              );
            }}
          />
        </View>
        <AddButton onPress={startAddNoteHandler} />
      </SafeAreaView>
    </>
  );
}

const custom = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#202124",
  },
  listNotesContainer: {
    flex: 1,
  },
  emptyNotes: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  emptyNoteText: {
    color: "#FFFFFFAA",
    textAlign: "center",
  },
});
