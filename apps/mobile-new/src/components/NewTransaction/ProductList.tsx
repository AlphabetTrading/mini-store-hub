import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-paper';
import { useLocalization } from '../../contexts/localization';
import { useAppTheme } from '../../contexts/preference';
import SingleProductItemCard from './SingleProductItemCard';

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
                ItemSeparatorComponent={Divider}
                renderItem={({ item, index }) => (
                    <SingleProductItemCard
                        key={item.id}
                        item={item}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default ProductList

const styles = StyleSheet.create({})