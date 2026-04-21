import axios from "axios";

export type Banner = {
  id: string;
  title: string;
  image: string;
  is_active: boolean;
};

type BannerApiResponse = {
  status: string;
  total: number;
  Bannerdata: Banner[];
};

export async function fetchBanners(): Promise<Banner[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.warn("NEXT_PUBLIC_API_URL is not defined in environment variables.");
  }

  try {
    const response = await axios.get<BannerApiResponse>(`${baseUrl}/api/banners`);
    const json = response.data;
    if (!json.Bannerdata || json.total === 0) {
      return [];
    }

    return json.Bannerdata;
  } catch (error) {
    console.error("Error fetching banners with axios:", error);
    return [];
  }
}
