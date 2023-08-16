export type Address = {
  city?: string;
  createdAt: string;
  formattedAddress?: string;
  id: string;
  lat?: number;
  lng?: number;
  retailShop?: RetailShop;
  street: string;
  updatedAt: string;
  userProfile?: UserProfile;
  warehouse?: Warehouse;
};

export type AnnualTransaction = {
  createdAt: string;
  id: string;
  retailShop: RetailShop;
  retailShopId: string;
  totalSales: number;
  updatedAt: string;
  year?: string;
};

export type Auth = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type Category = {
  amharicDescription?: string;
  amharicName?: string;
  createdAt: string;
  description?: string;
  id: string;
  name: string;
  parent?: Category;
  parentId?: string;
  products?: [Product];
  subcategories?: [Category];
  updatedAt: string;
};

export type DailyTransaction = {
  createdAt: string;
  date?: string;
  id: string;
  retailShop: RetailShop;
  retailShopId: string;
  totalSales: number;
  updatedAt: string;
};

export type ForgotPasswordResponse = {
  accessToken: string;
  message: string;
  success: boolean;
};

export type Goods = {
  createdAt: string;
  goodsTransferId: GoodsTransfer;
  id: string;
  product?: Product;
  productId: string;
  quantity?: number;
  updatedAt: string;
};

export type GoodsTransfer = {
  createdAt: string;
  destinationWarehouse?: Warehouse;
  destinationWarehouseId?: string;
  goodsTransfersAsDestination?: [StockItem];
  id: string;
  retailShop?: RetailShop;
  retailShopId?: string;
  sourceWarehouse?: Warehouse;
  sourceWarehouseId?: string;
  transferType: TransferType;
  updatedAt: string;
};

export type MonthlyTransaction = {
  createdAt: string;
  id: string;
  month?: string;
  retailShop: RetailShop;
  retailShopId: string;
  totalSales: number;
  updatedAt: string;
};

export type Notification = {
  amharicBody?: string;
  amharicTitle?: string;
  body: string;
  createdAt: string;
  id: string;
  isRead: boolean;
  notificationReads?: [ReadNotification];
  recipientId?: string;
  recipientType: RecipientType;
  title: string;
  updatedAt: string;
  user?: User;
};

export type NotificationToken = {
  createdAt: string;
  device_type?: string;
  id: string;
  token: string;
  updatedAt: string;
  user?: User;
};

export enum OrderDirection {
  asc,
  desc,
}

export type PaginationCategories = {
  items: [Category];
  meta?: PaginationInfo;
};

export type PaginationGoodsTransfer = {
  items: [GoodsTransfer];
  meta?: PaginationInfo;
};

export type PaginationInfo = {
  count?: number;
  limit?: number;
  page?: number;
};

export type PaginationPriceHistories = {
  items: [PriceHistory];
  meta?: PaginationInfo;
};

export type PaginationProducts = {
  items: [Product];
  meta?: PaginationInfo;
};

export type PaginationRetailShopStocks = {
  items: [RetailShopStock];
  meta?: PaginationInfo;
};

export type PaginationRetailShops = {
  items: [RetailShop];
  meta?: PaginationInfo;
};

export type PaginationSaleTransactions = {
  items: [SaleTransaction];
  meta?: PaginationInfo;
};

export type PaginationUser = {
  items: [User];
  meta?: PaginationInfo;
};

export type PaginationWarehouseStocks = {
  items: [WarehouseStock];
  meta?: PaginationInfo;
};

export type PaginationWarehouses = {
  items: [Warehouse];
  meta?: PaginationInfo;
};

export type PriceHistory = {
  activeProduct?: Product;
  createdAt: string;
  id: string;
  price: number;
  product?: Product;
  productId: string;
  purchasedPrice: number;
  saleTransactionItems?: [SaleTransactionItem];
  updatedAt: string;
};

export type Product = {
  activePrice?: PriceHistory;
  activePriceId?: string;
  amharicDescription?: string;
  amharicName?: string;
  category?: Category;
  categoryId: string;
  createdAt: string;
  description: string;
  goods?: [Goods];
  id: string;
  images?: [string];
  name: string;
  priceHistory?: [PriceHistory];
  retailShopStock?: [RetailShopStock];
  saleTransactionItem?: [SaleTransactionItem];
  serialNumber: string;
  unit: UnitType;
  updatedAt: string;
  warehouseStock?: [WarehouseStock];
};

export type ReadNotification = {
  createdAt: string;
  id: string;
  notification?: Notification;
  notificationId?: string;
  updatedAt: string;
  user?: User;
  userId?: string;
};

export enum RecipientType {
  ALL,
  RETAIL_SHOP,
  USER,
  WAREHOUSE,
}

export type ResetPasswordResponse = {
  accessToken: string;
  message: string;
  success: boolean;
};

export type RetailShop = {
  address?: Address;
  addressId?: string;
  amharicName?: string;
  annualTransaction?: [AnnualTransaction];
  createdAt: string;
  dailyTransaction?: [DailyTransaction];
  goodsTransfersAsDestination?: [GoodsTransfer];
  id: string;
  monthlyTransaction?: [MonthlyTransaction];
  name: string;
  retailShopManager?: User;
  retailShopManagerId?: string;
  retailShopStock?: [RetailShopStock];
  saleTransaction?: [SaleTransaction];
  updatedAt: string;
};

export type RetailShopStock = {
  createdAt: string;
  goodsTransfers?: [GoodsTransfer];
  id: string;
  maxQuantity: number;
  product?: Product;
  productId: string;
  quantity: number;
  retailShop?: RetailShop;
  retailShopId: string;
  updatedAt: string;
};

export type SaleTransaction = {
  createdAt: string;
  id: string;
  retailShop?: RetailShop;
  retailShopId: string;
  saleTransactionItems?: [SaleTransactionItem];
  totalPrice: number;
  updatedAt: string;
};

export type SaleTransactionItem = {
  createdAt: string;
  id: string;
  product?: Product;
  productId: string;
  quantity: number;
  saleTransaction?: SaleTransaction;
  soldPrice: PriceHistory;
  soldPriceHistoryId: string;
  subTotal: number;
  updatedAt: string;
};

export type StockItem = {
  createdAt: string;
  goodsTransfer?: GoodsTransfer;
  goodsTransferId: string;
  id: string;
  product?: Product;
  productId: string;
  quantity: number;
  updatedAt: string;
};

export type Token = {
  accessToken: string;
  refreshToken: string;
};

enum TransferType {
  WarehouseToRetailShop,
  WarehouseToWarehouse,
}

enum UnitType {
  BAG,
  BOTTLE,
  BOX,
  KG,
  LITER,
  METER,
  METER_SQUARE,
  OTHER,
  PIECES,
}

export type User = {
  amharicFirstName?: string;
  amharicLastName?: string;

  createdAt: string;
  firstName?: string;
  id: string;
  lastName?: string;
  notificationTokens?: [NotificationToken];
  notifications?: [Notification];
  phone: string;
  retailShop?: [RetailShop];
  role: UserRole;
  updatedAt: string;
  userProfile?: UserProfile;
  username: string;
  warehouse?: [Warehouse];
};

export type UserProfile = {
  address?: Address;
  addressId: string;
  createdAt: string;
  id: string;
  idUrl: string;
  photoUrl: string;
  updatedAt: string;
};

enum UserRole {
  ADMIN,
  RETAIL_SHOP_MANAGER,
  USER,
  WAREHOUSE_MANAGER,
}

export type Warehouse = {
  address?: Address;
  addressId: string;
  amharicName?: string;
  createdAt: string;
  goodsTransferAsDestination?: [GoodsTransfer];
  goodsTransferAsSource?: [GoodsTransfer];
  id: string;
  name: string;
  retailShopStock?: [RetailShopStock];
  updatedAt: string;
  warehouseManager?: User;
  warehouseManagerId?: string;
  warehouseStock?: [WarehouseStock];
};

export type WarehouseStock = {
  createdAt: string;
  goodsTransfers?: [GoodsTransfer];
  id: string;
  product?: Product;
  productId: string;
  quantity: number;
  updatedAt: string;
  warehouse?: Warehouse;
  warehouseId: string;
};
