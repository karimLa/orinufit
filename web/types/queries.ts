import { IProduct } from "./models";

export type ProductsQueryResponse = {
	allProducts: IProduct[];
};

export type ProductQueryResponse = {
	Product: IProduct;
};