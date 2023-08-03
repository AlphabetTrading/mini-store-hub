import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { GET_CATEGORIES } from "../../graphql/queries/categoryQueries";
import { useQuery } from "@apollo/client";
import { BaseLayout } from "../../components/BaseLayout";

type Props = {};

const InventoryScreen = (props: Props) => {
  const navigation = useNavigation();
  const { data, error, refetch, loading } = useQuery(GET_CATEGORIES);
  return (
    <BaseLayout>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          <Text
            style={{
              marginLeft: 8,
              color: "#828282",
              fontFamily: "InterBold",
              textTransform: "uppercase",
            }}
          >
            Categories
          </Text>
          <View
            style={{
              backgroundColor: Colors.light.background,
              width: "100%",
            }}
          >
            {data.categories.items.length > 0 ? (
              <FlatList
                data={data.categories.items}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.light.background,
                      maxWidth: "100%",
                      height: "100%",
                      flex: 1 / 4,
                      alignItems: "center",
                      margin: 8,
                      gap: 4,
                    }}
                    onPress={() => {
                      navigation.navigate("Root", {
                        screen: "InventoryRoot",
                        params: {
                          screen: "CategoryDetailScreen",
                          params: {
                            categoryID: item.id,
                            categoryName: item.name,
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
                    <Text style={styles.categoryText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                numColumns={4}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.light.background,
  },
  categoryItem: {
    backgroundColor: "#7B7B7B1A",
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
    color: "#777777",
    fontSize: 11,
    fontFamily: "InterLight",
  },
});
