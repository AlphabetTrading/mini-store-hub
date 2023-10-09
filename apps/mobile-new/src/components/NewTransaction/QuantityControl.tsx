import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { notifyMessage } from '../Toast';
import InputSpinner from 'react-native-input-spinner';

type Props = {}

const QuantityControl = React.memo(({ productItem, onChange }: any) => {
    console.log(productItem, " product item")
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
            }}
        >
            <Text>
                <InputSpinner
                    type={"real"}
                    max={productItem.quantity}
                    fontSize={20}
                    min={productItem.product.unit.toLowerCase() === "kg" ? 0.5 : 1}
                    step={productItem.product.unit.toLowerCase() === "kg" ? 0.5 : 1}
                    precision={1}
                    skin="clean"
                    shadow={false}
                    colorMax={"#f04048"}
                    colorMin={"#40c5f4"}
                    value={productItem.selectedQuantity}
                    onChange={onChange}
                    height={40}
                    inputStyle={{
                        minWidth: 40,
                    }}
                    buttonFontSize={24}
                    buttonFontFamily="InterMedium"
                    onMax={() => {
                        notifyMessage("Sorry the maximum quantity is reached!");
                    }}
                    onMin={() => {
                        notifyMessage("Sorry the minimum quantity is reached!");
                    }}
                />
            </Text>
        </View>

    );
}
);

export default QuantityControl

const styles = StyleSheet.create({})