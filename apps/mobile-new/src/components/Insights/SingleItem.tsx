import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '../../contexts/preference'
import { useLocalization } from '../../contexts/localization';

type Props = {
    index: number;
    item: any
}

const SingleItem = ({ item, index }: Props) => {
    const { theme } = useAppTheme()
    const { locale } = useLocalization()
    return (
        <View
            style={{
                backgroundColor: theme.colors.cardBackground,
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 20,
                marginVertical: 2,
                borderRadius: 6,
            }}
        >
            <View>
                <Text
                    style={{
                        fontFamily: "InterMedium",
                        fontSize: 16,
                        color: theme.colors.text,
                    }}
                >
                    {index + 1}.
                    {locale.includes("en") ? item.name : item.amharicName}
                </Text>
                <Text
                    style={{
                        fontFamily: "InterMedium",
                        fontSize: 14,
                        color: theme.colors.text,
                    }}
                >
                    in-{item.unit}
                </Text>
            </View>
            <View
                style={{
                    alignItems: "flex-end",
                }}
            >

                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: "InterMedium",
                        color: theme.colors.text,
                    }}
                >
                    Serial-Number: {item.serialNumber}
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: "InterMedium",
                        color: theme.colors.text,
                    }}
                >
                    {item.value}
                </Text>
            </View>
        </View>
    )
}

export default SingleItem

const styles = StyleSheet.create({})