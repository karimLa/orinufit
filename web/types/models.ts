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