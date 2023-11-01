import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalization } from '../../contexts/localization';
import { useAppTheme } from '../../contexts/preference';
import SalesTransactions from '../../components/Transactions/SalesTransactions/SalesTransactions';
import IncomingTransactionsScreen from '../../components/Transactions/IncomingTransactions/IncomingTransactions';

const TransactionsScreen = () => {
    const { theme } = useAppTheme();
    const { t } = useLocalization();
    const filters = [
        { id: "sales", name: t("outgoingTransactions") },
        { id: "incoming", name: t("incomingTransactions") },
    ];
    const [selectedFilter, setSelectedFilter] = useState(filters[0].id);

    return (
        <View
            style={{
                flex: 1,
                padding: 20,
                flexDirection: "column",
                rowGap: 10,
                backgroundColor: theme.colors.background,
            }}
        >
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        width: "100%",
                        borderRadius: 4,
                        overflow: "hidden",
                        borderColor: "#D4D4D4",
                        borderWidth: 0.5,
                    }}
                >
                    {filters.map(
                        (filter: { id: string; name: string }, index: number) => {
                            return (
                                <TouchableWithoutFeedback
                                    key={filter.id}
                                    onPress={() => {
                                        setSelectedFilter(filter.id);
                                    }}
                                >
                                    <View
                                        key={index}
                                        style={{
                                            flex: 1,
                                            borderWidth: 0.5,
                                            borderColor: "#D4D4D4",
                                            paddingVertical: 8,
                                            backgroundColor:
                                                selectedFilter === filter.id
                                                    ? "#5684E033"
                                                    : theme.colors.cardBackground,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                textAlign: "center",
                                                textTransform: "capitalize",
                                                color: theme.colors.text,
                                                // color:
                                                //   selectedFilter === filter.id ? "#5684E0" : "#6D6D6D",
                                                fontFamily:
                                                    selectedFilter === filter.id
                                                        ? "InterSemiBold"
                                                        : "InterRegular",
                                            }}
                                        >
                                            {filter.name}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        }
                    )}
                </View>
                <View
                    style={{
                        marginTop: 20,
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 20,
                        justifyContent: "space-between",
                    }}
                >
                    {
                        selectedFilter === "sales" ? (
                            <SalesTransactions />
                        ) : (
                            <IncomingTransactionsScreen />
                        )
                    }
                </View>
            </View>
        </View>
    )
}

export default TransactionsScreen

const styles = StyleSheet.create({})