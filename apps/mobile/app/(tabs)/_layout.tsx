import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Link, Stack, Tabs, router } from "expo-router";
import { useColorScheme, TouchableOpacity, View, Text } from "react-native";

import Svg, { Path, Mask, G, Rect, ClipPath, Defs } from "react-native-svg";
import React from "react";
import TabItem from "components/TabItem";
import Colors from "constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const CustomTabBarButton = ({ children, onPress }: any) => {
  return (
    <TouchableOpacity
      style={{
        top: -35,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
      onPress={onPress}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#5684E0",
          borderWidth: 0.5,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerTintColor: "#fff",
        headerShown: false,
        headerRight: () => (
          <View style={{ flexDirection: "row" }}>
            <View>
              <AntDesign
                name="bells"
                color="#FFF"
                size={24}
                onPress={() => {
                  router.push("/notification");
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: -5,
                  right: -5,
                  backgroundColor: "#FF0000",
                  width: 16,
                  height: 16,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 8 }}>12</Text>
              </View>
            </View>
            <AntDesign
              style={{ marginRight: 20, marginLeft: 10 }}
              name="setting"
              color="#FFF"
              size={24}
              onPress={() => {}}
            />
          </View>
        ),
        tabBarLabelStyle: {
          fontFamily: "InterRegular",
          fontSize: 10,
          // borderWidth: 2,
          // borderColor: "#ff0000",
        },
        // tabBarItemStyle: {
        //   borderWidth: 0.5,
        //   borderColor: "#D3D3D3",
        // },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarItemStyle: {
          borderWidth: 0.5,
          borderColor: "#D3D3D3",
        },
        tabBarIconStyle: {
          paddingVertical: 0,
        },
        tabBarActiveBackgroundColor: Colors.light.tint,
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: Colors.light.tint,
        // tabBarInactiveTintColor: "#828282",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Hello, User",
          headerShown: true,
          tabBarIcon: ({ focused, color }) => (
            <TabItem
              color={color}
              focused={focused}
              name="Home"
              svg={
                <Svg width="24" height="24" viewBox="0 0 15 15" fill="none">
                  <Path
                    d="M13.75 13.75H1.25"
                    stroke={color}
                    strokeLinecap="round"
                  />
                  <Path
                    d="M1.25 6.87504L6.32869 2.81211C7.0135 2.26429 7.9865 2.26429 8.67131 2.81211L13.75 6.87504"
                    stroke={color}
                    strokeLinecap="round"
                  />
                  <Path
                    d="M9.6875 3.4375V2.1875C9.6875 2.01491 9.82744 1.875 10 1.875H11.5625C11.7351 1.875 11.875 2.01491 11.875 2.1875V5.3125"
                    stroke={color}
                    strokeLinecap="round"
                  />
                  <Path
                    d="M2.5 13.75V5.9375"
                    stroke={color}
                    strokeLinecap="round"
                  />
                  <Path
                    d="M12.5 13.75V5.9375"
                    stroke={color}
                    strokeLinecap="round"
                  />
                  <Path
                    d="M9.375 13.75V10.625C9.375 9.74113 9.375 9.29919 9.10044 9.02456C8.82581 8.75 8.38387 8.75 7.5 8.75C6.61613 8.75 6.17417 8.75 5.89959 9.02456C5.625 9.29919 5.625 9.74113 5.625 10.625V13.75"
                    stroke={color}
                  />
                  <Path
                    d="M8.75 5.9375C8.75 6.62787 8.19037 7.1875 7.5 7.1875C6.80963 7.1875 6.25 6.62787 6.25 5.9375C6.25 5.24714 6.80963 4.6875 7.5 4.6875C8.19037 4.6875 8.75 5.24714 8.75 5.9375Z"
                    stroke={color}
                  />
                </Svg>
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Inventory",
          tabBarLabelStyle: {
            borderWidth: 1,
          },
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              color={color}
              focused={focused}
              name="Inventory"
              svg={
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M19.202 14.3685V16.1427L18.4495 15.6459L17.6971 16.1427V14.3685H19.202ZM16.9446 18.9105V20.6492L16.1564 20.1524L15.4039 20.6492V18.9105H16.9446ZM21.4951 18.9105V20.6492L20.7427 20.1524L19.9544 20.6492V18.9105H21.4951Z"
                    stroke={color}
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M12.251 1.41699V5.49764C12.251 6.20732 12.8243 6.81054 13.5767 6.81054H17.9122L13.6125 2.19764L12.251 1.41699Z"
                    stroke={color}
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M12.4658 23.417H2.2899C1.57329 23.417 1 22.8493 1 22.1396V2.7299C1 2.02022 1.57329 1.41699 2.32573 1.41699H12.2866C12.645 1.41699 12.9674 1.55893 13.2182 1.80731L17.5538 6.10086C17.8046 6.34925 17.9479 6.6686 17.9479 7.02344V12.9847M12.4658 20.5073H7.91531M12.4658 18.9105H7.91531M14.7231 15.8944H7.91531M12.9674 14.2976H7.91531M14.9381 11.2815H7.91531M12.9674 9.68473H7.91531M3.93811 6.63312H9.63518M9.63518 4.32667H3.93811"
                    stroke={color}
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M3.93811 10.3944L4.54723 10.9621L5.40717 10.1105L6.2671 9.25891M3.93811 13.5879H6.2671V15.8944H3.93811V13.5879ZM3.93811 18.2008H6.2671V20.5073H3.93811V18.2008Z"
                    stroke={color}
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M18.4495 18.9105H23V23.4169H18.4495M18.4495 18.9105V23.4169M18.4495 18.9105H13.899V23.4169H18.4495M16.1564 14.3685H20.7069V18.875H16.1564V14.3685Z"
                    stroke={color}
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="new_transaction"
        options={{
          tabBarStyle: {
            zIndex: 100,
          },
          title: "New Transaction",
          headerStyle: {},
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: "#5684E0",
                justifyContent: "center",
                alignItems: "center",
                elevation: 4,
              }}
            >
              <TabItem
                color={color}
                focused={focused}
                svg={
                  <Svg width="40" height="40" viewBox="0 0 20 20" fill="none">
                    <G clip-path="url(#clip0_224_2459)">
                      <Path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M19.4499 9.10009V10.9001H10.9449V19.0001H9.05498V10.9001H0.549995V9.10009H9.05498V1.00012H10.9449V9.10009H19.4499Z"
                        fill="white"
                      />
                    </G>
                    <Defs>
                      <ClipPath id="clip0_224_2459">
                        <Rect
                          width="18.8999"
                          height="19.9999"
                          fill="white"
                          transform="translate(0.550034 6.10352e-05)"
                        />
                      </ClipPath>
                    </Defs>
                  </Svg>
                }
              />
            </View>
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              onPress={() => {
                router.push("/checkout");
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sales"
        options={{
          title: "Sales",
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              color={color}
              focused={focused}
              name="Sales"
              svg={
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M19 6.5C17.35 6.5 16 6.05 16 5.5V6.5C16 7.05 17.35 7.5 19 7.5C20.65 7.5 22 7.05 22 6.5V5.5C22 6.05 20.65 6.5 19 6.5Z"
                    fill={color}
                  />
                  <Path
                    d="M19 5C17.35 5 16 4.55 16 4V5C16 5.55 17.35 6 19 6C20.65 6 22 5.55 22 5V4C22 4.55 20.65 5 19 5ZM19 8C17.35 8 16 7.55 16 7V8C16 8.55 17.35 9 19 9C20.65 9 22 8.55 22 8V7C22 7.55 20.65 8 19 8Z"
                    fill={color}
                  />
                  <Path
                    d="M19 9.5C17.35 9.5 16 9.05 16 8.5V9.5C16 10.05 17.35 10.5 19 10.5C20.65 10.5 22 10.05 22 9.5V8.5C22 9.05 20.65 9.5 19 9.5Z"
                    fill={color}
                  />
                  <Path
                    d="M19 11C17.35 11 16 10.55 16 10V11C16 11.55 17.35 12 19 12C20.65 12 22 11.55 22 11V10C22 10.55 20.65 11 19 11Z"
                    fill={color}
                  />
                  <Path
                    d="M19 12.5C17.35 12.5 16 12.05 16 11.5V12.5C16 13.05 17.35 13.5 19 13.5C20.65 13.5 22 13.05 22 12.5V11.5C22 12.05 20.65 12.5 19 12.5Z"
                    fill={color}
                  />
                  <Path
                    d="M19 14C17.35 14 16 13.55 16 13V14C16 14.55 17.35 15 19 15C20.65 15 22 14.55 22 14V13C22 13.55 20.65 14 19 14Z"
                    fill={color}
                  />
                  <Path
                    d="M19 15.5C17.35 15.5 16 15.05 16 14.5V15.5C16 16.05 17.35 16.5 19 16.5C20.65 16.5 22 16.05 22 15.5V14.5C22 15.05 20.65 15.5 19 15.5Z"
                    fill={color}
                  />
                  <Path
                    d="M19 17C17.35 17 16 16.55 16 16V17C16 17.55 17.35 18 19 18C20.65 18 22 17.55 22 17V16C22 16.55 20.65 17 19 17Z"
                    fill={color}
                  />
                  <Path
                    d="M19 18.5C17.35 18.5 16 18.05 16 17.5V18.5C16 19.05 17.35 19.5 19 19.5C20.65 19.5 22 19.05 22 18.5V17.5C22 18.05 20.65 18.5 19 18.5Z"
                    fill={color}
                  />
                  <Path
                    d="M19 20C17.35 20 16 19.55 16 19V20C16 20.55 17.35 21 19 21C20.65 21 22 20.55 22 20V19C22 19.55 20.65 20 19 20Z"
                    fill={color}
                  />
                  <Path
                    d="M16 4C16 4.26522 16.3161 4.51957 16.8787 4.70711C17.4413 4.89464 18.2044 5 19 5C19.7956 5 20.5587 4.89464 21.1213 4.70711C21.6839 4.51957 22 4.26522 22 4C22 3.73478 21.6839 3.48043 21.1213 3.29289C20.5587 3.10536 19.7956 3 19 3C18.2044 3 17.4413 3.10536 16.8787 3.29289C16.3161 3.48043 16 3.73478 16 4Z"
                    fill="#9B9B9B"
                    fill-opacity="0.2"
                  />
                  <Path
                    d="M19 6C17.6 6 16.45 5.7 16.1 5.25C16.05 5.35 16 5.4 16 5.5C16 6.05 17.35 6.5 19 6.5C20.65 6.5 22 6.05 22 5.5C22 5.4 21.95 5.35 21.9 5.25C21.55 5.7 20.4 6 19 6ZM19 7.5C17.6 7.5 16.45 7.2 16.1 6.75C16.05 6.85 16 6.9 16 7C16 7.55 17.35 8 19 8C20.65 8 22 7.55 22 7C22 6.9 21.95 6.85 21.9 6.75C21.55 7.2 20.4 7.5 19 7.5ZM19 9C17.6 9 16.45 8.7 16.1 8.25C16.05 8.35 16 8.4 16 8.5C16 9.05 17.35 9.5 19 9.5C20.65 9.5 22 9.05 22 8.5C22 8.4 21.95 8.35 21.9 8.25C21.55 8.7 20.4 9 19 9ZM19 10.5C17.6 10.5 16.45 10.2 16.1 9.75C16.05 9.85 16 9.9 16 10C16 10.55 17.35 11 19 11C20.65 11 22 10.55 22 10C22 9.9 21.95 9.85 21.9 9.75C21.55 10.2 20.4 10.5 19 10.5ZM19 12C17.6 12 16.45 11.7 16.1 11.25C16.05 11.35 16 11.4 16 11.5C16 12.05 17.35 12.5 19 12.5C20.65 12.5 22 12.05 22 11.5C22 11.4 21.95 11.35 21.9 11.25C21.55 11.7 20.4 12 19 12ZM19 13.5C17.6 13.5 16.45 13.2 16.1 12.75C16.05 12.85 16 12.9 16 13C16 13.55 17.35 14 19 14C20.65 14 22 13.55 22 13C22 12.9 21.95 12.85 21.9 12.75C21.55 13.2 20.4 13.5 19 13.5ZM19 15C17.6 15 16.45 14.7 16.1 14.25C16.05 14.35 16 14.4 16 14.5C16 15.05 17.35 15.5 19 15.5C20.65 15.5 22 15.05 22 14.5C22 14.4 21.95 14.35 21.9 14.25C21.55 14.7 20.4 15 19 15ZM19 16.5C17.6 16.5 16.45 16.2 16.1 15.75C16.05 15.85 16 15.9 16 16C16 16.55 17.35 17 19 17C20.65 17 22 16.55 22 16C22 15.9 21.95 15.85 21.9 15.75C21.55 16.2 20.4 16.5 19 16.5ZM19 18C17.6 18 16.45 17.7 16.1 17.25C16.05 17.35 16 17.4 16 17.5C16 18.05 17.35 18.5 19 18.5C20.65 18.5 22 18.05 22 17.5C22 17.4 21.95 17.35 21.9 17.25C21.55 17.7 20.4 18 19 18ZM19 19.5C17.6 19.5 16.45 19.2 16.1 18.75C16.05 18.85 16 18.9 16 19C16 19.55 17.35 20 19 20C20.65 20 22 19.55 22 19C22 18.9 21.95 18.85 21.9 18.75C21.55 19.2 20.4 19.5 19 19.5Z"
                    fill="#9B9B9B"
                    fill-opacity="0.2"
                  />
                  <Path
                    d="M5 9.5C3.35 9.5 2 9.05 2 8.5V9.5C2 10.05 3.35 10.5 5 10.5C6.65 10.5 8 10.05 8 9.5V8.5C8 9.05 6.65 9.5 5 9.5Z"
                    fill={color}
                  />
                  <Path
                    d="M5 8C3.35 8 2 7.55 2 7V8C2 8.55 3.35 9 5 9C6.65 9 8 8.55 8 8V7C8 7.55 6.65 8 5 8ZM5 11C3.35 11 2 10.55 2 10V11C2 11.55 3.35 12 5 12C6.65 12 8 11.55 8 11V10C8 10.55 6.65 11 5 11Z"
                    fill={color}
                  />
                  <Path
                    d="M5 12.5C3.35 12.5 2 12.05 2 11.5V12.5C2 13.05 3.35 13.5 5 13.5C6.65 13.5 8 13.05 8 12.5V11.5C8 12.05 6.65 12.5 5 12.5Z"
                    fill={color}
                  />
                  <Path
                    d="M5 14C3.35 14 2 13.55 2 13V14C2 14.55 3.35 15 5 15C6.65 15 8 14.55 8 14V13C8 13.55 6.65 14 5 14Z"
                    fill={color}
                  />
                  <Path
                    d="M5 15.5C3.35 15.5 2 15.05 2 14.5V15.5C2 16.05 3.35 16.5 5 16.5C6.65 16.5 8 16.05 8 15.5V14.5C8 15.05 6.65 15.5 5 15.5Z"
                    fill={color}
                  />
                  <Path
                    d="M5 17C3.35 17 2 16.55 2 16V17C2 17.55 3.35 18 5 18C6.65 18 8 17.55 8 17V16C8 16.55 6.65 17 5 17Z"
                    fill={color}
                  />
                  <Path
                    d="M5 18.5C3.35 18.5 2 18.05 2 17.5V18.5C2 19.05 3.35 19.5 5 19.5C6.65 19.5 8 19.05 8 18.5V17.5C8 18.05 6.65 18.5 5 18.5Z"
                    fill={color}
                  />
                  <Path
                    d="M5 20C3.35 20 2 19.55 2 19V20C2 20.55 3.35 21 5 21C6.65 21 8 20.55 8 20V19C8 19.55 6.65 20 5 20Z"
                    fill={color}
                  />
                  <Path
                    d="M2 7C2 7.26522 2.31607 7.51957 2.87868 7.70711C3.44129 7.89464 4.20435 8 5 8C5.79565 8 6.55871 7.89464 7.12132 7.70711C7.68393 7.51957 8 7.26522 8 7C8 6.73478 7.68393 6.48043 7.12132 6.29289C6.55871 6.10536 5.79565 6 5 6C4.20435 6 3.44129 6.10536 2.87868 6.29289C2.31607 6.48043 2 6.73478 2 7Z"
                    fill="#9B9B9B"
                    fill-opacity="0.2"
                  />
                  <Path
                    d="M5 9C3.6 9 2.45 8.7 2.1 8.25C2.05 8.35 2 8.4 2 8.5C2 9.05 3.35 9.5 5 9.5C6.65 9.5 8 9.05 8 8.5C8 8.4 7.95 8.35 7.9 8.25C7.55 8.7 6.4 9 5 9ZM5 10.5C3.6 10.5 2.45 10.2 2.1 9.75C2.05 9.85 2 9.9 2 10C2 10.55 3.35 11 5 11C6.65 11 8 10.55 8 10C8 9.9 7.95 9.85 7.9 9.75C7.55 10.2 6.4 10.5 5 10.5ZM5 12C3.6 12 2.45 11.7 2.1 11.25C2.05 11.35 2 11.4 2 11.5C2 12.05 3.35 12.5 5 12.5C6.65 12.5 8 12.05 8 11.5C8 11.4 7.95 11.35 7.9 11.25C7.55 11.7 6.4 12 5 12ZM5 13.5C3.6 13.5 2.45 13.2 2.1 12.75C2.05 12.85 2 12.9 2 13C2 13.55 3.35 14 5 14C6.65 14 8 13.55 8 13C8 12.9 7.95 12.85 7.9 12.75C7.55 13.2 6.4 13.5 5 13.5ZM5 15C3.6 15 2.45 14.7 2.1 14.25C2.05 14.35 2 14.4 2 14.5C2 15.05 3.35 15.5 5 15.5C6.65 15.5 8 15.05 8 14.5C8 14.4 7.95 14.35 7.9 14.25C7.55 14.7 6.4 15 5 15ZM5 16.5C3.6 16.5 2.45 16.2 2.1 15.75C2.05 15.85 2 15.9 2 16C2 16.55 3.35 17 5 17C6.65 17 8 16.55 8 16C8 15.9 7.95 15.85 7.9 15.75C7.55 16.2 6.4 16.5 5 16.5ZM5 18C3.6 18 2.45 17.7 2.1 17.25C2.05 17.35 2 17.4 2 17.5C2 18.05 3.35 18.5 5 18.5C6.65 18.5 8 18.05 8 17.5C8 17.4 7.95 17.35 7.9 17.25C7.55 17.7 6.4 18 5 18ZM5 19.5C3.6 19.5 2.45 19.2 2.1 18.75C2.05 18.85 2 18.9 2 19C2 19.55 3.35 20 5 20C6.65 20 8 19.55 8 19C8 18.9 7.95 18.85 7.9 18.75C7.55 19.2 6.4 19.5 5 19.5Z"
                    fill="#9B9B9B"
                    fill-opacity="0.2"
                  />
                  <Path
                    d="M12 14C10.35 14 9 13.55 9 13V14C9 14.55 10.35 15 12 15C13.65 15 15 14.55 15 14V13C15 13.55 13.65 14 12 14Z"
                    fill={color}
                  />
                  <Path
                    d="M12 12.5C10.35 12.5 9 12.05 9 11.5V12.5C9 13.05 10.35 13.5 12 13.5C13.65 13.5 15 13.05 15 12.5V11.5C15 12.05 13.65 12.5 12 12.5ZM12 15.5C10.35 15.5 9 15.05 9 14.5V15.5C9 16.05 10.35 16.5 12 16.5C13.65 16.5 15 16.05 15 15.5V14.5C15 15.05 13.65 15.5 12 15.5Z"
                    fill={color}
                  />
                  <Path
                    d="M12 17C10.35 17 9 16.55 9 16V17C9 17.55 10.35 18 12 18C13.65 18 15 17.55 15 17V16C15 16.55 13.65 17 12 17Z"
                    fill={color}
                  />
                  <Path
                    d="M12 18.5C10.35 18.5 9 18.05 9 17.5V18.5C9 19.05 10.35 19.5 12 19.5C13.65 19.5 15 19.05 15 18.5V17.5C15 18.05 13.65 18.5 12 18.5Z"
                    fill={color}
                  />
                  <Path
                    d="M12 20C10.35 20 9 19.55 9 19V20C9 20.55 10.35 21 12 21C13.65 21 15 20.55 15 20V19C15 19.55 13.65 20 12 20Z"
                    fill={color}
                  />
                  <Path
                    d="M9 11.5C9 11.7652 9.31607 12.0196 9.87868 12.2071C10.4413 12.3946 11.2044 12.5 12 12.5C12.7956 12.5 13.5587 12.3946 14.1213 12.2071C14.6839 12.0196 15 11.7652 15 11.5C15 11.2348 14.6839 10.9804 14.1213 10.7929C13.5587 10.6054 12.7956 10.5 12 10.5C11.2044 10.5 10.4413 10.6054 9.87868 10.7929C9.31607 10.9804 9 11.2348 9 11.5Z"
                    fill="#9B9B9B"
                    fill-opacity="0.2"
                  />
                  <Path
                    d="M12 13.5C10.6 13.5 9.45 13.2 9.1 12.75C9.05 12.85 9 12.9 9 13C9 13.55 10.35 14 12 14C13.65 14 15 13.55 15 13C15 12.9 14.95 12.85 14.9 12.75C14.55 13.2 13.4 13.5 12 13.5ZM12 15C10.6 15 9.45 14.7 9.1 14.25C9.05 14.35 9 14.4 9 14.5C9 15.05 10.35 15.5 12 15.5C13.65 15.5 15 15.05 15 14.5C15 14.4 14.95 14.35 14.9 14.25C14.55 14.7 13.4 15 12 15ZM12 16.5C10.6 16.5 9.45 16.2 9.1 15.75C9.05 15.85 9 15.9 9 16C9 16.55 10.35 17 12 17C13.65 17 15 16.55 15 16C15 15.9 14.95 15.85 14.9 15.75C14.55 16.2 13.4 16.5 12 16.5ZM12 18C10.6 18 9.45 17.7 9.1 17.25C9.05 17.35 9 17.4 9 17.5C9 18.05 10.35 18.5 12 18.5C13.65 18.5 15 18.05 15 17.5C15 17.4 14.95 17.35 14.9 17.25C14.55 17.7 13.4 18 12 18ZM12 19.5C10.6 19.5 9.45 19.2 9.1 18.75C9.05 18.85 9 18.9 9 19C9 19.55 10.35 20 12 20C13.65 20 15 19.55 15 19C15 18.9 14.95 18.85 14.9 18.75C14.55 19.2 13.4 19.5 12 19.5Z"
                    fill="#9B9B9B"
                    fill-opacity="0.2"
                  />
                </Svg>
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: "Insights",
          tabBarItemStyle: {
            borderWidth: 0.5,
            borderColor: "#D3D3D3",
          },
          tabBarIcon: ({ color, focused }) => (
            <TabItem
              color={color}
              focused={focused}
              name="Insights"
              svg={
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.4 1.2C2.4 0.88174 2.27357 0.576515 2.04853 0.351472C1.82348 0.126428 1.51826 0 1.2 0C0.88174 0 0.576515 0.126428 0.351472 0.351472C0.126428 0.576515 0 0.88174 0 1.2V21.84C0 22.4129 0.227571 22.9623 0.632649 23.3674C1.03773 23.7724 1.58713 24 2.16 24H22.8C23.1183 24 23.4235 23.8736 23.6485 23.6485C23.8736 23.4235 24 23.1183 24 22.8C24 22.4817 23.8736 22.1765 23.6485 21.9515C23.4235 21.7264 23.1183 21.6 22.8 21.6H2.4V1.2ZM23.6484 6.8484C23.867 6.62208 23.9879 6.31895 23.9852 6.00432C23.9825 5.68968 23.8563 5.38871 23.6338 5.16622C23.4113 4.94373 23.1103 4.81753 22.7957 4.81479C22.481 4.81206 22.1779 4.93301 21.9516 5.1516L14.4 12.7032L10.4484 8.7516C10.2234 8.52664 9.9182 8.40026 9.6 8.40026C9.2818 8.40026 8.97663 8.52664 8.7516 8.7516L3.9516 13.5516C3.83699 13.6623 3.74557 13.7947 3.68268 13.9411C3.61979 14.0875 3.58668 14.245 3.5853 14.4043C3.58392 14.5637 3.61428 14.7217 3.67461 14.8691C3.73495 15.0166 3.82405 15.1506 3.93673 15.2633C4.0494 15.3759 4.18338 15.465 4.33086 15.5254C4.47833 15.5857 4.63635 15.6161 4.79568 15.6147C4.95502 15.6133 5.11248 15.5802 5.25889 15.5173C5.40529 15.4544 5.5377 15.363 5.6484 15.2484L9.6 11.2968L13.5516 15.2484C13.7766 15.4734 14.0818 15.5997 14.4 15.5997C14.7182 15.5997 15.0234 15.4734 15.2484 15.2484L23.6484 6.8484Z"
                    fill={color}
                  />
                </Svg>
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}

// <TabBarIcon name="home" color={color} />,
// headerRight: () => (
//   // <Link href='/modal'>
//   <Pressable>
//     {({ pressed }) => (
//       <FontAwesome
//         name="info-circle"
//         size={25}
//         color={Colors[colorScheme ?? "light"].text}
//         style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
//       />
//     )}
//   </Pressable>
//   // </Link>
// ),

// <View
//   style={{
// backgroundColor: "transparent",
// flexDirection: "column",
// alignItems: "center",
// justifyContent: "center",
//   }}
// >
