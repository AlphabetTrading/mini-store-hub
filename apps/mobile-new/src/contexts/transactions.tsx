// // create new checkout context using secure storage for saving checkout items

// // Path: src\contexts\transactions.tsx

// import React, {
//     createContext,
//     useCallback,
//     useContext,
//     useEffect,
//     useMemo,
//     useState,
// } from "react";
// import AsyncStorageUtils from "../utils/async_storage";
import { CheckoutItem } from "../components/NewTransaction/TransactionItem";

type CheckoutItemRecord = Record<string, CheckoutItem>;

// const CheckoutContext = createContext<{
//     checkoutItems: CheckoutItem[];
//     setCheckoutItems: React.Dispatch<React.SetStateAction<CheckoutItem[]>>;
//     selectedCheckoutItemsId: Set<string>;
//     setSelectedCheckoutItemsId: React.Dispatch<React.SetStateAction<Set<string>>>;
//     selectItem: (stockItem: any) => void;
//     updateItem: (stockItem: any) => void;
//     removeItem: (stockItem: any) => void;
//     handleQuantityChange: (stockItem: any, increment: boolean) => void;
//     isSelected: (id: string) => boolean;
// }>({
//     checkoutItems: [],
//     setCheckoutItems: () => { },
//     selectItem: () => { },
//     updateItem: () => { },
//     removeItem: () => { },
//     handleQuantityChange: () => { },
//     selectedCheckoutItemsId: new Set(),
//     setSelectedCheckoutItemsId: () => { },
//     isSelected: () => false,
// });

// export const useCheckout = () => {
//     const checkout = useContext(CheckoutContext);

//     if (!checkout) {
//         throw new Error("useCheckout must be used within an CheckoutProvider");
//     }
//     return checkout;
// };

// const CheckoutContextProvider = ({ children }: any) => {
//     // fetch all products from network, and store in state
//     const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
//     const [selectedCheckoutItemsId, setSelectedCheckoutItemsId] = useState<Set<string>>(new Set())

//     // const fetchCheckoutItems = useCallback(async () => {
//     //     // await AsyncStorageUtils.removeItem("checkout");
//     //     // setCheckoutItems({});

//     //     const items = await AsyncStorageUtils.getItem("checkout");
//     //     if (items) {
//     //         setCheckoutItems(items);
//     //         setSelectedCheckoutItemsId(new Set(items.map((item: any) => item.productId)));
//     //     }
//     // }, []);

//     // useEffect(() => {
//     //     fetchCheckoutItems();
//     // }, [fetchCheckoutItems]);

//     // create is selected function
//     // const selectItem = useCallback(
//     //     (stockItem: CheckoutItem) => {
//     //         if (selectedCheckoutItemsId.has(stockItem.id)) {
//     //             console.log("delete")
//     //             selectedCheckoutItemsId.delete(stockItem.id);
//     //             setSelectedCheckoutItemsId(new Set(selectedCheckoutItemsId));
//     //             setCheckoutItems((prev) => prev.filter((item) => item.id !== stockItem.id));
//     //         } else {
//     //             console.log("add")
//     //             selectedCheckoutItemsId.add(stockItem.id);
//     //             setSelectedCheckoutItemsId(new Set(selectedCheckoutItemsId));
//     //             setCheckoutItems((prev) => [...prev, {
//     //                 ...stockItem,
//     //                 selectedQuantity: 1
//     //             }]);
//     //         }
//     //     },
//     //     [checkoutItems, selectedCheckoutItemsId]
//     // );

//     const isSelected = useCallback(
//         (id: string) => {
//             return selectedCheckoutItemsId.has(id);
//         },
//         [selectedCheckoutItemsId]
//     );


//     const updateItem = useCallback((stockItem: any) => {
//         setCheckoutItems((prev) => {
//             const newItems = prev.map((item) => {
//                 if (item.id === stockItem.id) {
//                     return stockItem;
//                 }
//                 return item;
//             });
//             console.log("newItems", newItems)
//             return newItems;
//         });
//     }, []);

//     const handleQuantityChange = useCallback((stockItem: any, increment: boolean) => {
//         if (!increment) {
//             const newItem = {
//                 ...stockItem,
//                 selectedQuantity: Math.max(1, stockItem.selectedQuantity - 1),
//             };
//             console.log("minus", stockItem.selectedQuantity, newItem.selectedQuantity)
//             updateItem(newItem);
//         } else {
//             const newItem = {
//                 ...stockItem,
//                 selectedQuantity: Math.min(
//                     stockItem.selectedQuantity + 1,
//                     stockItem.quantity
//                 ),
//             };
//             console.log("plus", stockItem.selectedQuantity, newItem.selectedQuantity)
//             updateItem(newItem);
//         }
//     }, []);

//     const removeItem = useCallback((stockItem: CheckoutItem) => {
//         setCheckoutItems((prev) => {
//             return prev.filter((item) => item.id !== stockItem.id);
//         });
//     }, []);

//     const updateCheckoutItems = useCallback(
//         async () => {
//             console.log("checkoutItems", checkoutItems)
//             await AsyncStorageUtils.setItem("checkout", checkoutItems);
//         },
//         [checkoutItems]
//     );

//     useEffect(() => {
//         updateCheckoutItems();
//     }, [checkoutItems]);


//     const sharedCheckoutState = React.useMemo(
//         () => ({
//             checkoutItems,
//             setCheckoutItems,
//             updateItem,
//             removeItem,
//             handleQuantityChange,
//             selectedCheckoutItemsId,
//             setSelectedCheckoutItemsId,
//             isSelected,
//         }),
//         [checkoutItems, ]
//     );

//     return (
//         <CheckoutContext.Provider value={sharedCheckoutState}>
//             {children}
//         </CheckoutContext.Provider>
//     );
// };

// export default CheckoutContextProvider;
