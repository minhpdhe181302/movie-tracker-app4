import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';
import { searchMovies } from '../api/tmdbApi';

export default function TestSearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch() {
    if (!query.trim()) {
      setError('Nhập tên phim để tìm kiếm');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      console.log('Testing search for:', query);
      const data = await searchMovies(query, 1);
      console.log('Search results:', data);
      setResults(data.results);
      setError(`Tìm thấy ${data.totalResults} phim`);
    } catch (err) {
      console.error('Test search error:', err);
      setError('Lỗi: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧪 Test Search</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nhập tên phim (VD: Avatar)"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      
      <Button 
        title={loading ? "Đang tìm..." : "Tìm kiếm"} 
        onPress={handleSearch}
        disabled={loading}
      />
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemYear}>{item.year}</Text>
            <Text style={styles.itemRating}>⭐ {item.voteAverage?.toFixed(1)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'green',
    marginTop: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemYear: {
    color: '#666',
  },
  itemRating: {
    color: '#f90',
  },
});
