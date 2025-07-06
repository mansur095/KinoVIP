<template>
  <main class="container">
    <h1>Популярные фильмы</h1>
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="popularMovies.length === 0" class="error">
      Нет фильмов для отображения.
    </div>
    <div v-else class="movie-grid">
      <!-- MovieCard.vue -->
      <MovieCard
        v-for="movie in popularMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMovieStore } from '@/stores/movies'
import { storeToRefs } from 'pinia'
import MovieCard from '@/components/MovieCard.vue'

// Получение данных из хранилища
const movieStore = useMovieStore()
const { popularMovies, loading, error } = storeToRefs(movieStore)

onMounted(() => {
  movieStore.fetchPopularMovies()
})
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0;
  padding: 0 20px;
  box-sizing: border-box;
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 36px 32px;
  padding: 20px 0;
}

@media (max-width: 1200px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 800px) {
  .movie-grid {
    grid-template-columns: 1fr;
  }
}

h1 {
  font-size: 2rem;
  margin: 20px 0;
  text-align: center;
}

.error {
  color: var(--accent-color);
  text-align: center;
  padding: 20px;
}
</style> 