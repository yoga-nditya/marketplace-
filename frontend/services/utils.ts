export const getImageUrl = (imagePath: string, type: 'category' | 'product' | 'banner' = 'category') => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  let cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  
  if (!cleanPath.includes("/assets/")) {
    let subDir = "category";
    if (type === "product") subDir = "product";
    if (type === "banner") subDir = "img/banner";
    
    cleanPath = `/assets/${subDir}${cleanPath}`;
  }

  return `${baseUrl}${cleanPath}`;
};
