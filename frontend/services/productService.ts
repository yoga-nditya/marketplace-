import axios from "axios";

export type Product = {
  id: string;
  categories_id: string;
  name: string;
  image: string;
  slug: string;
  price: number;
  stock_amount: number;
  description?: string;
  weight?: number;
};

type ProductApiResponse = {
  Productdata: Product[];
};

type SingleProductApiResponse = {
  Productdata: Product;
};

export async function fetchProducts(): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.get<ProductApiResponse>(`${baseUrl}/api/products`);
    return response.data.Productdata || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.get<SingleProductApiResponse>(`${baseUrl}/api/products?id=${id}`);
    return response.data.Productdata;
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return null;
  }
}
