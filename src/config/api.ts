// Получите API ключ на https://www.themoviedb.org/settings/api
// После получения ключа замените 'YOUR_TMDB_API_KEY' на ваш ключ
export const API_KEY = import.meta.env.VITE_API_KEY;
export const BASE_URL = 'https://api.kinopoisk.dev/v1.4'
export const IMAGE_BASE_URL = 'https://kinopoiskapiunofficial.tech/images'

// Интерфейсы
export const API_ENDPOINTS = {
  popularMovies: '/movie?page=1&limit=20&type=movie&status=published&rating.kp=7-10',
  movieDetails: (id: number) => `/movie/${id}`,
  popularTv: '/movie?page=1&limit=20&type=tv-series&status=published&rating.kp=7-10',
  tvDetails: (id: number) => `/movie/${id}`,
  search: '/movie/search'
} 