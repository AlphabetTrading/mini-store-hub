import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import TransactionItem, { CheckoutItem } from "./TransactionItem";

const TransactionItemsList = ({
  checkoutItems,
  fetchCheckoutItems,
  setCheckoutItems,
}: {
  checkoutItems: CheckoutItem[];
  fetchCheckoutItems: any;
  setCheckoutItems: any;
}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchCheckoutItems();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <FlatList
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      data={checkoutItems}
      renderItem={({ item, index }) => (
        <TransactionItem
          key={item.productId}
          checkoutItem={item}
          setCheckoutItems={setCheckoutItems}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 5 }}></View>}
      inverted={true}
      keyExtractor={(item, index) => item.productId}
    />
  );
};

export default TransactionItemsList;

const styles = StyleSheet.create({
  itemSeparator: {
    // flex: 1,
    height: 5,
  },
});
