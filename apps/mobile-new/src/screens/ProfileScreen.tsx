import { StyleSheet, Text, View, Image, } from "react-native";
import React from "react";
import { BaseLayout } from "../components/BaseLayout";
import { GET_ME_QUERY } from "../graphql/queries/userQueries";
import { useQuery } from "@apollo/client";
import { useLocalization } from "../contexts/localization";
import { useAppTheme } from "../contexts/preference";
import { ActivityIndicator } from "react-native-paper";

type Props = {};

const ProfileScreen = (props: Props) => {
  const { data, loading, error, refetch } = useQuery(GET_ME_QUERY);
  const { t, locale } = useLocalization();
  const { theme } = useAppTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
  });
  return (
    <BaseLayout>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="small" color={theme.colors.tint} />
        </View>
      ) : (
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <View
              style={{
                width: 100,
                height: 100,
                borderWidth: 4,
                borderRadius: 50,
                borderColor: "#5684E0",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{ width: 80, height: 80, borderRadius: 40 }}
                source={require("../../assets/images/profile.png")}
              />
            </View>
          </View>
          <Text
            style={{
              fontSize: 16,
              textTransform: "capitalize",
              fontFamily: "InterBold",
              color: theme.colors.text,
            }}
          >
            {t("fullName")}
          </Text>
          <View
            style={{
              width: "100%",
              backgroundColor: theme.colors.background,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: theme.colors.tint,
              marginVertical: 10,
              padding: 15, paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "InterSemiBold",
                color: theme.colors.text,
              }}
            >
              {
                locale.includes("en") ? data.me.firstName + " " + data.me.lastName : data.me.amharicFirstName + " " + data.me.amharicLastName
              }
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              textTransform: "capitalize",
              fontFamily: "InterBold",
              color: theme.colors.text,

            }}
          >
            {t("phone")}
          </Text>
          <View
            style={{
              width: "100%",
              backgroundColor: theme.colors.background,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: theme.colors.tint,
              marginVertical: 10,
              padding: 15, paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "InterSemiBold",
                color: theme.colors.text,
              }}
            >
              {data.me.phone}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              textTransform: "capitalize",
              fontFamily: "InterBold",
              color: theme.colors.text,

            }}
          >
            {t("address")}
          </Text>
          <View
            style={{
              width: "100%",
              backgroundColor: theme.colors.background,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: theme.colors.tint,
              marginVertical: 10,
              padding: 15, paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "InterSemiBold",
                color: theme.colors.text,
              }}
            >
              {data.me.userProfile?.address?.formattedAddress}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 16,
              textTransform: "capitalize",
              fontFamily: "InterBold",
              color: theme.colors.text,

            }}
          >
            {t("retailShopName")}
          </Text>
          <View
            style={{
              width: "100%",
              backgroundColor: theme.colors.background,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: theme.colors.tint,
              marginVertical: 10,
              padding: 15,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "InterSemiBold",
                color: theme.colors.text,
              }}
            >
              {
                locale.includes("en") ? data.me.retailShop[0].name : data.me.retailShop[0].amharicName ?? data.me.retailShop[0].name
              }
            </Text>
          </View>

          <Text
            style={{
              fontSize: 16,
              textTransform: "capitalize",
              fontFamily: "InterBold",
              color: theme.colors.text,
            }}
          >
            {t("retailShopAddress")}
          </Text>
          <View
            style={{
              width: "100%",
              backgroundColor: theme.colors.background,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: theme.colors.tint,
              marginVertical: 10,
              padding: 15,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "InterSemiBold",
                color: theme.colors.text,
              }}
            >
              {
                locale.includes("en") ? data.me.retailShop[0].address.formattedAddress : data.me.retailShop[0].address.amharicFormattedAddress ?? data.me.retailShop[0].address.formattedAddress
              }
            </Text>
          </View>
        </View>
      )}
    </BaseLayout>
  );
};

export default ProfileScreen;
