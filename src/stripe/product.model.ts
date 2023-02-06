interface product {
  title: string;
  description: string;
  price: number;
  numberOfInteractions: number;
  stripeId: number;
}

export type Product = product 