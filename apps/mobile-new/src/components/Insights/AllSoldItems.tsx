import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '../../contexts/preference';
import { useGetInsightsDataDetail } from '../../hooks/api/useGetInsightsData';
import { INSIGHTS_TYPE } from '../../types/types';
import { ActivityIndicator } from 'react-native-paper';
import ItemsList from './ItemsList';

const AllSoldItems = ({
    retailShopID,
    insightsType,
}: {
    retailShopID: string;
    insightsType: INSIGHTS_TYPE;
}) => {
    const { theme } = useAppTheme();
    const { data, loading, error, refetch } = useGetInsightsDataDetail(
        retailShopID,
        insightsType,
    );

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch()
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return loading ? (
        <View>
            <ActivityIndicator color={theme.colors.tint} />
        </View>
    ) : error ? (
        <Text>Error Try Again</Text>
    ) : (
        <ItemsList filteredItems={data?.findProductsBySoldQuantityAndRetailShop.items} refreshing={refreshing} onRefresh={onRefresh} />
    );
};


export default AllSoldItems

const styles = StyleSheet.create({})