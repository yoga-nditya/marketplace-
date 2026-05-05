import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export type Banner = {
  id: string;
  title: string;
  image: string;
  is_active: boolean | number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

type BannerApiResponse = {
  Bannerdata: Banner[];
};

type SuccessResponse = {
  success: boolean;
  message: string;
};

export async function fetchAdminBanners(): Promise<Banner[]> {
  try {
    const response = await axios.get<BannerApiResponse>(`${baseUrl}/api/admin/banners`);
    return response.data.Bannerdata || [];
  } catch (error) {
    console.error("Error fetching admin banners:", error);
    return [];
  }
}

export async function fetchBannerById(id: string): Promise<Banner | null> {
  try {
    const response = await axios.get<BannerApiResponse>(`${baseUrl}/api/admin/banners?id=${id}`);
    return response.data.Bannerdata?.[0] || null;
  } catch (error) {
    console.error("Error fetching banner by id:", error);
    return null;
  }
}

export async function createBanner(data: FormData): Promise<SuccessResponse> {
  try {
    const response = await axios.post<SuccessResponse>(`${baseUrl}/api/admin/banners`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal menambahkan banner"
    };
  }
}

export async function updateBanner(id: string, data: FormData): Promise<SuccessResponse> {
  try {
    const response = await axios.put<SuccessResponse>(`${baseUrl}/api/admin/banners?id=${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal mengupdate banner"
    };
  }
}

export async function deleteBanner(id: string): Promise<SuccessResponse> {
  try {
    const response = await axios.delete<SuccessResponse>(`${baseUrl}/api/admin/banners?id=${id}`);
    return response.data;
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Gagal menghapus banner"
    };
  }
}
