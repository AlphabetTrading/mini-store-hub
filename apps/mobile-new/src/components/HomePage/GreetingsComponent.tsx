import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useLocalization } from "@/src/contexts/localization";
const profileImage = require("../../../assets/images/profile.png");
const GreetingsComponent = () => {
  const { t } = useLocalization();
  const getGreetingsMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return t("goodMorning");
    } else if (currentTime < 18) {
      return t("goodAfternoon");
    } else {
      return t("goodEvening");
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: 10,
      }}
    >
      <Image
        style={{ width: 40, height: 40, objectFit: "cover" }}
        alt={"avatar"}
        source={profileImage}
      />
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {getGreetingsMessage()}
      </Text>
    </View>
  );
};

export default GreetingsComponent;

const styles = StyleSheet.create({});
