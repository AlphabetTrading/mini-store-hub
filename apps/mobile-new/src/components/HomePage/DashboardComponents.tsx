import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";
import React from "react";
import { useAuth } from "../../contexts/auth";
import { useGetSalesData } from "../../hooks/api/useGetDashboardData";

type DashboardComponentsProps = {
  selectedFilter: string;
};

const DashboardComponents = (props: DashboardComponentsProps) => {
  const { selectedFilter } = props;
  const { authState } = useAuth();
  const retailShopID = authState?.user.retailShop[0].id;
  const { loading, data, error, refetch } = useGetSalesData(
    retailShopID,
    selectedFilter
  );

  return (
    <View>
      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 20,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            borderRadius: 12,
            justifyContent: "center",
            width: "47%",
            borderWidth: 1,
            borderColor: "#E3E3E3",
            padding: 15,
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "InterRegular",
              color: "#959595",
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            Number of Sales
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ fontFamily: "InterBold", fontSize: 30 }}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                data?.totalSoldProductsByRetailShopAndDate
              )}
            </Text>
            <Svg width="32" height="32" viewBox="0 0 14 14" fill="none">
              <Path
                d="M10.7917 10.2083H9.91666V9.33334H10.7917V10.2083ZM9.04166 10.2083H8.16666V9.04166L9.04166 9.33334V10.2083ZM7.29166 10.2083H6.41666V9.625L7.29166 8.75V10.2083ZM5.54166 10.2083H4.66666V7.58334L5.25 7L5.54166 8.45834V10.2083ZM3.79166 10.2083H2.91666V6.125L3.79166 7V10.2083Z"
                fill="#B82828"
              />
              <Path
                d="M2.91664 3.79163V5.13822L4.66664 6.70829L5.54164 5.83329L6.41664 8.74995L8.16662 6.70829L9.33328 7.87495L8.45828 8.74995H10.7916V6.41663L9.91662 7.29163L8.16662 5.54163L6.7083 7.29163L5.8333 4.37497L4.66664 5.54163L2.91664 3.79163Z"
                fill="#B82828"
              />
            </Svg>
          </View>
        </View>
        <View
          style={{
            borderRadius: 12,
            justifyContent: "center",
            width: "47%",
            borderWidth: 1,
            borderColor: "#E3E3E3",
            padding: 15,
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "InterRegular",
              color: "#959595",
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            Revenue
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ fontFamily: "InterBold", fontSize: 30 }}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                data?.totalSalesByDateAndRetailShop
              )}
            </Text>
            <Svg width="32" height="32" viewBox="0 0 14 14" fill="none">
              <Path
                d="M2.91664 8.75007V7.40347L4.66664 5.83341L5.54164 6.70841L6.41662 3.79175L8.16662 5.83341L9.33328 4.66675L8.45828 3.79175H10.7916V6.12507L9.91662 5.25009L8.16662 7.00007L6.7083 5.25009L5.8333 8.16673L4.66664 7.00007L2.91664 8.75007Z"
                fill="#3CC949"
              />
              <Path
                d="M10.7917 10.2083H9.91666V6.41663L10.7917 7.29163V10.2083ZM9.04166 10.2083H8.16666V8.16663L9.04166 7.29164V10.2083ZM7.29166 10.2083H6.41666V8.4583L6.85416 6.7083L7.29166 7.29163V10.2083ZM5.54166 10.2083H4.66666V8.16663L5.54166 9.04163V10.2083ZM3.79166 10.2083H2.91666V9.91664L3.79166 9.04164V10.2083Z"
                fill="#3CC949"
              />
            </Svg>
          </View>
        </View>
        <View
          style={{
            borderRadius: 12,
            justifyContent: "center",
            width: "47%",
            borderWidth: 1,
            borderColor: "#E3E3E3",
            padding: 15,
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "InterRegular",
              color: "#959595",
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            Profit{" "}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ fontFamily: "InterBold", fontSize: 30 }}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                data?.totalProfitByDateAndRetailShop
              )}
            </Text>
            <Svg width="32" height="32" viewBox="0 0 14 14" fill="none">
              <Path
                d="M10.7917 10.2083H9.91666V9.33334H10.7917V10.2083ZM9.04166 10.2083H8.16666V9.04166L9.04166 9.33334V10.2083ZM7.29166 10.2083H6.41666V9.625L7.29166 8.75V10.2083ZM5.54166 10.2083H4.66666V7.58334L5.25 7L5.54166 8.45834V10.2083ZM3.79166 10.2083H2.91666V6.125L3.79166 7V10.2083Z"
                fill="#B82828"
              />
              <Path
                d="M2.91664 3.79163V5.13822L4.66664 6.70829L5.54164 5.83329L6.41664 8.74995L8.16662 6.70829L9.33328 7.87495L8.45828 8.74995H10.7916V6.41663L9.91662 7.29163L8.16662 5.54163L6.7083 7.29163L5.8333 4.37497L4.66664 5.54163L2.91664 3.79163Z"
                fill="#B82828"
              />
            </Svg>
          </View>
        </View>
        <View
          style={{
            borderRadius: 12,
            justifyContent: "center",
            width: "47%",
            borderWidth: 1,
            borderColor: "#E3E3E3",
            padding: 15,
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "InterRegular",
              color: "#959595",
              fontSize: 10,
              textTransform: "uppercase",
            }}
          >
            Gross Margin
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ fontFamily: "InterBold", fontSize: 30 }}>
              {loading ? (
                <ActivityIndicator />
              ) : data?.totalSalesByDateAndRetailShop ? (
                (data?.totalProfitByDateAndRetailShop /
                  data?.totalSalesByDateAndRetailShop) *
                100
              ) : (
                0
              )}
            </Text>
            <Svg width="32" height="32" viewBox="0 0 14 14" fill="none">
              <Path
                d="M10.7917 10.2083H9.91666V9.33334H10.7917V10.2083ZM9.04166 10.2083H8.16666V9.04166L9.04166 9.33334V10.2083ZM7.29166 10.2083H6.41666V9.625L7.29166 8.75V10.2083ZM5.54166 10.2083H4.66666V7.58334L5.25 7L5.54166 8.45834V10.2083ZM3.79166 10.2083H2.91666V6.125L3.79166 7V10.2083Z"
                fill="#B82828"
              />
              <Path
                d="M2.91664 3.79163V5.13822L4.66664 6.70829L5.54164 5.83329L6.41664 8.74995L8.16662 6.70829L9.33328 7.87495L8.45828 8.74995H10.7916V6.41663L9.91662 7.29163L8.16662 5.54163L6.7083 7.29163L5.8333 4.37497L4.66664 5.54163L2.91664 3.79163Z"
                fill="#B82828"
              />
            </Svg>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DashboardComponents;

const styles = StyleSheet.create({});
