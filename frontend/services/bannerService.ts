// frontend/services/bannerService.ts

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

/**
 * Fetch banners from the API backend
 * Returns only active banners if needed, but here returns all as per issue #7
 */
export async function fetchBanners(): Promise<Banner[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!baseUrl) {
    console.warn("NEXT_PUBLIC_API_URL is not defined in environment variables.");
  }

  try {
    const response = await fetch(`${baseUrl}/api/banners`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 } // Next.js ISR/Cache option if applicable
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch banners: ${response.status} ${response.statusText}`);
    }

    const json: BannerApiResponse = await response.json();

    // The backend returns 'Bannerdata' key for the array
    if (!json.Bannerdata || json.total === 0) {
      return [];
    }

    return json.Bannerdata;
  } catch (error) {
    console.error("Error fetching banners:", error);
    return []; // Return empty array on failure to avoid UI crash
  }
}
