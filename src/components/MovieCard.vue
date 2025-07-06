<template>
  <div class="movie-card">
    <!-- TODO: Add router links to movie and tv series pages RU:для перехода на страницы фильма или сериала -->
    
    <router-link :to="{ name: 'movie', params: { id: movie.id }}" v-if="movie.type !== 'tv-series'">
      <img
        :src="movie.poster?.url || '/placeholder.jpg'"
        :alt="movie.name"
        @error="handleImageError"
      />
      <div class="movie-info">
        <h3 class="movie-title">{{ movie.name }}</h3>
        <!-- TODO: Add rating and year to movie details RU:добавить рейтинг и год фильма -->
        <div class="movie-details">
          <span class="movie-rating" v-if="movie.rating?.kp">{{ movie.rating.kp.toFixed(1) }}</span>
          <span class="movie-rating" v-else>N/A</span>
          <span class="movie-year" v-if="movie.year">{{ movie.year }}</span>
          <span class="movie-year" v-else>N/A</span>
        </div>
      </div>
    </router-link>
    <!-- TODO: Add router links to movie and tv series pages RU:для перехода на страницы фильма или сериала -->
    <router-link :to="{ name: 'tv', params: { id: movie.id }}" v-else>
      <img
        :src="movie.poster?.url || '/placeholder.jpg'"
        :alt="movie.name"
        @error="handleImageError"
      />
      <div class="movie-info">
        <h3 class="movie-title">{{ movie.name }}</h3>
        <!-- TODO: Add rating and year to movie details RU:добавить рейтинг и год фильма -->
        <div class="movie-details">
          <span class="movie-rating" v-if="movie.rating?.kp">{{ movie.rating.kp.toFixed(1) }}</span>
          <span class="movie-rating" v-else>N/A</span>
          <span class="movie-year" v-if="movie.year">{{ movie.year }}</span>
          <span class="movie-year" v-else>N/A</span>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// TODO: Add type definitions for Movie RU:для описания структуры данных
interface Movie {
  id: number
  name: string
  poster?: {
    url: string
  }
  rating?: {
    kp: number
  }
  year?: number
  type?: string
}

// TODO: Add props definition RU:для передачи данных
const props = defineProps<{
  movie: Movie
}>()

// TODO: Add imageError ref RU:для отображения ошибки загрузки изображения
const imageError = ref(false)

// TODO: Add handleImageError method RU:для обработки ошибки загрузки изображения
const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
.movie-card {
  background-color: var(--secondary-bg);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  width: 260px;
  min-height: 420px;
  display: flex;
  flex-direction: column;
}
.movie-card:hover {
  transform: scale(1.05);
}
.movie-card img {
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.movie-info {
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.movie-title {
  font-size: 1.15rem;
  margin: 0 0 10px 0;
  color: #fce7e7;
}
.movie-rating {
  color: #ffd700;
  font-weight: bold;
}
.movie-year {
  color: #888;
  font-size: 0.9rem;
  margin-left: 0.4rem;
}
</style> 