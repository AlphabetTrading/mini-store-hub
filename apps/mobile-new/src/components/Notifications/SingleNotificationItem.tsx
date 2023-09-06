import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../contexts/preference';
import { format } from 'date-fns';

type Props = {
    item: any
}

const SingleNotificationItem = ({ item }: Props) => {
    const navigation = useNavigation()
    const { theme } = useAppTheme()

    return (
        <TouchableOpacity
            key={item.id}
            style={{
                width: "100%",
                backgroundColor: item.isRead ? theme.colors.background : theme.colors.cardBackground,
                padding: 20,
                flexDirection: "column",
                rowGap: 10,
            }}
            onPress={() => {
                navigation.navigate("Notifications", {
                    screen: "NotificationDetailScreen",
                    params: {
                        notificationID: item.id,
                    },
                });
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <View style={{ gap: 10 }}>
                    <Text style={{ fontFamily: "InterMedium", fontSize: item.isRead ? 14 : 16, color: theme.colors.text }}>
                        {item.title}
                    </Text>
                    <Text
                        style={{
                            fontFamily: "InterLight",
                            fontSize: 12,
                            paddingRight: 10,
                            color: theme.colors.text
                        }}
                    >
                        {item.body}
                    </Text>
                </View>

                <View
                    style={{
                        width: 6,
                        height: 6,
                        backgroundColor:
                            item.recipientType === "USER"
                                ? "#00FF00"
                                : item.recipientType === "RETAIL_SHOP"
                                    ? "#00FFFF"
                                    : "#FF0000",
                        borderRadius: 3,
                    }}
                ></View>
            </View>
            <Text
                style={{
                    fontFamily: "InterLight",
                    fontSize: 12,
                    color: theme.colors.text,
                }}
            >
                {format(new Date(item.createdAt), "MM:HH - MMM dd yyyy")}
            </Text>
        </TouchableOpacity>
    );
}

export default SingleNotificationItem

const styles = StyleSheet.create({})