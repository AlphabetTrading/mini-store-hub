import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";
import { useAppTheme } from "@/src/contexts/preference";
import { Searchbar } from "react-native-paper";
type SearchBarComponentProps = {
  placeholder?: string;
  onChangeText: (search: string) => void;
  value: string;
  isSearching?: boolean;
};

const SearchBarComponent = (props: SearchBarComponentProps) => {
  const [search, setSearch] = useState(props.value);
  const { theme } = useAppTheme();
  const updateSearch = (search: string) => {
    setSearch(search);
    props.onChangeText(search);
  };

  return (
    <View style={styles.view}>
      <Searchbar
        // theme={{
        //   colors: {
        //     primary: theme.colors.cardBackground,
        //     text: theme.colors.text,
        //     placeholder: theme.colors.white,
        //     background: theme.colors.background,
        //   },
        // }}
        // inputContainerStyle={{ backgroundColor: "#fff", padding: 5 }}
        // containerStyle={{
        //   backgroundColor: theme.colors.background,
        //   borderWidth: 0,
        // }}
        style={{
          backgroundColor: theme.colors.cardBackground,
          borderWidth: 0,
          color: theme.colors.text,
        }}
        loading={props.isSearching}
        placeholderTextColor={theme.colors.text}
        iconColor={theme.colors.text}
        inputStyle={{
          color: theme.colors.text,
          fontFamily: "InterRegular",
          fontSize: 16,
        }}
        placeholder={props.placeholder || "Type Here..."}
        onChangeText={updateSearch}
        value={search}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    // margin: ,
  },
});

export default SearchBarComponent;
