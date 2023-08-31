import React from 'react'
import { FlatList, RefreshControl, StyleSheet } from 'react-native'
import SingleItem from './SingleItem';
import { useAppTheme } from '../../contexts/preference';

type Props = {
    refreshing: boolean;
    onRefresh: () => void;
    filteredItems: any[];
}

const ItemsList = ({
    refreshing,
    onRefresh,
    filteredItems,
}: Props
) => {
    const { theme } = useAppTheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.colors.background,
        },
    });

    return (
        <FlatList
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => <SingleItem item={item} index={index} />}
        />

    )
}

export default ItemsList

const styles = StyleSheet.create({})