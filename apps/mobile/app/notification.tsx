import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import Colors from "constants/Colors";

type Props = {};

interface Notification {
  id: string;
  title: string;
  description: string;
  status: string;
}

const DATA: Notification[] = [
  {
    id: "1",
    title: "Low Stock Alert",
    description: "Yes Water 500ml",
    status: "unread",
  },
  {
    id: "2",
    title: "Out of Stock Alert",
    description: "Yes Water 500ml",
    status: "read",
  },
  {
    id: "3",
    title: "Price Change Alert",
    description: "Yes Water 500ml",
    status: "unread",
  },
];

const notification = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification>();

  const handleClick = (item: any) => {
    setSelectedNotification(item);
    setShowModal(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <Stack.Screen
        options={{
          title: "Notification",
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
          headerTintColor: "#FFF",
        }}
      />
      <Modal animationType="fade" visible={showModal}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            width: "100%",
            padding: 40,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "#5684E0",
              borderRadius: 8,
              padding: 20,
              paddingVertical: 30,
            }}
          >
            <Text style={{ fontFamily: "InterMedium", fontSize: 16 }}>
              {selectedNotification?.title}
            </Text>
            <Text style={{ fontFamily: "InterLight", fontSize: 12 }}>
              {selectedNotification?.description}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={{
              alignItems: "center",
              alignSelf: "center",
              marginTop: 20,
              width: 100,
              borderRadius: 8,
              backgroundColor: Colors.light.tint,
            }}
          >
            <Text style={{ padding: 10, color: "#FFF" }}>Got It!</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <FlatList
        keyExtractor={(item) => item.id}
        data={DATA}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: item.status === "read" ? "#FFFFFF80" : "#FFF",
            }}
            onPress={() => {
              handleClick(item);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View style={{ gap: 10 }}>
                <Text style={{ fontFamily: "InterMedium", fontSize: 16 }}>
                  {item.title}
                </Text>
                <Text style={{ fontFamily: "InterLight", fontSize: 12 }}>
                  {item.description}
                </Text>
              </View>
              <View
                style={{ width: 4, height: 4, backgroundColor: "#FF7E06" }}
              ></View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default notification;

const styles = StyleSheet.create({});
