import {
  AntDesign,
  Entypo,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { useAuth } from "../contexts/auth";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

type Props = {
  options: any[];
};

const CustomMaterialMenu = ({}: any) => {
  const { signOut } = useAuth();
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const navigation = useNavigation();
  // const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const showMenu = () => setVisible(true);

  const options = [
    {
      id: 1,
      title: "View Profile",
      icon: <MaterialCommunityIcons name="account" color="#FF0000" size={24} />,
      action: () => {
        navigation.navigate("Profile");
      },
    },
    {
      id: 2,
      title: "Settings",
      icon: <Feather name="settings" color="#FF0000" size={24} />,
      action: () => {},
    },
    {
      id: 3,
      title: "Logout",
      icon: <MaterialCommunityIcons name="logout" color="#FF0000" size={24} />,
      action: async () => {
        const res = await signOut();
        console.log("logout", res);
        // hideMenu();
        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: "Login" }],
        // });
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
              {option.icon}
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
