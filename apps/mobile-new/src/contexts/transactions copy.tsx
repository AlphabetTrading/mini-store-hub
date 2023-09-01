// create new checkout context using secure storage for saving checkout items

// Path: src\contexts\transactions.tsx

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import AsyncStorageUtils from "../utils/async_storage";
import { CheckoutItem } from "../components/NewTransaction/TransactionItem";

type CheckoutItemRecord = Record<string, CheckoutItem>;

const CheckoutContext = createContext<{
    checkoutItems: CheckoutItemRecord;
    setCheckoutItems: React.Dispatch<React.SetStateAction<CheckoutItemRecord>>;
    selectItem: (stockItem: any) => void;
    updateItem: (stockItem: any) => void;
    removeItem: (stockItem: any) => void;
    isItemSelected: (stockItem: any) => boolean;
    handleQuantityChange: (stockItem: any, increment: boolean) => void;
}>({
    checkoutItems: {},
    setCheckoutItems: () => { },
    selectItem: () => { },
    updateItem: () => { },
    removeItem: () => { },
    isItemSelected: () => false,
    handleQuantityChange: () => { },
});

export const useCheckout = () => {
    const checkout = useContext(CheckoutContext);

    if (!checkout) {
        throw new Error("useCheckout must be used within an CheckoutProvider");
    }
    return checkout;
};

const CheckoutContextProvider = ({ children }: any) => {
    // fetch all products from network, and store in state
    const [checkoutItems, setCheckoutItems] = useState<CheckoutItemRecord>({});

    const fetchCheckoutItems = useCallback(async () => {
        // await AsyncStorageUtils.removeItem("checkout");
        // setCheckoutItems({});

        const items = await AsyncStorageUtils.getItem("checkout");
        if (items)
            setCheckoutItems(Object.values(items) as unknown as CheckoutItemRecord);
    }, []);

    useEffect(() => {
        fetchCheckoutItems();
    }, [fetchCheckoutItems]);

    // create is selected function
    const isItemSelected = (stockItem: any) => {
        return stockItem.productId in checkoutItems;
    };

    const selectItem = useCallback(
        (stockItem: any) => {
            if (stockItem.productId in checkoutItems) {
                removeItem(stockItem);
            } else {
                addItem(stockItem);
            }
        },
        []
    );

    const addItem = useCallback((stockItem: any) => {
        checkoutItems[stockItem.productId] = {
            ...stockItem,
            selectedQuantity: 1,
        };
        setCheckoutItems({ ...checkoutItems });
    }, []);

    const updateItem = useCallback((stockItem: any) => {
        setCheckoutItems((prev) => {
            return {
                ...prev,
                [stockItem.productId]: stockItem,
            };
        });
    }, []);

    const handleQuantityChange = useCallback((stockItem: any, increment: boolean) => {
        if (!increment) {
            const newItem = {
                ...stockItem,
                selectedQuantity: Math.max(1, stockItem.selectedQuantity - 1),
            };
            updateItem(newItem);
        } else {
            const newItem = {
                ...stockItem,
                selectedQuantity: Math.min(
                    stockItem.selectedQuantity + 1,
                    stockItem.quantity
                ),
            };
            updateItem(newItem);
        }
    }, []);

    const removeItem = useCallback((stockItem: any) => {
        if (stockItem.productId in checkoutItems) {
            const newCheckoutItems = { ...checkoutItems };
            delete newCheckoutItems[stockItem.productId];
            setCheckoutItems(newCheckoutItems);
        } else {
        }
    }, []);

    // update checkout items in async storage
    useMemo(async () => {
        await AsyncStorageUtils.setItem("checkout", checkoutItems);
    }, [checkoutItems]);

    // useEffect(() => {
    //     updateCheckoutItems();
    // }, [updateCheckoutItems]);

    const sharedCheckoutState = React.useMemo(
        () => ({
            checkoutItems,
            setCheckoutItems,
            selectItem,
            updateItem,
            isItemSelected,
            removeItem,
            handleQuantityChange,
        }),
        [checkoutItems]
    );

    return (
        <CheckoutContext.Provider value={sharedCheckoutState}>
            {children}
        </CheckoutContext.Provider>
    );
};

export default CheckoutContextProvider;
