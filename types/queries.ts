import { IOrder, IProduct, IUser } from "./models";

export type ProductsQueryResponse = {
	allProducts: IProduct[];
};

export type ProductQueryResponse = {
	Product: IProduct;
};

export type AuthResponse = {
	authenticatedItem: IUser | null;
};

export type OrdersQuery = {
	allOrders: IOrder[]
}

export type OrderQuery = {
	order: IOrder
}
