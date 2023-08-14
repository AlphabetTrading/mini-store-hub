// SettingsScreen.js
import React, { useState } from "react";
import { View } from "react-native"; // Import Picker for language selection
import { Text } from "react-native-paper";
import AsyncStorageUtils from "../utils/async_storage";
import { Picker } from "@react-native-picker/picker";
import { useLocalization } from "../contexts/localization";
import { useAppTheme } from "../contexts/preference";
import { Switch } from "react-native-paper";

function SettingsScreen() {
  const { theme, toggleTheme } = useAppTheme();
  const { setLocale, locale, t } = useLocalization();

  return (
    <View
      style={{ flex: 1, padding: 20, backgroundColor: theme.colors.background }}
    >
      <Text
        style={{ fontSize: 24, marginBottom: 20, color: theme.colors.text }}
      >
        {t("settings")}
      </Text>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <Text style={{ flex: 1, color: theme.colors.text, fontSize: 20 }}>
          {t(theme.mode === "dark" ? "darkMode" : "lightMode")}
        </Text>
        <Switch
          value={theme.mode === "dark"}
          color={theme.colors.accent}
          onValueChange={(value) => toggleTheme()}
        />
      </View>

      {/* Add other settings components here */}

      {/* Add language selection here */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 20 }}>
          {t("language")}
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: theme.colors.border,
          }}
        >
          <Picker
            style={{
              color: theme.colors.text,
              width: 150,
              borderWidth: 1,
              borderColor: theme.colors.border,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            selectedValue={locale}
            onValueChange={(itemValue, itemIndex) => {
              setLocale(itemValue);
              AsyncStorageUtils.setItem("locale", itemValue);
            }}
          >
            <Picker.Item
              label="English"
              value="en"
              style={{
                textAlign: "center",
                textTransform: "capitalize",
                fontFamily: "InterRegular",
              }}
            />
            <Picker.Item
              label="አማርኛ"
              value="am"
              style={{
                textAlign: "center",
                textTransform: "capitalize",
                fontFamily: "InterRegular",
              }}
            />
          </Picker>
        </View>
      </View>
    </View>
  );
}

export default SettingsScreen;
