import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
} from "../../hooks/api/useGetInsightsData";
import { useAuth } from "../../contexts/auth";
import { useAppTheme } from "../../contexts/preference";
import { INSIGHTS_TYPE } from "../../types/types";
import AllSoldItems from "../../components/Insights/AllSoldItems";
import AllSellingItems from "../../components/Insights/AllSellingItems";

const InsightsDetailScreen = ({
  route,
}: {
  route: { params: { insightsID: INSIGHTS_TYPE } };
}) => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none",
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);

  const { authState } = useAuth();
  const retailShopID = authState?.user.retailShop[0].id;
  const { theme } = useAppTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.colors.background,
      minHeight: "100%"
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {route.params.insightsID === INSIGHTS_TYPE.MOST_SOLD_ITEMS ? (
          <AllSoldItems
            retailShopID={retailShopID}
            insightsType={INSIGHTS_TYPE.MOST_SOLD_ITEMS}
          />
        ) : (
          <AllSellingItems
            retailShopID={retailShopID}
            insightsType={INSIGHTS_TYPE.MOST_REVENUE_BY_ITEM}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default InsightsDetailScreen;
