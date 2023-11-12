import React from "react";
import { View, Text, StatusBar, Dimensions, FlatList, RefreshControl, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useLocalization } from "../../contexts/localization";
import { useAppTheme } from "../../contexts/preference";
import SingleProductItemCard from "../../components/NewTransaction/SingleProductItemCard";
import CustomDivider from "../../components/CustomDivider";

const DATA = [
    {
        title: "First Item",
    },
    {
        title: "Second Item",
    },
];
const keyExtractor = (item: any) => item.id;
type Props = {
    updateItem: (item: any) => void;
    selectItem: (item: any) => void;
    alreadySelected: any[];
    refreshing: boolean;
    onRefresh: () => void;
    products: any[];

};
const ItemsList = ({ updateItem, selectItem, alreadySelected, refreshing, onRefresh, products }: Props) => {
    const { theme } = useAppTheme();
    const { t } = useLocalization();


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: 5,
            backgroundColor: theme.colors.background,
        },
        fab: {
            position: "absolute",
            margin: 16,
            right: 0,
            bottom: 0,
            borderRadius: 33,
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.white,
            color: theme.colors.white,
            borderWidth: theme.mode === "light" ? 0 : 1.5,
            elevation: 4,
        },
    });

    return (
        <View style={{ height: "100%", width: Dimensions.get("screen").width }}>
            <FlatList
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={products}
                ItemSeparatorComponent={CustomDivider}
                renderItem={({ item }: any) => (
                    <SingleProductItemCard
                        key={item.id}
                        item={item}
                        updateItem={updateItem}
                        selectItem={selectItem}
                        alreadySelected={alreadySelected}
                    />
                )}
                // extraData={alreadySelected}
                keyExtractor={keyExtractor}
            />
            {/* <FlashList
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={filteredProducts}
                ItemSeparatorComponent={CustomDivider}
                renderItem={({ item }: any) => (
                    <Text style={{ color: "white" }}>Helo</Text>
                    // <SingleProductItemCard
                    //   key={item.id}
                    //   item={item}
                    //   updateItem={updateItem}
                    //   selectItem={selectItem}
                    //   alreadySelected={alreadySelected}
                    // />
                )}
                estimatedItemSize={300}
            /> */}

            {/* <FlashList
                data={DATA}
                renderItem={({ item }) => <Text style={{ color: "white" }}>{item.title}</Text>}
                estimatedItemSize={200}
            /> */}
        </View>
    );
};



export default ItemsList;