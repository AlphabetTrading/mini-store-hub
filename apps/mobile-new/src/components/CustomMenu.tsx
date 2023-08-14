import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { useAuth } from "../contexts/auth";
import { useNavigation } from "@react-navigation/native";
import { useLocalization } from "../contexts/localization";
import { useAppTheme } from "../contexts/preference";

type Props = {
  options: any[];
};

const CustomMaterialMenu = ({}: any) => {
  const { signOut } = useAuth();
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const navigation = useNavigation();
  const { theme } = useAppTheme();
  // const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const { t } = useLocalization();
  const showMenu = () => setVisible(true);

  const options = [
    {
      id: 1,
      title: t("profile"),
      icon: (
        <MaterialCommunityIcons
          name="account"
          color={theme.colors.text}
          size={24}
        />
      ),
      action: () => {
        navigation.navigate("Profile");
      },
    },
    {
      id: 2,
      title: t("settings"),
      icon: <Feather name="settings" color={theme.colors.text} size={24} />,
      action: () => {
        navigation.navigate("Settings");
      },
    },
    {
      id: 3,
      title: t("logout"),
      icon: (
        <MaterialCommunityIcons
          name="logout"
          color={theme.colors.text}
          size={24}
        />
      ),
      action: async () => {
        const res = await signOut();
        navigation.reset({ index: 0, routes: [{ name: "Auth" }] });
      },
    },
  ];

  return (
    <View>
      <Menu
        style={{
          backgroundColor: theme.colors.primary,
          elevation: 15,
        }}
        visible={visible}
        anchor={
          <Entypo
            name="dots-three-vertical"
            size={24}
            color={theme.colors.text}
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
                  color: theme.colors.text,
                  fontFamily: "InterRegular",
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
