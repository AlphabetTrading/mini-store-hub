export type Item = {
    id:string;
    name:string;
    category:string;
    quanity:number;
    purchasedPrice:number;
    sellingPrice:number;
    unit:ItemUnit;
    serialNumber:string;
}

export enum ItemUnit {
    PIECE = "PIECE",
    KG = "KG",
}