import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export type Category = {
  id: string;
  name: string;
  image: string;
  slug: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type CategoryApiResponse = {
  Categorydata: Category[];
};

type SingleCategoryApiResponse = {
  Categorydata: Category;
};

type SuccessResponse = {
  success: boolean;
  message: string;
};

export async function fetchAdminCategories(): Promise<Category[]> {
  try {
    const response = await axios.get<CategoryApiResponse>(`${baseUrl}/api/admin/categories`);
    return response.data.Categorydata || [];
  } catch (error) {
    console.error("Error fetching admin categories:", error);
    return [];
  }
}

export async function fetchCategoryById(id: string): Promise<Category | null> {
  try {
    const response = await axios.get<SingleCategoryApiResponse>(`${baseUrl}/api/admin/categories/${id}`);
    return response.data.Categorydata;
  } catch (error) {
    console.error("Error fetching category by id:", error);
    return null;
  }
}

export async function createCategory(data: FormData): Promise<SuccessResponse> {
  try {
    const response = await axios.post<SuccessResponse>(`${baseUrl}/api/admin/categories`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal menambahkan kategori"
    };
  }
}

export async function updateCategory(id: string, data: FormData): Promise<SuccessResponse> {
  try {
    const response = await axios.put<SuccessResponse>(`${baseUrl}/api/admin/categories/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengupdate kategori"
    };
  }
}

export async function deleteCategory(id: string): Promise<SuccessResponse> {
  try {
    const response = await axios.delete<SuccessResponse>(`${baseUrl}/api/admin/categories/${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal menghapus kategori"
    };
  }
}
