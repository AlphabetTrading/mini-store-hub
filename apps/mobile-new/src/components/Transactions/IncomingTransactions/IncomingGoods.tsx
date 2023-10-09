import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '../../../contexts/preference'
import { useLocalization } from '../../../contexts/localization'

type Props = {
    goods: any
}

const IncomingGoods = ({ goods }: Props) => {
    const { theme } = useAppTheme()
    const { t, locale } = useLocalization()
    return (
        <View
            key={goods.id}
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
                    {locale.includes("am") ? goods.product.amharicName : goods.product.name}
                </Text>
                <Text
                    style={{
                        color: theme.colors.text,
                        fontFamily: "InterLight",
                    }}
                >
                    {t("quantity")}: {goods.quantity}
                </Text>
            </View>
        </View>
    )
}

export default IncomingGoods

const styles = StyleSheet.create({})