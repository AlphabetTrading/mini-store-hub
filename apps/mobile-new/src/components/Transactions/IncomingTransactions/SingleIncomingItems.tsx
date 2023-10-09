import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { useAppTheme } from '../../../contexts/preference';
import { useLocalization } from '../../../contexts/localization';

type Props = {
    item: any;
}

const SingleIncomingItems = React.memo(({ item }: Props) => {
    const { theme } = useAppTheme();
    const navigation = useNavigation();
    const { t, locale } = useLocalization();
    return (
        <TouchableOpacity
            style={{
                backgroundColor: theme.colors.cardBackground,
                marginVertical: 4,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                padding: 16,
                paddingHorizontal: 18,
                borderRadius: 10,
            }}
            onPress={() => {
                navigation.navigate("Root", {
                    screen: "TransactionsRoot",
                    params: {
                        screen: "IncomingTransactionDetailScreen",
                        params: {
                            transactionID: item.id,
                            totalPrice: item.totalPrice,
                        },
                    },
                });
            }}
        >
            <View>
                <Text
                    style={{
                        fontFamily: "InterSemiBold",
                        fontSize: 14,
                        color: theme.colors.text,
                    }}
                >
                    {format(new Date(item.createdAt), "MMM dd yyyy")}
                </Text>
                <Text
                    style={{
                        fontFamily: "InterRegular",
                        fontSize: 14,
                        color: theme.colors.text,
                        maxWidth: 200,
                    }}
                >
                    {t("from")}: {locale.includes("am") ? item.sourceWarehouse?.amharicName ?? item.sourceWarehouse.name : item.sourceWarehouse.name}

                </Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    gap: 12,
                    alignItems: "center",
                }}
            >
                <View>
                    <Text
                        style={{
                            fontFamily: "InterSemiBold",
                            fontSize: 18,
                            color: theme.colors.text,
                        }}
                    >
                        {/* {t("etb")} {item.totalPrice} */}
                    </Text>
                    <Text
                        style={{
                            fontFamily: "InterRegular",
                            fontSize: 14,
                            color: theme.colors.text,
                            textAlign: "right",
                        }}
                    >
                        {item.goods?.length} {t("items")}
                    </Text>
                </View>
                <Entypo
                    name="chevron-right"
                    size={24}
                    color={theme.colors.text}
                />
            </View>
        </TouchableOpacity>
    )
});

export default SingleIncomingItems

const styles = StyleSheet.create({})