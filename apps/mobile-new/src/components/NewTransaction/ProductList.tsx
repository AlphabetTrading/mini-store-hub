import React from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import { useAppTheme } from '../../contexts/preference';
import SingleProductItemCard from './SingleProductItemCard';
import CustomDivider from '../CustomDivider';

type Props = {
    filteredProducts: any[];
    refreshing: boolean;
    onRefresh: () => void;
}

const ProductList = ({ filteredProducts, refreshing, onRefresh }: Props) => {
    const { theme } = useAppTheme();

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
            borderRadius: 32,
            backgroundColor: theme.colors.primary,
        },
    });
    return (
        <View
            style={{
                backgroundColor: theme.colors.background,
                width: "100%",
            }}
        >
            <FlatList
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={filteredProducts}
                ItemSeparatorComponent={CustomDivider}
                renderItem={({ item, index }) => (
                    <SingleProductItemCard
                        key={item.id}
                        item={item} selectItem={function (item: any): void {
                            throw new Error('Function not implemented.');
                        }} updateItem={function (item: any): void {
                            throw new Error('Function not implemented.');
                        }} alreadySelected={[]} />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default ProductList

const styles = StyleSheet.create({})