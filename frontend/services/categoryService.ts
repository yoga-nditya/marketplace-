import axios from "axios";

export type Category = {
  id: string;
  name: string;
  image: string;
  slug: string;
};

type CategoryApiResponse = {
  Categorydata: Category[];
};

export async function fetchCategories(): Promise<Category[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.get<CategoryApiResponse>(`${baseUrl}/api/categories`);
    return response.data.Categorydata || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
