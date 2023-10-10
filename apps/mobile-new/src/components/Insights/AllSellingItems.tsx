import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalization } from '../../contexts/localization';
import { useAppTheme } from '../../contexts/preference';
import { useGetInsightsDataDetail } from '../../hooks/api/useGetInsightsData';
import { INSIGHTS_TYPE } from '../../types/types';
import ItemsList from './ItemsList';

const AllSellingItems = ({
    retailShopID,
    insightsType,
}: {
    retailShopID: string;
    insightsType: INSIGHTS_TYPE;

}) => {
    const { data, loading, refetch, error } = useGetInsightsDataDetail(
        retailShopID,
        insightsType,
    );
    const { theme } = useAppTheme();

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch();
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
        <ItemsList filteredItems={data?.findProductsByTopSellAndByRetailShop.items} refreshing={refreshing} onRefresh={onRefresh} />
    );
};

export default AllSellingItems

const styles = StyleSheet.create({})