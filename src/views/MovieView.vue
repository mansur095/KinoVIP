<template>
  <main class="movie-page">
    <div class="movie-details-flex" v-if="movie">
      <div class="movie-poster-block">
        <img 
          :src="movie.poster?.url" 
          :alt="movie.name" 
          class="movie-poster" 
        />
      </div>
      <div class="movie-info-block">
        <h1 class="movie-title">{{ movie.name }}</h1>
        <div class="movie-meta">
          <div><b>Год:</b> {{ movie.year }}</div>
          <div><b>Страны:</b> {{ movie.countries?.map((c: any) => c.name).join(', ') }}</div>
          <div><b>Жанры:</b> {{ movie.genres?.map((g: any) => g.name).join(', ') }}</div>
          <div><b>Возрастной рейтинг:</b> {{ movie.ageRating ? movie.ageRating + '+' : '—' }}</div>
          <div><b>Рейтинг Кинопоиска:</b> {{ movie.rating?.kp }}</div>
          <div><b>Актеры:</b> {{ movie.persons?.filter((p: any) => p.profession === 'актеры').map((p: any) => p.name).join(', ') || '—' }}</div>
        </div>
        <div v-if="movie.videos?.trailers?.length" class="movie-trailer">
          <b>Трейлер:</b>
          <iframe
            v-if="movie.videos.trailers[0].site === 'youtube'"
            width="420" height="236"
            :src="getYoutubeEmbed(movie.videos.trailers[0].url)"
            frameborder="0" allowfullscreen
          ></iframe>
        </div>
        <div class="movie-description">
          <b>Описание:</b>
          <p>{{ movie.description }}</p>
        </div>
      </div>
    </div>
    <div v-else class="loading">Загрузка...</div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/stores/movies'

// Define the Movie interface RU: Интерфейс фильма
interface Movie {
  id: number
  name: string
  year: number
  countries?: { name: string }[]
  genres?: { name: string }[]
  ageRating?: number
  rating?: { kp: number }
  persons?: { name: string, profession: string }[]
  poster?: { url: string }
  videos?: { trailers: { url: string, site: string }[] }
  description?: string
}

const route = useRoute()
const movieStore = useMovieStore()
const movie = ref<Movie | null>(null)

// RU: Функция для получения ссылки на эмбед видео с YouTube EU: Function to get YouTube video embed link
function getYoutubeEmbed(url: string) {
  if (!url) return ''
  if (url.includes('embed')) return url
  const match = url.match(/(?:\?|&)v=([\w-]+)/)
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`
  }
  return url
}

// RU: Mounted hook для загрузки данных о фильме EU: Mounted hook for loading movie data
onMounted(async () => {
  await movieStore.fetchMovieDetails(Number(route.params.id))
  movie.value = movieStore.currentMovie as Movie
})
</script>

<style scoped>
.movie-page {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 40px 0 40px 0;
}
.movie-details-flex {
  display: flex;
  flex-direction: row;
  gap: 48px;
  width: 100%;
  align-items: flex-start;
}
.movie-poster-block {
  flex: 0 0 320px;
  display: flex;
  justify-content: flex-start;
}
.movie-poster {
  width: 320px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}
.movie-info-block {
  flex: 1;
  min-width: 300px;
}
.movie-title {
  font-size: 2rem;
  margin-bottom: 16px;
}
.movie-meta > div {
  margin-bottom: 8px;
}
.movie-trailer {
  margin-bottom: 16px;
}
.movie-description {
  margin-top: 16px;
  font-size: 1.1rem;
}
@media (max-width: 900px) {
  .movie-details-flex {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
  .movie-poster-block {
    justify-content: center;
  }
}
</style> 