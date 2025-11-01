# 🔍 Hướng Dẫn Sử Dụng Tìm Kiếm

## ✅ Chức Năng Tìm Kiếm Đã Hoạt Động

### 🎬 Tìm Kiếm Phim

1. **Mở tab Search** 🔍
2. **Chọn mode "🎬 Movies"** (mặc định)
3. **Nhập tên phim** vào ô tìm kiếm
   - VD: "Avatar", "Spider-Man", "The Matrix"
   - Hỗ trợ cả tiếng Anh và tiếng Việt
4. **Nhấn Enter hoặc click nút 🔍**
5. **Xem kết quả:**
   - Hiển thị tối đa 20 phim/trang
   - Mỗi card hiển thị: Poster, Title, Năm, Rating
   - Click vào card để xem chi tiết

### 📚 Tìm Kiếm Sách

1. **Click "📚 Books"** để chuyển mode
2. **Nhập tên sách hoặc tác giả**
   - VD: "Harry Potter", "Nguyễn Nhật Ánh"
3. **Nhấn tìm kiếm**
4. **Xem kết quả:**
   - Hiển thị: Poster, Title, Tác giả, Năm xuất bản

---

## 🎯 Phân Trang (Chỉ Movies)

Khi tìm kiếm phim có nhiều kết quả:

```
┌─────────────────────────────┐
│  [← Trước] Trang 2/42 [Sau →] │
└─────────────────────────────┘
```

- **← Trước**: Về trang trước (disable ở trang 1)
- **Sau →**: Sang trang sau (disable ở trang cuối)
- **Trang X/Y**: Hiển thị vị trí hiện tại

---

## 🔥 Khám Phá (Discover Mode)

Khi **chưa tìm kiếm**, hiển thị:

### 1. **Phim Phổ Biến** 🔥
- 10 phim được xem nhiều nhất
- Scroll ngang để xem
- Click để xem chi tiết

### 2. **Đang Chiếu** ⭐
- 10 phim đang chiếu rạp
- Scroll ngang để xem
- Click để xem chi tiết

---

## 🧪 Test Tìm Kiếm

### Test Movies:

**Các từ khóa test tốt:**
- ✅ "Avatar" → 85+ kết quả
- ✅ "Spider-Man" → 100+ kết quả
- ✅ "Avengers" → 50+ kết quả
- ✅ "Harry Potter" → 40+ kết quả
- ✅ "Người Nhện" (tiếng Việt)

### Test Books:

**Các từ khóa test tốt:**
- ✅ "Harry Potter"
- ✅ "Dế Mèn Phiêu Lưu Ký"
- ✅ "Nguyễn Nhật Ánh"
- ✅ "Programming"

---

## 🛠️ Debugging

### Xem Console Logs

Trong terminal khi chạy `npm start`, xem logs:

```
Searching for "Avatar" on page 1 in mode movie
TMDB Search URL: https://api.themoviedb.org/3/search/movie?...
TMDB Response: { total_results: 85, total_pages: 5, ... }
Found 20 results, total pages: 5
```

### Test API Trực Tiếp

```bash
node test-api.js
```

Output:
```
✅ API Working!
Total Results: 85
First 3 Results:
1. Avatar (2009) - Rating: 7.6/10
2. Avatar (2006) - Rating: 5.9/10
...
```

---

## ❓ Troubleshooting

### ❌ Không có kết quả

**Nguyên nhân:**
- Từ khóa không đúng
- Lỗi mạng
- API không phản hồi

**Giải pháp:**
1. Thử từ khóa khác
2. Check console logs
3. Kiểm tra kết nối internet

### ❌ Loading mãi không dừng

**Nguyên nhân:**
- Request timeout
- API error

**Giải pháp:**
1. Reload app
2. Check console errors
3. Test với `node test-api.js`

### ❌ Ảnh không hiển thị

**Nguyên nhân:**
- URL poster lỗi
- Phim không có poster

**Giải pháp:**
- App tự động show placeholder

---

## 📊 Kết Quả Mong Đợi

### Movies Search: "Avatar"
```
✅ 85 kết quả
✅ 5 trang
✅ Page 1: 20 phim
✅ Mỗi phim có: poster, title, year, rating
```

### Books Search: "Harry Potter"
```
✅ 100+ kết quả
✅ Mỗi sách có: cover, title, authors, year
```

---

## 🎯 Features

✅ **Real-time Search** - Tìm kiếm ngay lập tức  
✅ **Pagination** - Phân trang thông minh  
✅ **Multi-language** - Tiếng Việt + Tiếng Anh  
✅ **Discover Mode** - Khám phá phim hot  
✅ **Loading States** - Feedback rõ ràng  
✅ **Empty States** - Hướng dẫn khi trống  
✅ **Error Handling** - Xử lý lỗi gracefully  

---

## 📱 UI/UX

### Search Bar
```
┌────────────────────────────┬───┐
│ Tìm kiếm phim...           │ 🔍 │
└────────────────────────────┴───┘
```

### Result Card (Vertical)
```
┌──────┬─────────────────────┐
│      │ Avatar              │
│Poster│ 2009                │
│      │ ⭐ 7.6/10           │
└──────┴─────────────────────┘
```

### Result Card (Horizontal - Discover)
```
┌──────────┐
│          │
│  Poster  │
│          │
├──────────┤
│ Avatar   │
│ ⭐ 7.6   │
└──────────┘
```

---

## 🚀 Next Steps

Có thể thêm:

1. **Search History** - Lịch sử tìm kiếm
2. **Autocomplete** - Gợi ý khi gõ
3. **Filters** - Lọc theo thể loại, năm
4. **Sort** - Sắp xếp kết quả
5. **Voice Search** - Tìm kiếm bằng giọng nói

---

**Chúc bạn tìm được phim/sách yêu thích! 🎬📚**
