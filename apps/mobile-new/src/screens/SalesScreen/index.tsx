import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { BaseLayout } from "../../components/BaseLayout";
import { GET_SALES_TRANSACTIONS_BY_RETAIL_SHOP } from "../../graphql/queries/salesQueries";
import { useQuery } from "@apollo/client";
import { useAuth } from "../../contexts/auth";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const SalesScreen = (props: Props) => {
  const navigation = useNavigation();
  const { authState } = useAuth();
  const { loading, data, error, refetch } = useQuery(
    GET_SALES_TRANSACTIONS_BY_RETAIL_SHOP,
    {
      variables: {
        retailShopId: authState?.user.retailShop[0].id,
        orderBy: {
          field: "createdAt",
          direction: "desc",
        },
      },
    }
  );
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
          <View
            style={{
              backgroundColor: Colors.light.background,
              width: "100%",
            }}
          >
            <FlatList
              data={data.saleTransactionsByRetailShop.items}
              ListHeaderComponent={
                <Text
                  style={{
                    marginLeft: 8,
                    color: "#828282",
                    textTransform: "uppercase",
                  }}
                >
                  Sales
                </Text>
              }
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#FFF",
                    marginVertical: 4,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: 16,
                    paddingHorizontal: 18,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("SalesDetail", {
                      id: item.id,
                      totalPrice: item.totalPrice,
                    });
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontFamily: "InterSemiBold",
                        fontSize: 18,
                        color: "#4F4F4F",
                      }}
                    >
                      {format(new Date(item.createdAt), "MMM dd yyyy")}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "InterRegular",
                        fontSize: 14,
                        color: "#80848A",
                      }}
                    >
                      {format(new Date(item.createdAt), "pp")}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 12,
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontFamily: "InterSemiBold",
                          fontSize: 18,
                          color: "#4F4F4F",
                        }}
                      >
                        ETB {item.totalPrice}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "InterRegular",
                          fontSize: 14,
                          color: "#80848A",
                          textAlign: "right",
                        }}
                      >
                        {item.saleTransactionItems?.length} Items
                      </Text>
                    </View>
                    <Entypo name="chevron-right" size={24} color="#4F4F4F" />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      )}
    </BaseLayout>
  );
};

export default SalesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: Colors.light.background,
  },
});
