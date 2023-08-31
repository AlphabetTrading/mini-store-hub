import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '../../contexts/preference';
import { useGetInsightsData } from '../../hooks/api/useGetInsightsData';
import { INSIGHTS_TYPE } from '../../types/types';
import SingleItem from './SingleItem';
import { ActivityIndicator } from 'react-native-paper';

const TopSellingItems = ({
    retailShopID,
    insightsType,
}: {
    retailShopID: string;
    insightsType: INSIGHTS_TYPE;

}) => {
    const { data, loading, refetch, error } = useGetInsightsData(
        retailShopID,
        insightsType,
    );
    const { theme } = useAppTheme();

    return loading ? (
        <View>
            <ActivityIndicator color={theme.colors.tint} />
        </View>
    ) : error ? (
        <Text>Error Try Again</Text>
    ) : (
        data?.findProductsByTopSellAndByRetailShop.items.map((item: any, index: number) => (
            <SingleItem key={item.id} item={item} index={index} />
        ))
    );
};

export default TopSellingItems

const styles = StyleSheet.create({})