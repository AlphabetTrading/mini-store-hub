import { StyleSheet, Text, TouchableOpacity, View, Image, } from 'react-native'
import { Avatar, } from 'react-native-paper'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAppTheme } from '../../contexts/preference'
import { useLocalization } from '../../contexts/localization'

type Props = {
    item: any
}

const SingleCategoryItem = ({ item }: Props) => {
    const navigation = useNavigation()
    const { theme } = useAppTheme()
    const { locale } = useLocalization()
    console.log(item)

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 15,
            backgroundColor: theme.colors.background,
        },
        categoryItem: {
            // backgroundColor: "#7B7B7B1A",
            height: 80,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            // height: 75,
        },
        categoryImage: {
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "70%",
            maxHeight: "70%",
        },
        categoryText: {
            color: theme.colors.text,
            fontSize: 11,
            fontFamily: "InterLight",
            textAlign: "center",
        },
    });
    return (
        <TouchableOpacity
            style={{
                backgroundColor: theme.colors.cardBackground,
                maxWidth: "100%",
                height: "100%",
                flex: 1 / 3,
                alignItems: "center",
                marginHorizontal: 5,
                paddingVertical: 5,
                borderRadius: 10,
            }}
            onPress={() => {
                navigation.navigate("Root", {
                    screen: "InventoryRoot",
                    params: {
                        screen: "CategoryDetailScreen",
                        params: {
                            categoryID: item.id,
                            categoryName: locale.includes("en")
                                ? item.name
                                : item.amharicName,
                        },
                    },
                });
            }}
        >
            <View style={styles.categoryItem}>
                {
                    item.image ?
                        <Avatar.Image
                            source={{ uri: item.image }}
                        />
                        :
                        <Image
                            style={styles.categoryImage}
                            source={require("../../../assets/icons/categories/egg.png")}
                        />
                }
            </View>
            <Text style={styles.categoryText}>
                {locale.includes("en") ? item.name : item.amharicName}
            </Text>
        </TouchableOpacity>
    )
}

export default SingleCategoryItem

const styles = StyleSheet.create({})