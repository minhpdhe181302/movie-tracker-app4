// Test TMDB API directly
const API_KEY = "ffbc8d537064e9b3303bdab3d735f05e";
const BASE_URL = "https://api.themoviedb.org/3";

async function testSearch() {
  const query = "Avatar";
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=vi-VN&query=${encodeURIComponent(query)}&page=1`;
  
  console.log("Testing URL:", url);
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    console.log("\n=== TMDB API Response ===");
    console.log("Status:", res.status);
    console.log("Total Results:", data.total_results);
    console.log("Total Pages:", data.total_pages);
    console.log("Current Page:", data.page);
    console.log("Results Count:", data.results?.length);
    
    if (data.results && data.results.length > 0) {
      console.log("\n=== First 3 Results ===");
      data.results.slice(0, 3).forEach((movie, index) => {
        console.log(`\n${index + 1}. ${movie.title} (${movie.release_date?.split('-')[0]})`);
        console.log(`   ID: ${movie.id}`);
        console.log(`   Rating: ${movie.vote_average}/10`);
        console.log(`   Overview: ${movie.overview?.substring(0, 100)}...`);
      });
    }
    
    if (data.status_code) {
      console.error("\n❌ API Error:", data.status_message);
    } else {
      console.log("\n✅ API Working!");
    }
    
  } catch (error) {
    console.error("\n❌ Fetch Error:", error.message);
  }
}

// Run test
testSearch();
