import { useState } from "react";
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
import getTimeStamp from "./utils/TimeStamp";
import MasonryList from "@react-native-seoul/masonry-list";
import AddButton from "./components/AddButton";
import addDummyData from "./utils/Dummy";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function addNoteHandler(enteredNoteText) {
    let key = Math.random().toString() + getTimeStamp();
    setNotes((currentNotes) => [
      ...currentNotes,
      {
        title: enteredNoteText.title,
        text: enteredNoteText.text,
        key,
      },
    ]);
    ToastAndroid.show("Note added", ToastAndroid.BOTTOM);
    setShowModal(false);
  }

  function startAddNoteHandler() {
    setShowModal(true);
  }

  function deleteNoteHandler(key) {
    setNotes((notes) => {
      return notes.filter((noteItem) => noteItem.key != key);
    });
    ToastAndroid.show("Note deleted", ToastAndroid.BOTTOM);
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
          />
          {notes.length === 0 && (
            <View style={custom.emptyNotes}>
              <Text style={custom.emptyNoteText}>The note list is empty. {"\n"}Press + to add one.</Text>
            </View>
          )}
          <MasonryList
            numColumns={2}
            data={notes}
            renderItem={(noteData) => {
              return (
                <>
                  {(noteData.i == 0 || noteData.i == 1) && (
                    <View style={{ paddingTop: 40 }}></View>
                  )}
                  <NoteItem
                    title={noteData.item.title}
                    text={noteData.item.text}
                    id={noteData.item.key}
                    onDeleteItem={deleteNoteHandler}
                  />
                </>
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
    textAlign: "center"
  },
});
