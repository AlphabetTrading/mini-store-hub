import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";

type Props = {
  searchPhrase: string;
  setSearchPhrase: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ searchPhrase, setSearchPhrase }: Props) => {
  const [clicked, setClicked] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ marginLeft: 10 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
      </View>
      {clicked && (
        <TouchableOpacity
          style={{ marginRight: 6 }}
          onPress={() => {
            Keyboard.dismiss();
            setClicked(false);
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: "InterLight" }}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    fontFamily: "InterRegular",
    marginLeft: 10,
    flex: 1,
  },
  searchBar__clicked: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    margin: 10,
    // marginLeft: 20,
    marginRight: 5,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 6,
  },
  searchBar__unclicked: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    margin: 10,
    // marginHorizontal: 20,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 6,
  },
});
