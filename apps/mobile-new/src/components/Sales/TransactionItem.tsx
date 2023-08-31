import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '../../contexts/preference'
import { useLocalization } from '../../contexts/localization'

type Props = {
    saleTransactionItem: any
}

const TransactionItem = ({ saleTransactionItem }: Props) => {
    const { theme } = useAppTheme()
    const { t, locale } = useLocalization()
    return (
        <View
            key={saleTransactionItem.id}
            style={{
                flexDirection: "row",
                backgroundColor: theme.colors.cardBackground,
                width: "100%",
                padding: 20,
                paddingVertical: 15,
                alignItems: "center",
                gap: 16,
                marginVertical: 2,
                borderRadius: 6,
            }}
        >
            <View style={{ flex: 1, gap: 5 }}>
                <Text
                    style={{
                        color: theme.colors.text,

                        fontSize: 18,
                        fontFamily: "InterSemiBold",
                    }}
                >
                    {locale.includes("am") ? saleTransactionItem.product.amharicName : saleTransactionItem.product.name}
                </Text>
                <Text
                    style={{
                        color: theme.colors.text,

                        fontFamily: "InterLight",
                    }}
                >
                    {t("quantity")}: {saleTransactionItem.quantity}
                </Text>
            </View>
            <Text
                style={{
                    width: 80,
                    fontSize: 18,
                    fontFamily: "InterBold",
                    alignSelf: "flex-end",
                    // color: "#626262",
                    color: theme.colors.text,
                }}
            >
                {t("etb")} {saleTransactionItem.subTotal}
            </Text>
        </View>
    )
}

export default TransactionItem

const styles = StyleSheet.create({})