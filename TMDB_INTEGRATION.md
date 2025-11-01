# 🎬 Tích Hợp TMDB API

## ✅ Đã Hoàn Thành

Ứng dụng đã được nâng cấp để sử dụng **The Movie Database (TMDB) API** thay vì OMDB API.

## 🔑 API Key

```
API Key: ffbc8d537064e9b3303bdab3d735f05e
Base URL: https://api.themoviedb.org/3
```

## 📝 Các Thay Đổi

### 1. **File API Mới: `tmdbApi.js`**

Tạo file mới `src/api/tmdbApi.js` với các function:

- ✅ `searchMovies(query)` - Tìm kiếm phim theo từ khóa
- ✅ `getPopularMovies(page)` - Lấy danh sách phim phổ biến
- ✅ `getNowPlayingMovies(page)` - Lấy danh sách phim đang chiếu
- ✅ `getMovieDetails(movieId)` - Lấy chi tiết một phim

### 2. **Dữ Liệu TMDB**

Mỗi phim trả về bao gồm:

```javascript
{
  id: "507244",
  title: "Người Hùng Thời Tận Thế",
  originalTitle: "Afterburn",
  year: "2025",
  poster: "https://image.tmdb.org/t/p/w500/6bZG08UKAQLe6btFs85wEcUARHA.jpg",
  backdrop: "https://image.tmdb.org/t/p/w500/kHOfxq7cMTXyLbj0UmdoGhT540O.jpg",
  overview: "Mô tả phim bằng tiếng Việt...",
  voteAverage: 6.6,
  voteCount: 73,
  popularity: 398.6,
  releaseDate: "2025-08-20"
}
```

### 3. **SearchScreen - Nâng Cấp**

#### Tính Năng Mới:

**a) Hiển thị Phim Phổ Biến và Đang Chiếu**

- Khi mở tab Search mà chưa tìm kiếm, hiển thị:
  - 🔥 **Phim Phổ Biến** (Popular Movies)
  - ⭐ **Phim Đang Chiếu** (Now Playing)
- Scroll ngang để xem danh sách

**b) Hiển thị Rating TMDB**

- Mỗi phim hiển thị rating: ⭐ 6.6/10
- Badge màu vàng cho dễ nhận biết

**c) Giao Diện Tiếng Việt**

- Placeholder: "Tìm kiếm phim..."
- Loading text: "Đang tìm kiếm..."
- Empty state: "Không tìm thấy kết quả"

**d) Hai Loại Card:**

1. **Horizontal Card** (cho danh sách cuộn ngang):

   - Width: 140px
   - Poster height: 210px
   - Rating badge

2. **Vertical Card** (cho kết quả tìm kiếm):
   - Full width
   - Poster + thông tin chi tiết
   - Rating inline

### 4. **DetailScreen - Cải Tiến**

**Hiển thị Thêm:**

- ⭐ TMDB Rating: `6.6/10 (73 votes)`
- Overview tiếng Việt
- Backdrop image (ảnh nền lớn)

**Text Tiếng Việt:**

- "Mô tả" thay vì "Description"
- "Đánh giá của bạn" thay vì "Your Rating"
- "Nhận xét của bạn" thay vì "Your Thoughts"
- "Lưu vào Danh sách" thay vì "Save to My List"

**Data Lưu Thêm:**

- `voteAverage`: Rating từ TMDB
- `voteCount`: Số lượt vote
- `originalTitle`: Tên gốc của phim
- `overview`: Mô tả bằng tiếng Việt

### 5. **Giao Diện Cải Tiến**

#### Màu Sắc Rating:

```javascript
ratingBadge: {
  backgroundColor: COLORS.warning, // Vàng cam
}
```

#### Styles Mới:

- `section` - Cho các section Popular/Now Playing
- `horizontalCard` - Card cuộn ngang
- `horizontalPoster` - Poster kích thước lớn
- `ratingBadge` - Badge hiển thị rating
- `tmdbRating` - Rating TMDB trên detail screen

## 🎨 Screenshots Tính Năng

### Search Screen - Popular Movies

```
🔥 Phim Phổ Biến
[Scroll ngang với 10 phim]

⭐ Đang Chiếu
[Scroll ngang với 10 phim]
```

### Search Results

```
[Poster] Người Hùng Thời Tận Thế
         2025
         ⭐ 6.6/10
```

### Detail Screen

```
[Large Poster/Backdrop]

Người Hùng Thời Tận Thế
2025
⭐ 6.6/10 (73 votes)

📖 Mô tả
Sau một trận bão mặt trời tàn phá...

⭐ Đánh giá của bạn
[5 stars selector]

💬 Nhận xét của bạn
[Text input]

[💾 Lưu vào Danh sách]
```

## 🌐 API Endpoints Sử dụng

1. **Search**

   ```
   GET /search/movie?api_key={key}&language=vi-VN&query={query}
   ```

2. **Popular**

   ```
   GET /movie/popular?api_key={key}&language=vi-VN&page={page}
   ```

3. **Now Playing**

   ```
   GET /movie/now_playing?api_key={key}&language=vi-VN&page={page}
   ```

4. **Details**
   ```
   GET /movie/{movieId}?api_key={key}&language=vi-VN
   ```

## 🚀 Cách Chạy

```bash
npm start
```

Mở ứng dụng trên Expo Go và:

1. Vào tab **Search**
2. Xem phim phổ biến và đang chiếu
3. Tìm kiếm phim bằng tiếng Việt hoặc tiếng Anh
4. Nhấn vào phim để xem chi tiết
5. Đánh giá và lưu vào danh sách

## 🎯 Lợi Ích

✅ **Nhiều dữ liệu hơn**: Rating, vote count, popularity  
✅ **Tiếng Việt**: Tất cả mô tả đều bằng tiếng Việt  
✅ **Khám phá phim**: Popular và Now Playing  
✅ **Ảnh chất lượng cao**: TMDB có ảnh đẹp hơn  
✅ **API miễn phí**: Không giới hạn requests

## 📌 Lưu Ý

- File `omdbApi.js` cũ vẫn còn, có thể xóa nếu muốn
- Books API vẫn giữ nguyên (sử dụng Google Books API)
- Tất cả dữ liệu cũ vẫn tương thích

---

**Enjoy exploring movies! 🎬🍿**
