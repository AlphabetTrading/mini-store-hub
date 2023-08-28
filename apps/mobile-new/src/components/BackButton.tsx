import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const BackButton = () => {
    const navigation = useNavigation();
    return (
        <View style={{ marginRight: 25 }}>
            <Ionicons
                onPress={() => navigation.goBack()}
                name="arrow-back"
                size={24}
                color="white"
            />
        </View>
    );
}

export default BackButton

const styles = StyleSheet.create({})