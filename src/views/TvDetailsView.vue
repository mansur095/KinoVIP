<template>
  <main class="movie-page">
    <div class="movie-details-flex" v-if="tv">
      <div class="movie-poster-block">
        <img :src="tv.poster?.url" :alt="tv.name" class="movie-poster" />
      </div>
      <div class="movie-info-block">
        <h1 class="movie-title">{{ tv.name }}</h1>
        <div class="movie-meta">
          <div><b>Год:</b> {{ tv.year }}</div>
          <div><b>Страны:</b> {{ tv.countries?.map(c => c.name).join(', ') || '—' }}</div>
          <div><b>Жанры:</b> {{ tv.genres?.map(g => g.name).join(', ') || '—' }}</div>
          <div><b>Возрастной рейтинг:</b> {{ tv.ageRating ? tv.ageRating + '+' : '—' }}</div>
          <div><b>Рейтинг Кинопоиска:</b> {{ tv.rating?.kp || '—' }}</div>
          <div><b>Актеры:</b> {{ tv.persons?.filter(p => p.profession === 'актеры').map(p => p.name).join(', ') || '—' }}</div>
        </div>
        <div v-if="tv.videos?.trailers?.length" class="movie-trailer">
          <b>Трейлер:</b>
          <iframe
            v-if="tv.videos.trailers[0].site === 'youtube'"
            width="420" height="236"
            :src="getYoutubeEmbed(tv.videos.trailers[0].url)"
            frameborder="0" allowfullscreen
          ></iframe>
        </div>
        <div class="movie-description">
          <b>Описание:</b>
          <p>{{ tv.description || 'Нет описания.' }}</p>
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

interface TvSeries {
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
const tv = ref<TvSeries | null>(null)

// Для получения ссылки на трейлер EN: for getting a link to the trailer
function getYoutubeEmbed(url: string) {
  if (!url) return ''
  if (url.includes('embed')) return url
  const match = url.match(/(?:\?|&)v=([\w-]+)/)
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`
  }
  return url
}

onMounted(async () => {
  await movieStore.fetchMovieDetails(Number(route.params.id))
  tv.value = movieStore.currentMovie as TvSeries
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