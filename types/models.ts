export type IProductImage = {
  id: string
  image: string
  altText: string
}

export type IProduct = {
  id: string
  name?: string;
  description?: string;
  photo?: {
    id: string
    altText?: string;
    image: {
      publicUrlTransformed: string
    }
  };
  status?: 'DRAFT' | 'AVAILABLE' | 'UNAVAILABLE';
  price: number;
}

export type ICart = {
  id: string
  quantity: number
  product: IProduct
}

export type IUser = {
  id: string
  email: string
  name: string
  cart: ICart[]
}

export type IOrderItem = IProduct & {
  quantity: number
}

export type IOrder = {
  id: string
  total: number
  charge: string
  user: IUser
  items: IOrderItem[]
}
