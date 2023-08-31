import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '../contexts/preference'

const CustomDivider = React.memo(() => {
    const { theme } = useAppTheme()
    return (
        <View>
            <View
                style={{
                    height: 5,
                    backgroundColor: theme.colors.background,
                }}
            />
        </View>
    )
})

export default CustomDivider

const styles = StyleSheet.create({})