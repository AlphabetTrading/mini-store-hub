import {
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { GET_CATEGORIES } from "../../graphql/queries/categoryQueries";
import { useQuery } from "@apollo/client";
import { BaseLayout } from "../../components/BaseLayout";
import { useAppTheme } from "../../contexts/preference";
import { useLocalization } from "../../contexts/localization";
import { ActivityIndicator } from "react-native-paper";

type Props = {};

const InventoryScreen = (props: Props) => {
  const navigation = useNavigation();
  const { data, error, refetch, loading } = useQuery(GET_CATEGORIES, {
    errorPolicy: "all",
  });
  const { theme } = useAppTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: theme.colors.background,
    },
    categoryItem: {
      // backgroundColor: "#7B7B7B1A",
      height: 80,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      // height: 75,
    },
    categoryImage: {
      justifyContent: "center",
      alignItems: "center",
      maxWidth: "70%",
      maxHeight: "70%",
    },
    categoryText: {
      color: theme.colors.text,
      fontSize: 11,
      fontFamily: "InterLight",
      textAlign: "center",
    },
  });

  const { t, locale } = useLocalization();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().then(() => {
      setRefreshing(false);
    }
    );
  }, []);
  return (
    <BaseLayout>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color={theme.colors.tint} />
        </View>
      ) : (
        <View style={styles.container}>
          {/* <SearchBar searchPhrase={""} setSearchPhrase={function (value: React.SetStateAction<string>): void {
              throw new Error("Function not implemented.");
            } } /> */}
          <Text
            style={{
              marginLeft: 8,
              color: theme.colors.text,
              fontFamily: "InterBold",
              textTransform: "uppercase",
            }}
          >
            {t("categories")}
          </Text>
          <View
            style={{
              backgroundColor: theme.colors.background,
              width: "100%",
              paddingVertical: 10,
            }}
          >
            {data?.categories.items.length > 0 ? (
              <FlatList
                refreshing={refreshing}
                onRefresh={onRefresh}
                data={data?.categories.items}
                keyExtractor={(item) => item.id}
                numColumns={3}
                ItemSeparatorComponent={() => (
                  <View style={{ width: 10, height: 10 }} />
                )}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: theme.colors.cardBackground,
                      maxWidth: "100%",
                      height: "100%",
                      flex: 1 / 3,
                      alignItems: "center",
                      marginHorizontal: 5,
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      navigation.navigate("Root", {
                        screen: "InventoryRoot",
                        params: {
                          screen: "CategoryDetailScreen",
                          params: {
                            categoryID: item.id,
                            categoryName: locale.includes("en")
                              ? item.name
                              : item.amharicName,
                          },
                        },
                      });
                    }}
                  >
                    <View style={styles.categoryItem} key={index}>
                      <Image
                        style={styles.categoryImage}
                        // source={item.imageSrc}
                        source={require("../../../assets/icons/categories/egg.png")}
                      />
                    </View>
                    <Text style={styles.categoryText}>
                      {locale.includes("en") ? item.name : item.amharicName}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View
                style={{
                  marginVertical: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18, fontFamily: "InterMedium" }}>
                  No Items Found
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </BaseLayout>
  );
};

export default InventoryScreen;
