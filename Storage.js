import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeNote = async (noteList) => {
  try {
    let noteString = JSON.stringify(noteList);
    await AsyncStorage.setItem("notes", noteString);
  } catch (e) {
    console.error("failed to save");
  }
};

export const getNote = async (noteKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(noteKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("failed to read");
  }
};

export const getAllNotes = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("notes");
    const list = JSON.parse(jsonValue);
    return jsonValue != null ? list : [];
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllNotes = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
