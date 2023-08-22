import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useAuth } from "../contexts/auth";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useLocalization } from "../contexts/localization";
import { useAppTheme } from "../contexts/preference";
import { Divider, Menu } from "react-native-paper";

type Props = {
  options: any[];
};

const CustomMaterialMenu = ({}: any) => {
  const { signOut } = useAuth();
  const [visible, setVisible] = useState(false);
  const hideMenu = () => setVisible(false);
  const navigation = useNavigation();
  const { theme } = useAppTheme();
  const { t } = useLocalization();
  const showMenu = () => setVisible(true);
  return (
    <Menu
      visible={visible}
      onDismiss={hideMenu}
      contentStyle={{
        backgroundColor: theme.colors.cardBackground,
      }}
      anchor={
        // <IconButton
        //   icon="dots-vertical"
        //   iconColor={theme.colors.white}
        //   size={26}
        //   onPress={showMenu}
        // />
        <MaterialCommunityIcons
          name="dots-vertical"
          color={theme.colors.white}
          size={28}
          onPress={showMenu}
        />
      }
    >
      <Menu.Item
        onPress={() => {
          navigation.navigate("Profile");
          hideMenu();
        }}
        leadingIcon={(props) => (
          <MaterialCommunityIcons
            name="account"
            color={theme.colors.tint}
            size={24}
          />
        )}
        title={t("profile")}
        titleStyle={{
          color: theme.colors.tint,
        }}
      />
      <Menu.Item
        onPress={() => {
          navigation.navigate("Settings");
          hideMenu();
        }}
        title={t("settings")}
        titleStyle={{
          color: theme.colors.tint,
        }}
        leadingIcon={(props) => (
          <Feather name="settings" color={theme.colors.tint} size={24} />
        )}
      />
      <Divider />
      <Menu.Item
        onPress={async () => {
          try {
            signOut();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "SignIn" }],
              })
            );
          } catch (error) {
            console.log(error, " error");
          }
        }}
        title={t("logout")}
        titleStyle={{
          color: theme.colors.tint,
        }}
        leadingIcon={(props) => (
          <MaterialCommunityIcons
            name="logout"
            color={theme.colors.tint}
            size={24}
          />
        )}
      />
    </Menu>
  );
};

export default CustomMaterialMenu;
