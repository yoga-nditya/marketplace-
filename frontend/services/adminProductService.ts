import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export type ProductAdmin = {
  id: string;
  categories_id: string;
  name: string;
  image: string;
  price: number;
  capital_price: number;
  description: string;
  weight: number;
  stock_amount: number;
  minimum_order: number;
  slug: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type ProductApiResponse = {
  success: boolean;
  message: string;
  Productdata: ProductAdmin[];
};

type SuccessResponse = {
  success: boolean;
  message: string;
};

export async function fetchAdminProducts(): Promise<ProductAdmin[]> {
  try {
    const response = await axios.get<ProductApiResponse>(`${baseUrl}/api/admin/products`);
    return response.data.Productdata || [];
  } catch (error) {
    console.error("Error fetching admin products:", error);
    return [];
  }
}

export async function fetchAdminProductById(id: string): Promise<ProductAdmin | null> {
  try {
    const response = await axios.get<ProductApiResponse>(`${baseUrl}/api/admin/products?id=${id}`);
    return response.data.Productdata?.[0] || null;
  } catch (error) {
    console.error("Error fetching admin product by id:", error);
    return null;
  }
}

export async function createProduct(data: FormData): Promise<SuccessResponse> {
  try {
    const response = await axios.post<SuccessResponse>(`${baseUrl}/api/admin/products`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal menambahkan produk"
    };
  }
}

export async function updateProduct(id: string, data: FormData): Promise<SuccessResponse> {
  try {
    const response = await axios.put<SuccessResponse>(`${baseUrl}/api/admin/products?id=${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengupdate produk"
    };
  }
}

export async function deleteProduct(id: string): Promise<SuccessResponse> {
  try {
    const response = await axios.delete<SuccessResponse>(`${baseUrl}/api/admin/products?id=${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal menghapus produk"
    };
  }
}
