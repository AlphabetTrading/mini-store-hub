import { Stack } from "expo-router";
import React from "react";

type Props = {};

const _layout = (props: Props) => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Inventory" }} />
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
