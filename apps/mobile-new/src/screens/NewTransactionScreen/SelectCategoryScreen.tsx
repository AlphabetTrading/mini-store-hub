import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { BaseLayout } from "../../components/BaseLayout";
import SearchBar from "../../components/SearchBar";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../graphql/queries/categoryQueries";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const SelectCategory = ({ route }: any) => {
  const navigation = useNavigation();
  const { data, error, refetch, loading } = useQuery(GET_CATEGORIES);
  return (
    <BaseLayout style={{ padding: 10 }}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={styles.container}>
          {data.categories.items.length > 0 ? (
            <View
              style={{
                backgroundColor: Colors.light.background,
                width: "100%",
              }}
            >
              <SearchBar />
              <View
                style={{
                  backgroundColor: Colors.light.background,
                  width: "100%",
                }}
              >
                <FlatList
                  data={data.categories.items}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.light.background,
                        width: "100%",
                        height: "100%",
                        flex: 0.25,
                        alignItems: "center",
                        margin: 8,
                        gap: 4,
                      }}
                      onPress={() =>
                        navigation.navigate("Root", {
                          screen: "NewTransactionRoot",
                          params: {
                            screen: "SelectItem",
                            params: {
                              categoryID: item.id,
                            },
                          },
                        })
                      }
                    >
                      <View style={styles.categoryItem} key={index}>
                        <Image
                          style={styles.categoryImage}
                          source={require("../../../assets/icons/categories/egg.png")}
                        />
                      </View>
                      <Text style={styles.categoryText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  // keyExtractor={(item) => item.id}
                  numColumns={4}
                />
                {/* {DATA.map((item: any, index: number) => {
            return (
              <View style={styles.categoryItem} key={index}>
                <Image
                  style={styles.categoryImage}
                  source={require("../../assets/icons/Group.jpg")}
                />
                <Text style={styles.categoryText}>{item.title}</Text>
              </View>
            );
          })} */}
              </View>
            </View>
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
      )}
    </BaseLayout>
  );
};

export default SelectCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 15,
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
