import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { BaseLayout } from "../components/BaseLayout";
import Colors from "../constants/Colors";

type Props = {};

const ProfileScreen = (props: Props) => {
  return (
    <BaseLayout>
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
            Bekele Petros
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
            0911121314
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
            Kera, Kirkos, Addis Ababa
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
            #122132
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
            Gotera, Kirkos, Addis Ababa
          </Text>
        </View>
      </View>
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
