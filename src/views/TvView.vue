<template>
  <main class="container">
    <h1>Популярные сериалы</h1>
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="selectedTv.length === 0" class="error">
      Нет сериалов для отображения.
    </div>
    <div v-else class="movie-grid">
      <MovieCard
        v-for="tv in selectedTv"
        :key="tv.id"
        :movie="tv"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMovieStore } from '@/stores/movies'
import MovieCard from '@/components/MovieCard.vue'

const tvIds = [464963,478491,5304403,685246,749374,687595,404900,4445150,1040419,796660,591929,160958,5230828,257376,716587,460586,1008439,1171895,2040161,996611]
const movieStore = useMovieStore()
const loading = ref(true)
const error = ref<string|null>(null)
const selectedTv = ref<any[]>([])

// Обновление данных при навигации между страницами EN: Updating data when navigating between pages RU: Обновление данных при навигации между страницами
onMounted(async () => {
  loading.value = true // Показать индикатор загрузки EN: Show loading indicator
  error.value = null // Очистка ошибки EN: Clear error
  selectedTv.value = [] // Очистка выбранных сериалов EN: Clear selected series
  // Получение данных о сериалах EN: Getting data about series
  try {
    const results = await Promise.all(
      tvIds.map(id => movieStore.fetchMovieDetails(id).then(() => {
        const movie = movieStore.currentMovie
        if (movie) {
          movie.type = 'tv-series'
        }
        return movie
      }))
    )
    // Фильтрация результатов EN: Filtering results
    selectedTv.value = results.filter(Boolean)
  } catch (e) {
    error.value = 'Ошибка загрузки сериалов' // EN: Error loading series RU: Ошибка загрузки сериалов
  } finally {
    loading.value = false // Скрыть индикатор загрузки EN: Hide loading indicator
  }
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