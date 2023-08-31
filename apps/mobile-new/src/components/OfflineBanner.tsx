import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { Snackbar } from 'react-native-paper'
import { useNetInfo } from '@react-native-community/netinfo'

const OfflineBanner = () => {
    const { isConnected } = useNetInfo()
    const [isVisible, setIsVisible] = useState(!isConnected)
    return (
        <Snackbar
            visible={!isVisible}
            onDismiss={() => setIsVisible(false)}
            action={{
                label: 'Okay',
                onPress: () => {
                    setIsVisible(false)
                    // Do something
                },
            }}
            style={{ backgroundColor: "blue" }}
        >
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "center",
                    padding: 8,
                    alignItems: "center",
                    backgroundColor: "#c95e6b",
                }}
            >
                <Feather name="alert-circle" size={18} color="#fff" />

                <Text
                    style={{
                        color: "#fff",
                        marginLeft: 8,
                        fontSize: 14,
                        lineHeight: 22,
                        fontWeight: "500",
                    }}>
                    Your device is offline
                </Text>
            </View>
        </Snackbar>
    )
}

export default OfflineBanner

const styles = StyleSheet.create({})