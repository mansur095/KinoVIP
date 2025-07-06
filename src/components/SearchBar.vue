<script setup lang="ts">
import { ref } from 'vue'
import { useMovieStore } from '@/stores/movies'
import { useRouter } from 'vue-router'

const movieStore = useMovieStore()
const router = useRouter()

const searchQuery = ref('')
const isSearchVisible = ref(false)

// Обработчик события Enter EN: Enter event handler
const handleSearch = async () => {
  if (searchQuery.value.trim()) {
    try {
      await movieStore.searchMovies(searchQuery.value)
      // Простая навигация без параметров EN: Simple navigation without parameters
      await router.push('/search')
    } catch (error) {
      console.error('Ошибка при поиске:', error)
    }
  }
}

// Очистка поискового запроса EN: Clearing of the search query
const clearSearch = () => {
  searchQuery.value = ''
  movieStore.clearSearch()
  isSearchVisible.value = false
}

// Убираем автоматический поиск, оставляем только по кнопке и Enter EN: Remove automatic search, leave only by button and Enter
</script>

<template>
  <div class="search-container">
    <div class="search-input-wrapper">
      <!-- Скрываем кнопку очистки, если поисковый запрос пуст EN: Hiding the clear button if the search query is empty -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Поиск фильмов..."
        class="search-input"
        @keyup.enter="handleSearch"
        @focus="isSearchVisible = true"
      />
      <!-- Скрываем кнопку очистки EN: Hiding the clear button -->
      <button 
        v-if="searchQuery" 
        @click="clearSearch" 
        class="clear-btn"
        type="button"
      >
        ✕
      </button>
      <!-- Скрываем кнопку поиска EN: Hiding the search button -->
      <button 
        @click="handleSearch" 
        class="search-btn"
        type="button"
      >
        🔍
      </button>
    </div>
  </div>
</template>

<style scoped>
/*-------------------------------------------------------------
Стили для компонента SearchBar EN: Styles for the SearchBar component
-------------------------------------------------------------*/
.search-container {
  width: 90%;
  padding: 0 20px;
  margin-bottom: 20px;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 1px solid var(--accent-color);
  border-radius: 6px;
  background: var(--primary-bg);
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #d32f2f;
  box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.2);
}

.search-input::placeholder {
  color: #888;
}

.search-btn {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  color: var(--accent-color);
  cursor: pointer;
  padding: 4px;
  font-size: 16px;
  transition: color 0.2s;
}

.search-btn:hover {
  color: #d32f2f;
}

.clear-btn {
  position: absolute;
  right: 35px;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 4px;
  font-size: 14px;
  transition: color 0.2s;
}

.clear-btn:hover {
  color: var(--accent-color);
}

/* Стили для свернутого сайд-бара */
.sidebar.collapsed .search-container {
  padding: 0 10px;
}

.sidebar.collapsed .search-input {
  padding: 8px 30px 8px 8px;
  font-size: 12px;
}

.sidebar.collapsed .search-btn {
  right: 6px;
  font-size: 14px;
}

.sidebar.collapsed .clear-btn {
  right: 25px;
  font-size: 12px;
}
</style> 