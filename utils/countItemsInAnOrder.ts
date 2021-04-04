import { IOrder } from "@/types/models";

export default function countItemsInAnOrder(order: IOrder) {
	return order.items.reduce((tally, item) => tally + item.quantity, 0);
}