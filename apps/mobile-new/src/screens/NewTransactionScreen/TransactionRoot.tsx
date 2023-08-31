import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CheckoutContextProvider from '../../contexts/transactions'
import { NewTransactionStack } from '../../navigations/NewTransactionStack'

const TransactionRoot = () => {
    return (
        <CheckoutContextProvider>
            <NewTransactionStack />
        </CheckoutContextProvider>
    )
}

export default TransactionRoot

const styles = StyleSheet.create({})