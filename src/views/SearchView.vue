<script setup lang="ts">
import { computed } from 'vue'
import { useMovieStore } from '@/stores/movies'
import MovieCard from '@/components/MovieCard.vue'

const movieStore = useMovieStore()

const searchResults = computed(() => movieStore.searchResults)
const loading = computed(() => movieStore.loading)
const error = computed(() => movieStore.error)
const lastSearchQuery = computed(() => movieStore.lastSearchQuery)
</script>

<template>
  <div class="search-view">
    <h1 class="search-title">
      Результаты поиска
      <span v-if="lastSearchQuery" class="search-query">"{{ lastSearchQuery }}"</span>
    </h1>
    
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Поиск...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    
    <div v-else-if="searchResults.length === 0 && lastSearchQuery" class="no-results">
      <p>По запросу "{{ lastSearchQuery }}" ничего не найдено</p>
      <p class="search-tip">Попробуйте изменить поисковый запрос</p>
    </div>
    
    <div v-else-if="searchResults.length === 0" class="no-query">
      <p>Введите поисковый запрос</p>
    </div>
    
    <div v-else class="search-results">
      <div class="results-count">
        Найдено {{ searchResults.length }} результатов
      </div>
      <div class="movies-grid">
        <MovieCard
          v-for="movie in searchResults"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-view {
  padding: 20px 0;
}

.search-title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 30px;
  text-align: center;
}

.search-query {
  color: var(--accent-color);
  font-style: italic;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  color: var(--text-color);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--accent-color);
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  color: #f44336;
  padding: 40px 0;
  font-size: 1.1rem;
}

.no-results {
  text-align: center;
  color: var(--text-color);
  padding: 60px 0;
  font-size: 1.2rem;
}

.no-query {
  text-align: center;
  color: var(--text-color);
  padding: 60px 0;
  font-size: 1.2rem;
  opacity: 0.7;
}

.search-tip {
  font-size: 1rem;
  opacity: 0.7;
  margin-top: 10px;
}

.search-results {
  margin-top: 20px;
}

.results-count {
  text-align: center;
  color: var(--text-color);
  margin-bottom: 20px;
  font-size: 1.1rem;
  opacity: 0.8;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  padding: 0;
}

@media (max-width: 768px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
  }
  
  .search-title {
    font-size: 1.5rem;
  }
}
</style> 