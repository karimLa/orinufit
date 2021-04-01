import { IProduct, IUser } from "./models";

export type ProductsQueryResponse = {
	allProducts: IProduct[];
};

export type ProductQueryResponse = {
	Product: IProduct;
};

export type AuthResponse = {
	authenticatedItem: IUser | null;
};
