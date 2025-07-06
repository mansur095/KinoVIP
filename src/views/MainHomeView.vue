<template>
  <main class="container">
    <h1>Добро пожаловать в KinoVIP</h1>
    <div class="movie-title-text-home">KinoVIP - там, где живут ваши любимые фильмы!
      </div>
      <div class="movie-subtitle-text-home">Ваш персональный кинотеатр! Здесь собраны лучшие фильмы и сериалы со всего мира. Открывайте для себя новые истории, переживайте яркие эмоции и наслаждайтесь кино в отличном качестве. Без рекламы, без ограничений - только настоящее кино для настоящих ценителей. Тысячи фильмов. Сотни сериалов. Одна подписка.
        Начните смотреть прямо сейчас!  
      </div>
    
    <!-- Popular Movies Section -->
    <section class="movie-section">
      <h2>Популярные фильмы</h2>
      <div v-if="loading" class="loading">
        <div class="loading-spinner"></div>
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else class="movie-scroll-container">
        <div class="movie-scroll">
          <!-- Movie Cards -->
          <MovieCard
            v-for="movie in popularMovies"
            :key="movie.id"
            :movie="movie"
            class="scroll-card"
          />
          <!-- Duplicate Cards for Scroll Effect -->
          <MovieCard
            v-for="movie in popularMovies"
            :key="`duplicate-${movie.id}`"
            :movie="movie"
            class="scroll-card"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMovieStore } from '@/stores/movies'
import { storeToRefs } from 'pinia'
import MovieCard from '@/components/MovieCard.vue'

const movieStore = useMovieStore()
const { popularMovies, loading, error } = storeToRefs(movieStore)

onMounted(() => {
  movieStore.fetchPopularMovies()
})
</script>

<style scoped>
.movie-title-text-home {
  font-family: Museo,Segoe UI,sans-serif;
  font-size: 22px;
  line-height: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}

.movie-subtitle-text-home {
  font-family: Museo,Segoe UI,sans-serif;
  font-size: 20px;
  font-weight: 400;
  margin: auto;
  margin-bottom: 1.2rem;
  text-align: center;
  line-height: 1.65rem;
  max-width: 600px;
}

.container {
  width: 100%;
  margin: 0;
  padding: 0 20px;
  box-sizing: border-box;
}

h1 {
  font-family: Museo,Segoe UI,sans-serif;
  font-weight: 900;
  line-height: 1rem;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  margin: 20px 0 40px 0;
  text-align: center;
  color: #5c5c5c;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.movie-section {
  margin-bottom: 60px;
}

.movie-section h2 {
  font-size: 1.8rem;
  margin: 20px 0;
  color: var(--text-color);
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.movie-scroll-container {
  overflow: hidden;
  position: relative;
  padding: 20px 0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.movie-scroll {
  display: flex;
  gap: 24px;
  animation: scrollRight 40s linear infinite;
  width: max-content;
  padding: 20px;
}

.movie-scroll.reverse {
  animation: scrollLeft 35s linear infinite;
}

.scroll-card {
  flex-shrink: 0;
  width: 280px;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

.scroll-card:hover {
  transform: scale(1.08) translateY(-10px);
  z-index: 10;
  box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

@keyframes scrollRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes scrollLeft {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--secondary-bg);
  border-top: 4px solid var(--accent-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  color: var(--accent-color);
  text-align: center;
  padding: 20px;
  font-size: 1.1rem;
}

/* Пауза анимации при наведении */
.movie-scroll-container:hover .movie-scroll {
  animation-play-state: paused;
}

.movie-scroll-container:hover .movie-scroll.reverse {
  animation-play-state: paused;
}

/* Градиентные края для плавного перехода */
.movie-scroll-container::before,
.movie-scroll-container::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 5;
  pointer-events: none;
}

.movie-scroll-container::before {
  left: 0;
  background: linear-gradient(to right, var(--primary-bg), transparent);
}

.movie-scroll-container::after {
  right: 0;
  background: linear-gradient(to left, var(--primary-bg), transparent);
}
</style> 