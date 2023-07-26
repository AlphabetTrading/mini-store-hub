// React Native Popup Menu – Over Flow Menu
// https://aboutreact.com/react-native-popup-menu/

import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
//import react in our code.
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
//import all the components we are going to use.
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
//import menu and menu item

type Props = {
  options: any[];
};

const CustomMaterialMenu = ({ options }: Props) => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    <View>
      <Menu
        visible={visible}
        anchor={
          <Entypo
            name="dots-three-vertical"
            size={24}
            color="white"
            onPress={showMenu}
            style={{ marginHorizontal: 10 }}
          />
        }
        onRequestClose={hideMenu}
      >
        {options.map((option, index) => (
          <MenuItem onPress={hideMenu} key={index}>
            <Pressable
              key={index}
              style={{
                flexDirection: "row",
                paddingVertical: 10,
                gap: 5,
              }}
              onPress={(e: any) => {
                // e.stopPropagation();
                option.action();
              }}
            >
              <MaterialCommunityIcons
                name={
                  option.icon as keyof typeof MaterialCommunityIcons.glyphMap
                }
                color="#FF0000"
                size={24}
              />
              <Text
                style={{
                  color: "red",
                  fontFamily: "Inter-Regular",
                }}
              >
                {option.title}
              </Text>
            </Pressable>
          </MenuItem>
        ))}
      </Menu>
    </View>
  );
};

export default CustomMaterialMenu;
