// create new checkout context using secure storage for saving checkout items


// Path: src\contexts\transactions.tsx

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import AsyncStorageUtils from "../utils/async_storage";
import { CheckoutItem } from "../components/NewTransaction/TransactionItem";

const CheckoutContext = createContext<{
    checkoutItems: CheckoutItem[];
    setCheckoutItems: React.Dispatch<React.SetStateAction<CheckoutItem[]>>;
    selectItem: (stockItem: any) => void;
    updateItem: (stockItem: any) => void;
    selectedItemsId: Set<string>;
    setSelectedItemsId: React.Dispatch<React.SetStateAction<Set<string>>>;
}>({
    checkoutItems: [],
    setCheckoutItems: () => { },
    selectItem: () => { },
    updateItem: () => { },
    selectedItemsId: new Set(),
    setSelectedItemsId: () => { }
});

export const useCheckout = () => {
    const checkout = useContext(CheckoutContext);

    if (!checkout) {
        throw new Error("useCheckout must be used within an CheckoutProvider");
    }
    return checkout;
};

const CheckoutContextProvider = ({ children }: any) => {
    const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
    const [selectedItemsId, setSelectedItemsId] = useState<Set<string>>(new Set())

    const fetchCheckoutItems = useCallback(async () => {
        const items = await AsyncStorageUtils.getItem("checkout");
        if (items) setCheckoutItems(items);
    }, []);

    useEffect(() => {
        fetchCheckoutItems();
    }, [fetchCheckoutItems]);


    const selectItem = (stockItem: any) => {
        const isSelected = selectedItemsId.has(stockItem.productId)
        if (isSelected) {
            setCheckoutItems(
                checkoutItems.filter((filterItem) => filterItem.id !== stockItem.id)
            );
            setSelectedItemsId((prev) => {
                prev.delete(stockItem.productId)
                return prev
            })
        } else {
            setCheckoutItems([
                ...checkoutItems,
                { ...stockItem, selectedQuantity: 1 },
            ]);
            setSelectedItemsId((prev) => {
                prev.add(stockItem.productId)
                return prev
            }
            )
        }
    }

    const updateItem = (stockItem: any) => {
        setCheckoutItems((prev) =>
            prev.map((item) => {
                if (item.productId === stockItem.productId) {
                    return stockItem;
                }
                return item;
            })
        );
    };

    const sharedCheckoutState = React.useMemo(
        () => ({ checkoutItems, setCheckoutItems, selectItem, updateItem, selectedItemsId, setSelectedItemsId }),
        [checkoutItems, setCheckoutItems, selectItem, updateItem, selectedItemsId, setSelectedItemsId]
    );

    return (
        <CheckoutContext.Provider value={sharedCheckoutState}>
            {children}
        </CheckoutContext.Provider>
    );
};

export default CheckoutContextProvider;