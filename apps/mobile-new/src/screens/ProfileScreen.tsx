import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React from "react";
import { BaseLayout } from "../components/BaseLayout";
import Colors from "../constants/Colors";
import { GET_ME_QUERY } from "../graphql/queries/userQueries";
import { useQuery } from "@apollo/client";
import { useAuth } from "../contexts/auth";

type Props = {};

const ProfileScreen = (props: Props) => {
  const authState = useAuth();
  const { data, loading, error, refetch } = useQuery(GET_ME_QUERY);
  console.log(data, error, "ME");
  console.log(authState, "AUTH");
  return (
    <BaseLayout>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
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
            }}
          >
            Full Name
          </Text>
          <View
            style={{
              width: "100%",
              backgroundColor: Colors.light.background,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#5684E080",
              marginVertical: 10,
              padding: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "InterSemiBold",
                color: "#A5BECC",
              }}
            >
              {`${data.me.firstName} ${data.me.lastName}`}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              textTransform: "capitalize",
              fontFamily: "InterBold",
            }}
          >
            Phone Number
          </Text>
          <View
            style={{
              width: "100%",
              backgroundColor: Colors.light.background,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#5684E080",
              marginVertical: 10,
              padding: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "InterSemiBold",
                color: "#A5BECC",
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
            }}
          >
            Address
          </Text>
          <View
            style={{
              width: "100%",
              backgroundColor: Colors.light.background,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#5684E080",
              marginVertical: 10,
              padding: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "InterSemiBold",
                color: "#A5BECC",
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
            }}
          >
            Retail Shop ID
          </Text>
          <View
            style={{
              width: "100%",
              backgroundColor: Colors.light.background,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#5684E080",
              marginVertical: 10,
              padding: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "InterSemiBold",
                color: "#A5BECC",
              }}
            >
              {data.me.retailShop?.id}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 16,
              textTransform: "capitalize",
              fontFamily: "InterBold",
            }}
          >
            Retail Shop Location
          </Text>
          <View
            style={{
              width: "100%",
              backgroundColor: Colors.light.background,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#5684E080",
              marginVertical: 10,
              padding: 10,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "InterSemiBold",
                color: "#A5BECC",
              }}
            >
              {data.me.retailShop?.address?.formattedAddress}
            </Text>
          </View>
        </View>
      )}
    </BaseLayout>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
  },
});
