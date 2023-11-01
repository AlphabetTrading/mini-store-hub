import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { BaseLayout } from "../../components/BaseLayout";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/auth";
import { useAppTheme } from "../../contexts/preference";
import { INSIGHTS_TYPE } from "../../types/types";
import { useLocalization } from "../../contexts/localization";
import MostSoldItems from "../../components/Insights/MostSoldItems";
import TopSellingItems from "../../components/Insights/TopSellingItems";

type Props = {};



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
