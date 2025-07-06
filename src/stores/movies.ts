import { defineStore } from 'pinia'
import axios from 'axios'
import { API_KEY, BASE_URL } from '@/config/api'

/// Интерфейс для описания фильма
interface Movie {
  id: number // Идентификатор фильма EN: Movie ID
  name: string // Название фильма EN: Movie name
  description: string // Описание фильма EN: Movie description
  poster: {
    url: string // URL постера фильма EN: Poster URL
  }
  rating: {
    kp: number // Рейтинг фильма на Kinopoisk EN: Kinopoisk rating
  }
  year: number // Год выпуска фильма EN: Release year
  type?: string // Тип фильма (например, 'movie' или 'tv-series') EN: Movie type
}

/// Интерфейс для описания состояния хранилища EN: Store state interface
interface MovieState {
  popularMovies: Movie[]
  popularTv: Movie[]
  currentMovie: Movie | null
  searchResults: Movie[]
  lastSearchQuery: string
  loading: boolean
  error: string | null
}

/// Создание хранилища EN: Store creation
export const useMovieStore = defineStore('movies', {
  state: (): MovieState => ({
    popularMovies: [],
    popularTv: [],
    currentMovie: null,
    searchResults: [],
    lastSearchQuery: '',
    loading: false,
    error: null
  }),

  /// Методы для работы с фильмами EN: Movie-related methods
  actions: {
    /// Загрузка популярных фильмов EN: Load popular movies
    async fetchPopularMovies() {
      this.loading = true
      try {
        const response = await axios.get(`${BASE_URL}/movie`, {
          headers: {
            'X-API-KEY': API_KEY,
            'accept': 'application/json'
          },
          params: {
            page: 1, // EN: Page number RU: Номер страницы
            limit: 20, // EN: Limit number of results RU: Количество результатов
            type: 'movie', // EN: Movie RU: Фильм
            'rating.kp': '7-10'
          }
        })
        // Проверка, что данные содержат массив фильмов
        this.popularMovies = response.data.docs
      } catch (error) {
        this.error = 'Failed to fetch popular movies' // EN: Error message
        console.error(error)
      } finally {
        this.loading = false // EN: Loading state
      }
    },

    // Загрузка популярных телепередач EN: Load popular TV shows
    async fetchPopularTv(limit = 20) {
      this.loading = true
      try {
        // Проверка на правильный эндпоинт EN: Check for correct endpoint
        const response = await axios.get(`${BASE_URL}/movie`, {
          headers: {
            'X-API-KEY': API_KEY,
            'accept': 'application/json'
          },
          params: {
            page: 1, // EN: Page number RU: Номер страницы
            limit, // EN: Limit number of results RU: Количество результатов
            type: 'tv-series', // EN: TV series RU: Телепередачи
            'rating.kp': '7-10'
          }
        })
        // Проверка, что данные содержат массив телепередач
        this.popularTv = response.data.docs
      } catch (error) {
        this.error = 'Failed to fetch popular tv-series' // EN: Error message
        console.error(error)
      } finally {
        this.loading = false // EN: Loading state
      }
    },

    // Загрузка деталей фильма EN: Load movie details
    async fetchMovieDetails(id: number) {
      this.loading = true
      try {
        // Проверка на правильный эндпоинт EN: Check for correct endpoint
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          headers: {
            'X-API-KEY': API_KEY,
            'accept': 'application/json'
          }
        })
        this.currentMovie = response.data
      } catch (error) {
        this.error = 'Failed to fetch movie details' // EN: Error message
        console.error(error)
      } finally {
        this.loading = false // EN: Loading state
      }
    },

    // Поиск фильмов EN: Movie search
    async searchMovies(query: string) {
      if (!query.trim()) {
        this.searchResults = [] // EN: Clear search results RU: Очистить результаты поиска
        this.lastSearchQuery = '' // EN: Clear last search query RU: Очистить последний поисковый запрос
        return
      }

      this.loading = true
      this.error = null
      this.lastSearchQuery = query.trim()
      
      // Проверка на правильный эндпоинт EN: Check for correct endpoint
      try {
        console.log('Выполняем поиск с правильным эндпоинтом:', query)
        
        // Проверка на правильный эндпоинт EN: Check for correct endpoint
        const response = await axios.get(`${BASE_URL}/movie/search`, {
          headers: {
            'X-API-KEY': API_KEY,
            'accept': 'application/json'
          },
          params: {
            page: 1, // EN: Page number RU: Номер страницы
            limit: 20, // EN: Limit number of results RU: Количество результатов
            query: query.trim() // EN: Search query RU: Поисковый запрос
          }
        })
        
        console.log('Ответ API для поиска:', response.data)
        
        // Проверка, что данные содержат массив фильмов EN: Check if the response contains an array of movies
        if (response.data.docs && Array.isArray(response.data.docs)) {
          this.searchResults = response.data.docs // EN: Set search results RU: Установить результаты поиска
          console.log('Найдено результатов:', this.searchResults.length) // EN: Log the number of search results RU: Вывести количество найденных результатов
        } else {
          this.searchResults = [] // EN: Clear search results RU: Очистить результаты поиска
          console.log('API не вернул массив docs') // EN: Log the API response RU: Вывести ответ API
        }
      } catch (error) {
        console.error('Ошибка поиска:', error) // EN: Log the error RU: Вывести ошибку
        this.error = 'Ошибка при поиске фильмов' // EN: Error message RU: Сообщение об ошибке
        this.searchResults = []
      } finally {
        this.loading = false
      }
    },

    // Очистка результатов поиска EN: Clear search results
    clearSearch() {
      this.searchResults = [] // EN: Clear search results RU: Очистить результаты поиска
      this.lastSearchQuery = '' // EN: Clear last search query RU: Очистить последний поисковый запрос
      this.error = null // EN: Clear error message RU: Очистить сообщение об ошибке
    }
  }
}) 