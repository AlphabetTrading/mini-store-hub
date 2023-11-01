import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../contexts/preference';
import { format } from 'date-fns';
import { IconButton } from 'react-native-paper';
import { customFormatDistanceFromNow } from '../../utils/datefns';

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
                padding: 10,
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
                    width: "100%",
                }}
            >
                <View>
                    <IconButton
                        icon={item.isRead ? "bell-outline" : "bell-ring-outline"}
                        iconColor={item.isRead ? theme.colors.textSecondary : theme.colors.accent}
                        // color={item.isRead ? theme.colors.text : theme.colors.primary}
                        size={24}
                    />
                </View>
                <View style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    flexGrow: 1,
                }}>

                    <View style={{ gap: 10, maxWidth: 300 }}>
                        <Text style={{ fontFamily: item.isRead ? "InterBold" : "InterMedium", fontSize: item.isRead ? 14 : 16, color: theme.colors.text }}>
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
                    <Text
                        style={{
                            fontFamily: "InterLight",
                            fontSize: 12,
                            color: theme.colors.text,
                        }}
                    >
                        {customFormatDistanceFromNow(new Date(item.createdAt))}
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

        </TouchableOpacity>
    );
}

export default SingleNotificationItem

const styles = StyleSheet.create({})