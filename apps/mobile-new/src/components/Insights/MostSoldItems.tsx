import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '../../contexts/preference';
import { useGetInsightsData } from '../../hooks/api/useGetInsightsData';
import { INSIGHTS_TYPE } from '../../types/types';
import { ActivityIndicator } from 'react-native-paper';
import SingleItem from './SingleItem';

const MostSoldItems = ({
    retailShopID,
    insightsType,
    isRefreshing,
}: {
    retailShopID: string;
    insightsType: INSIGHTS_TYPE;
    isRefreshing?: boolean;
}) => {
    const { theme } = useAppTheme();
    const { data, loading, error, refetch } = useGetInsightsData(
        retailShopID,
        insightsType,
    );
    React.useEffect(() => {
        if (isRefreshing) {
            refetch();
        }
    }, [isRefreshing]);

    return loading ? (
        <View>
            <ActivityIndicator color={theme.colors.tint} />
        </View>
    ) : error ? (
        <Text
            style={{
                color: theme.colors.textSecondary,
            }}
        >Error Try Again</Text>
    ) : (
        data?.findProductsBySoldQuantityAndRetailShop.items.map((item: any, index: number) => (
            <SingleItem key={item.id} item={item} index={index} />
        ))

    );
};


export default MostSoldItems

const styles = StyleSheet.create({})