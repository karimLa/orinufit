import { ICart } from "@/types/models";

export default function calcTotalPrice(cart: ICart[]) {
	return cart.reduce((tally, item) => {
		if (!item.product) return tally

		return tally + item.quantity * item.product.price
	}, 0)
}
