import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { BaseLayout } from "../../components/BaseLayout";
import { useNavigation } from "@react-navigation/native";
import { INSIGHTS_TYPE } from "../../types";
import { useGetInsightsData } from "../../hooks/api/useGetInsightsData";
import { useAuth } from "../../contexts/auth";
import { useAppTheme } from "@/src/contexts/preference";

type Props = {};

const MostSoldItems = ({
  retailShopID,
  insightsType,
}: {
  retailShopID: string;
  insightsType: INSIGHTS_TYPE;
}) => {
  const { theme } = useAppTheme();
  const { data, loading, refetch, error } = useGetInsightsData(
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
    data.findProductsBySoldQuantityAndRetailShop.items.map(
      (item: any, index: number) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: theme.colors.cardBackground,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
              marginVertical: 2,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontFamily: "InterMedium",
                fontSize: 16,
                color: theme.colors.text,
              }}
            >
              {index + 1}. {item.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "InterMedium",
                color: theme.colors.text,
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
  const { data, loading, refetch, error } = useGetInsightsData(
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
    data.findProductsByTopSellAndByRetailShop.items.map(
      (item: any, index: number) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: theme.colors.cardBackground,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
              marginVertical: 2,
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                fontFamily: "InterMedium",
                fontSize: 16,
                color: theme.colors.text,
              }}
            >
              {index + 1}. {item.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "InterMedium",
                color: theme.colors.text,
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

const InsightsScreen = (props: Props) => {
  const navigation = useNavigation();
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
    <BaseLayout>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              textTransform: "uppercase",
              color: theme.colors.textSecondary,
              marginBottom: 20,
            }}
          >
            Most Sold Items
          </Text>
          <MostSoldItems
            retailShopID={retailShopID}
            insightsType={INSIGHTS_TYPE.MOST_SOLD_ITEMS}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingVertical: 30,
            }}
            onPress={() => {
              navigation.navigate("Root", {
                screen: "Insights",
                params: {
                  screen: "InsightsDetailScreen",
                  params: {
                    insightsID: INSIGHTS_TYPE.MOST_SOLD_ITEMS,
                  },
                },
              });
            }}
          >
            <Text
              style={{ color: theme.colors.accent, fontFamily: "InterMedium" }}
            >
              See More
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textTransform: "uppercase",
              color: theme.colors.textSecondary,
              marginBottom: 20,
            }}
          >
            Most Revenue by item
          </Text>
          <TopSellingItems
            retailShopID={retailShopID}
            insightsType={INSIGHTS_TYPE.MOST_REVENUE_BY_ITEM}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingVertical: 20,
            }}
            onPress={() => {
              navigation.navigate("Root", {
                screen: "Insights",
                params: {
                  screen: "InsightsDetailScreen",
                  params: {
                    insightsID: INSIGHTS_TYPE.MOST_REVENUE_BY_ITEM,
                  },
                },
              });
            }}
          >
            <Text
              style={{ color: theme.colors.accent, fontFamily: "InterMedium" }}
            >
              See More
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

export default InsightsScreen;
