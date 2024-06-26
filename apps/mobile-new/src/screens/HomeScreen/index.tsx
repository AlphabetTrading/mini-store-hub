import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Text } from "react-native-paper";
import { useCallback, useState } from "react";
import { BaseLayout } from "../../components/BaseLayout";
import { StatusBar } from "expo-status-bar";
import DashboardComponents from "../../components/HomePage/DashboardComponents";
import { useLocalization } from "../../contexts/localization";
import { useAppTheme } from "../../contexts/preference";
import LowStockItems from "../../components/HomePage/LowStockItems";
export default function HomeScreen() {
  const { theme } = useAppTheme();
  const { t } = useLocalization();
  const filters = [
    { id: "daily", name: t("daily") },
    { id: "weekly", name: t("weekly") },
    { id: "monthly", name: t("monthly") },
  ];
  const [selectedFilter, setSelectedFilter] = useState(filters[0].id);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <BaseLayout
      style={{
        position: "relative",
        backgroundColor: theme.colors.background,
      }}
    >
      <StatusBar style="light" />

      <ScrollView
        style={{
          padding: 20,
          flexDirection: "column",
          rowGap: 10,
        }}

        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              borderRadius: 4,
              overflow: "hidden",
              borderColor: "#D4D4D4",
              borderWidth: 0.5,
            }}
          >
            {filters.map(
              (filter: { id: string; name: string }, index: number) => {
                return (
                  <TouchableWithoutFeedback
                    key={filter.id}
                    onPress={() => {
                      setSelectedFilter(filter.id);
                    }}
                  >
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        borderWidth: 0.5,
                        borderColor: "#D4D4D4",
                        paddingVertical: 8,
                        backgroundColor:
                          selectedFilter === filter.id
                            ? "#5684E033"
                            : theme.colors.cardBackground,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          textTransform: "capitalize",
                          color: theme.colors.text,
                          // color:
                          //   selectedFilter === filter.id ? "#5684E0" : "#6D6D6D",
                          fontFamily:
                            selectedFilter === filter.id
                              ? "InterSemiBold"
                              : "InterRegular",
                        }}
                      >
                        {filter.name}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              }
            )}
          </View>
          <DashboardComponents selectedFilter={selectedFilter} isRefreshing={refreshing} />
        </View>

        <LowStockItems isRefreshing={refreshing} />
      </ScrollView>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
