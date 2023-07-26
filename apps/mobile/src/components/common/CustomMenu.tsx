import { useAuth } from "@/context/auth";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

type Props = {
  options: any[];
};

const CustomMaterialMenu = ({}: Props) => {
  const { signOut } = useAuth();
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const router = useRouter();

  const options = [
    {
      id: 1,
      title: "Settings",
      icon: "key",
      action: () => console.log("Bekele"),
    },
    {
      id: 2,
      title: "Logout",
      icon: "logout",
      action: async () => {
        await signOut();
        hideMenu();
        router.replace("/login");
      },
    },
  ];

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
