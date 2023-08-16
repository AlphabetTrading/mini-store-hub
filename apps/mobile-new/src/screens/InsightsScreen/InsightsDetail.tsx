import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import {
  useGetInsightsData,
  useGetInsightsDataDetail,
} from "../../hooks/api/useGetInsightsData";
import { useAuth } from "../../contexts/auth";
import { AppTheme, useAppTheme } from "@/src/contexts/preference";
import { INSIGHTS_TYPE } from "@/src/types/types";

const MostSoldItems = ({
  retailShopID,
  insightsType,
}: {
  retailShopID: string;
  insightsType: INSIGHTS_TYPE;
}) => {
  const { data, loading, refetch, error } = useGetInsightsDataDetail(
    retailShopID,
    insightsType
  );

  const { theme } = useAppTheme();

  return loading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : error ? (
    <Text>Error Try Again</Text>
  ) : (
    data.findProductsBySoldQuantityAndRetailShop.items.map(
      (item: any, index: number) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: theme.colors.primary,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
              marginVertical: 2,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: theme.colors.text,
                fontFamily: "InterMedium",
                fontSize: 16,
              }}
            >
              {index + 1}. {item.name}
            </Text>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 16,
                fontFamily: "InterMedium",
              }}
            >
              120kg
            </Text>
          </View>
        );
      }
    )
  );
};

const TopSellingItems = ({
  retailShopID,
  insightsType,
}: {
  retailShopID: string;
  insightsType: INSIGHTS_TYPE;
}) => {
  const { data, loading, refetch, error } = useGetInsightsDataDetail(
    retailShopID,
    insightsType
  );

  return loading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : error ? (
    <Text>Error Try Again</Text>
  ) : (
    data.findProductsByTopSellAndByRetailShop.items.map(
      (item: any, index: number) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: "#FFF",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
              marginVertical: 2,
              borderRadius: 6,
            }}
          >
            <Text style={{ fontFamily: "InterMedium", fontSize: 16 }}>
              {index + 1}. {item.name}
            </Text>
            <Text style={{ fontSize: 16, fontFamily: "InterMedium" }}>
              120kg
            </Text>
          </View>
        );
      }
    )
  );
};

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
      padding: 15,
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          {route.params.insightsID === INSIGHTS_TYPE.MOST_SOLD_ITEMS ? (
            <MostSoldItems
              retailShopID={retailShopID}
              insightsType={INSIGHTS_TYPE.MOST_SOLD_ITEMS}
            />
          ) : (
            <TopSellingItems
              retailShopID={retailShopID}
              insightsType={INSIGHTS_TYPE.MOST_REVENUE_BY_ITEM}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InsightsDetailScreen;
