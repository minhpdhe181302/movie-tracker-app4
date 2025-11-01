// Google Books API - không cần key cho basic usage
export async function searchBooks(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&maxResults=20`;
  
  console.log("Google Books Search URL:", url);
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    console.log("Google Books Response:", {
      totalItems: data.totalItems,
      items_count: data.items?.length || 0,
    });
    
    if (!data.items) {
      console.warn("No books found");
      return [];
    }
    
    return data.items.map((b) => ({
      id: b.id,
      title: b.volumeInfo.title,
      authors: b.volumeInfo.authors || [],
      publishedDate: b.volumeInfo.publishedDate,
      thumbnail: b.volumeInfo.imageLinks?.thumbnail,
      description: b.volumeInfo.description,
      categories: b.volumeInfo.categories || [],
      year: b.volumeInfo.publishedDate?.split('-')[0] || 'N/A',
      poster: b.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Cover',
    }));
  } catch (error) {
    console.error("Google Books API Error:", error);
    return [];
  }
}
