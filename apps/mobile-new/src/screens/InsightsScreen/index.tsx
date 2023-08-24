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
import { useGetInsightsData } from "../../hooks/api/useGetInsightsData";
import { useAuth } from "../../contexts/auth";
import { useAppTheme } from "../../contexts/preference";
import { INSIGHTS_TYPE } from "../../types/types";
import { useLocalization } from "../../contexts/localization";

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

  const { locale } = useLocalization();

  return loading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : error ? (
    <Text>Error Try Again</Text>
  ) : (
    data?.findProductsBySoldQuantityAndRetailShop.items.map(
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
            <View>
              <Text
                style={{
                  fontFamily: "InterMedium",
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              >
                {index + 1}.
                {locale.includes("en") ? item.name : item.amharicName}
              </Text>
              <Text
                style={{
                  fontFamily: "InterMedium",
                  fontSize: 14,
                  color: theme.colors.text,
                }}
              >
                in-{item.unit}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "InterMedium",
                color: theme.colors.text,
              }}
            >
              {item.serialNumber}
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
  const { t, locale } = useLocalization();
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
            <View>
              <Text
                style={{
                  fontFamily: "InterMedium",
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              >
                {index + 1}.{" "}
                {locale.includes("en") ? item.name : item.amharicName}
              </Text>
              <Text
                style={{
                  fontFamily: "InterMedium",
                  fontSize: 14,
                  color: theme.colors.text,
                }}
              >
                in-{item.unit}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "InterMedium",
                color: theme.colors.text,
              }}
            >
              {item.serialNumber}
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
  const { t } = useLocalization();
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
            {t("mostSoldItems")}
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
                screen: "InsightsRoot",
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
              {t("seeMore")}
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              textTransform: "uppercase",
              color: theme.colors.textSecondary,
              marginBottom: 20,
            }}
          >
            {t("mostRevenue")}
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
                screen: "InsightsRoot",
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
              {t("seeMore")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};

export default InsightsScreen;
