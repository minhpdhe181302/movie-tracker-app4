# 🧩 Refactoring: Component Architecture & Pagination

## ✅ Hoàn Thành

SearchScreen đã được chia nhỏ thành các component tái sử dụng và thêm tính năng phân trang.

## 📦 Cấu Trúc Components Mới

### 1. **ModeSelector** (`src/components/search/ModeSelector.js`)

Component để chuyển đổi giữa Movies và Books.

```javascript
<ModeSelector mode={mode} onModeChange={handleModeChange} />
```

**Props:**

- `mode` - Mode hiện tại ('movie' | 'book')
- `onModeChange` - Callback khi đổi mode

**Features:**

- ✅ 2 buttons với màu riêng (Movie: Hồng, Book: Tím)
- ✅ Active state với shadow
- ✅ Icon emoji

---

### 2. **SearchBar** (`src/components/search/SearchBar.js`)

Component search input với button.

```javascript
<SearchBar
  value={query}
  onChangeText={setQuery}
  onSearch={handleSearch}
  placeholder="Tìm kiếm phim..."
  loading={loading}
/>
```

**Props:**

- `value` - Giá trị input
- `onChangeText` - Callback khi text thay đổi
- `onSearch` - Callback khi nhấn search
- `placeholder` - Placeholder text
- `loading` - Hiển thị loading state

**Features:**

- ✅ Auto-submit khi nhấn Enter
- ✅ Disabled state khi loading
- ✅ Icon 🔍

---

### 3. **MovieCard** (`src/components/search/MovieCard.js`)

Component hiển thị thông tin phim (2 layouts).

```javascript
// Horizontal (cho scroll list)
<MovieCard
  item={movie}
  onPress={handlePress}
  horizontal={true}
/>

// Vertical (cho search results)
<MovieCard
  item={movie}
  onPress={handlePress}
/>
```

**Props:**

- `item` - Movie object
- `onPress` - Callback khi nhấn vào card
- `horizontal` - Layout ngang hay dọc (default: false)

**Horizontal Layout:**

- Width: 140px
- Poster height: 210px
- Title + Rating badge

**Vertical Layout:**

- Full width
- Poster 80x120px
- Title + Year + Rating

---

### 4. **MovieSection** (`src/components/search/MovieSection.js`)

Component hiển thị danh sách phim scroll ngang với title.

```javascript
<MovieSection
  title="🔥 Phim Phổ Biến"
  movies={popularMovies}
  onMoviePress={handlePress}
/>
```

**Props:**

- `title` - Tiêu đề section
- `movies` - Array of movies
- `onMoviePress` - Callback khi nhấn vào phim

**Features:**

- ✅ Horizontal ScrollView
- ✅ Auto-render MovieCard horizontal
- ✅ Hide nếu movies empty

---

### 5. **SearchStates** (`src/components/search/SearchStates.js`)

Components cho Loading và Empty states.

```javascript
// Loading
<LoadingIndicator text="Đang tải..." />

// Empty State
<EmptyState
  icon="🔍"
  title="Không tìm thấy"
  subtitle="Thử từ khóa khác"
/>
```

**LoadingIndicator Props:**

- `text` - Loading message (default: "Đang tải...")

**EmptyState Props:**

- `icon` - Emoji icon
- `title` - Main message
- `subtitle` - Sub message (optional)

---

### 6. **Pagination** (`src/components/search/Pagination.js`)

Component phân trang với Previous/Next buttons.

```javascript
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  loading={loading}
/>
```

**Props:**

- `currentPage` - Trang hiện tại
- `totalPages` - Tổng số trang
- `onPageChange` - Callback(newPage)
- `loading` - Disable buttons khi loading

**Features:**

- ✅ Previous button (disabled khi page = 1)
- ✅ Page info: "Trang X / Y"
- ✅ Next button (disabled khi page = totalPages)
- ✅ Styled card với shadows

---

## 🔄 API Updates

### TMDB API - Pagination Support

**`searchMovies(query, page)`** - Thêm page parameter

```javascript
const result = await searchMovies("Avatar", 2);
// Returns:
{
  results: [...],      // Array of movies
  totalPages: 42,      // Total pages (max 500)
  currentPage: 2,      // Current page
  totalResults: 837    // Total results
}
```

**Trước:**

```javascript
searchMovies(query); // Returns array
```

**Sau:**

```javascript
searchMovies(query, (page = 1)); // Returns object with pagination
```

---

## 🎯 SearchScreen - Refactored

### State Management

```javascript
const [query, setQuery] = useState("");
const [mode, setMode] = useState("movie");
const [results, setResults] = useState([]);
const [popularMovies, setPopularMovies] = useState([]);
const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
const [loading, setLoading] = useState(false);

// 🆕 Pagination states
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [hasSearched, setHasSearched] = useState(false);
```

### Functions

**`handleSearch(page)`**

- Search với page number
- Update results, currentPage, totalPages
- Set hasSearched = true

**`handlePageChange(newPage)`**

- Change page và re-search

**`handleModeChange(newMode)`**

- Reset tất cả states khi đổi mode

**`navigateToDetail(item)`**

- Navigate với item và mode

### Render Logic

```javascript
return (
  <View>
    <ModeSelector />
    <SearchBar />

    {
      hasSearched || results.length > 0
        ? renderSearchResults() // Search results + Pagination
        : renderDiscoverContent() // Popular + Now Playing
    }
  </View>
);
```

**`renderSearchResults()`:**

- Loading state
- Empty state
- FlatList với MovieCard
- Pagination (nếu totalPages > 1)

**`renderDiscoverContent()`:**

- MovieSection: Popular
- MovieSection: Now Playing
- EmptyState cho Books mode

---

## 📊 Component Hierarchy

```
SearchScreen/
├── ModeSelector
├── SearchBar
└── Content
    ├── (If hasSearched)
    │   ├── LoadingIndicator
    │   ├── EmptyState
    │   └── FlatList
    │       ├── MovieCard (vertical) × N
    │       └── Pagination
    │
    └── (If not searched)
        ├── MovieSection (Popular)
        │   └── MovieCard (horizontal) × 10
        └── MovieSection (Now Playing)
            └── MovieCard (horizontal) × 10
```

---

## 🎨 Benefits

### ✅ **Code Organization**

- Components nhỏ, focused
- Dễ test từng component
- Reusable trong toàn app

### ✅ **Maintainability**

- Dễ debug và fix bugs
- Dễ thêm features mới
- Clear separation of concerns

### ✅ **Performance**

- Pagination giảm tải dữ liệu
- Lazy loading với FlatList
- Optimized re-renders

### ✅ **UX Improvements**

- Phân trang smooth
- Loading states rõ ràng
- Empty states hướng dẫn user

---

## 📁 File Structure

```
src/
├── components/
│   └── search/
│       ├── ModeSelector.js     ← NEW
│       ├── SearchBar.js        ← NEW
│       ├── MovieCard.js        ← NEW
│       ├── MovieSection.js     ← NEW
│       ├── SearchStates.js     ← NEW (LoadingIndicator, EmptyState)
│       └── Pagination.js       ← NEW
│
├── screens/
│   └── SearchScreen.js         ← REFACTORED (từ 400 → 200 lines)
│
└── api/
    └── tmdbApi.js              ← UPDATED (pagination support)
```

---

## 🚀 Usage Examples

### Example 1: Search với Pagination

```javascript
// User searches "Avatar"
handleSearch(1)
  → API: searchMovies("Avatar", 1)
  → Results: 20 phim, totalPages: 42
  → Show Pagination

// User clicks "Sau →"
handlePageChange(2)
  → API: searchMovies("Avatar", 2)
  → Results: 20 phim (page 2)
  → Update currentPage: 2
```

### Example 2: Discover Mode

```javascript
// User opens Search tab (mode = "movie", no search)
renderDiscoverContent()
  → MovieSection: Popular (10 phim)
  → MovieSection: Now Playing (10 phim)
```

### Example 3: Mode Switch

```javascript
// User clicks "📚 Books"
handleModeChange("book")
  → Clear query, results
  → Reset pagination
  → Show EmptyState: "Tìm kiếm sách"
```

---

## 🔧 Testing Tips

### Test Individual Components

```javascript
// Test ModeSelector
<ModeSelector mode="movie" onModeChange={mockFn} />

// Test MovieCard
<MovieCard item={mockMovie} onPress={mockFn} horizontal={true} />

// Test Pagination
<Pagination currentPage={5} totalPages={10} onPageChange={mockFn} />
```

### Test SearchScreen

1. **Initial state**: Should show Popular + Now Playing
2. **Search**: Should show results với pagination
3. **Page change**: Should update results
4. **Mode change**: Should reset states
5. **Empty search**: Should show EmptyState

---

## 📈 Performance Metrics

### Before Refactoring

- SearchScreen: ~400 lines
- Tất cả logic trong 1 file
- Khó maintain

### After Refactoring

- SearchScreen: ~200 lines
- 6 reusable components
- Clean, maintainable code

### Pagination Benefits

- Load 20 items/page thay vì hết
- Faster initial load
- Better UX với large datasets

---

## 🎯 Next Steps

Có thể mở rộng:

1. **Infinite Scroll**: Thay pagination bằng load more
2. **Filters**: Genre, year, rating filters
3. **Sort**: Sort by popularity, rating, date
4. **Cache**: Cache results để không reload
5. **Skeleton Loading**: Placeholder khi loading

---

**Happy Coding! 🎉**
