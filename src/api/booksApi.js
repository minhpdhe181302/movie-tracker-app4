const API_KEY = "YOUR_GOOGLE_BOOKS_KEY"; // 👉 lấy tại https://console.cloud.google.com/

export async function searchBooks(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&maxResults=20&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.items) return [];
  return data.items.map((b) => ({
    id: b.id,
    title: b.volumeInfo.title,
    authors: b.volumeInfo.authors || [],
    publishedDate: b.volumeInfo.publishedDate,
    thumbnail: b.volumeInfo.imageLinks?.thumbnail,
    description: b.volumeInfo.description,
    categories: b.volumeInfo.categories || [],
  }));
}
