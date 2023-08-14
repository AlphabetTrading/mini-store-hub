import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { BaseLayout } from "../../components/BaseLayout";
import AsyncStorageUtils from "../../utils/async_storage";
import { CheckoutItem } from "../../components/NewTransaction/TransactionItem";
import CheckoutInfoBanner from "../../components/NewTransaction/CheckoutInfoBanner";
import TransactionItemsList from "../../components/NewTransaction/TransactionItemsList";
import { useAppTheme } from "@/src/contexts/preference";
import { FAB } from "react-native-paper";

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const [checkoutItems, setCheckoutItems] = React.useState<CheckoutItem[]>([]);
  const isFocused = useIsFocused();
  const { theme } = useAppTheme();
  const fetchCheckoutItems = useCallback(async () => {
    const items = await AsyncStorageUtils.getItem("checkout");
    if(items)
    setCheckoutItems(items);
  }, [navigation, route]);

  useEffect(() => {
    fetchCheckoutItems();
  }, [fetchCheckoutItems, isFocused]);

  return (
    <BaseLayout>
      {checkoutItems.length === 0 ? (
        <View
          style={{
            padding: 10,
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Text style={{ marginTop: 20, color: theme.colors.text }}>
            No items added yet
          </Text>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            rowGap: 10,
          }}
        >
          <TransactionItemsList
            checkoutItems={checkoutItems}
            fetchCheckoutItems={fetchCheckoutItems}
            setCheckoutItems={setCheckoutItems}
          />

          <CheckoutInfoBanner
            checkoutItems={checkoutItems}
            setCheckoutItems={setCheckoutItems}
          />
        </View>
      )}
      <FAB
        icon="plus"
        style={styles.fab}
        size="medium"
        customSize={64}
        onPress={async () => {
          navigation.navigate("Root", {
            screen: "NewTransactionRoot",
            params: { screen: "AddTransactionItems" },
          });
        }}
      />
      {/* <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: theme.colors.primary,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "flex-end",
          margin: 10,
        }}
        onPress={() => {
          navigation.navigate("Root", {
            screen: "NewTransactionRoot",
            params: { screen: "AddTransactionItems" },
          });
        }}
      >
        <Entypo name="plus" style={{ padding: 5 }} size={36} color="white" />
      </TouchableOpacity> */}
    </BaseLayout>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  itemTextStyle: {
    textTransform: "capitalize",
  },
  itemSeparator: {
    flex: 1,
    height: 5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 32,
  },
});
