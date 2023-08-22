import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useLocalization } from "@/src/contexts/localization";
import { useAuth } from "@/src/contexts/auth";
const profileImage = require("../../../assets/images/profile.png");
const GreetingsComponent = () => {
  const { t, locale } = useLocalization();
  const { authState } = useAuth();
  const getGreetingsMessage = () => {
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
      return locale.includes("en")
        ? t("goodMorning")
        : authState?.user.gender === "MALE"
        ? t("goodMorningM")
        : t("goodMorningF");
    } else if (currentTime < 18) {
      return locale.includes("en")
        ? t("goodAfternoon")
        : authState?.user.gender === "MALE"
        ? t("goodAfternoonM")
        : t("goodAfternoonF");
    } else {
      return locale.includes("en")
        ? t("goodEvening")
        : authState?.user.gender === "MALE"
        ? t("goodEveningM")
        : t("goodEveningF");
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
