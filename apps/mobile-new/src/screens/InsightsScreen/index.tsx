import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { BaseLayout } from "../../components/BaseLayout";
import { useNavigation } from "@react-navigation/native";
import { INSIGHTS_TYPE } from "../../types";
import { useGetInsightsData } from "../../hooks/api/useGetInsightsData";
import { useAuth } from "../../contexts/auth";

type Props = {};

const MostSoldItems = ({
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

  console.log(data, error, " -----------");

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
              backgroundColor: "#FFF",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
              marginVertical: 2,
              borderRadius: 6,
            }}
          >
            <Text style={{ fontFamily: "Inter-Medium", fontSize: 16 }}>
              {index + 1}. {item.name}
            </Text>
            <Text style={{ fontSize: 16, fontFamily: "Inter-Medium" }}>
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

  console.log(data, error, " -----------");

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
            <Text style={{ fontFamily: "Inter-Medium", fontSize: 16 }}>
              {index + 1}. {item.name}
            </Text>
            <Text style={{ fontSize: 16, fontFamily: "Inter-Medium" }}>
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

  return (
    <BaseLayout>
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              textTransform: "uppercase",
              color: "#828282",
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
            <Text style={{ color: "#5684E0", fontFamily: "InterMedium" }}>
              See More
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textTransform: "uppercase",
              color: "#828282",
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
            <Text style={{ color: "#5684E0", fontFamily: "InterMedium" }}>
              See More
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

export default InsightsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.light.background,
  },
});
