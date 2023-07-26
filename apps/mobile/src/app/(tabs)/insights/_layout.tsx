import { Stack } from "expo-router";
import React from "react";

type Props = {};

const _layout = (props: Props) => {
  return (
    <Stack screenOptions={{ title: "Insights" }}>
      <Stack.Screen name="details" />
    </Stack>
  );
};

export default _layout;
