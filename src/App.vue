<script setup lang="ts">
import { ref } from 'vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconMovie from '@/components/icons/IconMovie.vue'
import IconTv from '@/components/icons/IconTv.vue'
import SearchBar from '@/components/SearchBar.vue'
import ticket from './assets/logo.svg'

const isSidebarCollapsed = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}
</script>

<template>
  <div class="layout">
    <aside class="sidebar" :class="{ 'collapsed': isSidebarCollapsed }">
      <div class="sidebar-header">
        <div class="sidebar-title" v-show="!isSidebarCollapsed">KinoVIP
          <img 
            :src="ticket" 
            alt="ticket" 
            class="kino-vip-logo"
          />
        </div>
        <button class="toggle-btn" @click="toggleSidebar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="!isSidebarCollapsed" d="M15 18l-6-6 6-6"/>
            <path v-else d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
      
      <SearchBar v-show="!isSidebarCollapsed" />
      
      <div v-show="isSidebarCollapsed" class="search-icon-collapsed">
        <router-link to="/search" class="search-icon-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </router-link>
      </div>
      
      <nav class="sidebar-nav">
        <!-- Навигация для главной страницы EN: Navigation for the home page -->
        <router-link 
          to="/home" 
          class="sidebar-link" 
          active-class="active-link" 
          exact
        >
          <IconHome class="sidebar-icon" />
          <span v-show="!isSidebarCollapsed">Главная</span>
        </router-link>
        <!-- Навигация для главной страницы EN: Navigation for the home page -->
        <router-link 
          to="/" 
          class="sidebar-link" 
          active-class="active-link"
        >
          <IconMovie class="sidebar-icon" />
          <span v-show="!isSidebarCollapsed">Фильмы</span>
        </router-link>
        <!-- Навигация для фильмов EN: Navigation for movies -->
        <router-link 
          to="/tv" 
          class="sidebar-link" 
          active-class="active-link"
        >
          <IconTv class="sidebar-icon" />
          <span v-show="!isSidebarCollapsed">Сериалы</span>
        </router-link>
      </nav>
    </aside>
    <div class="main-content" :class="{ 'expanded': isSidebarCollapsed }">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.layout {
  min-height: 100vh;
}

.sidebar {
  width: 280px;
  background: var(--secondary-bg);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0 0 0;
  box-shadow: 2px 0 8px rgba(0,0,0,0.08);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 32px;
}

.sidebar.collapsed .sidebar-header {
  justify-content: center;
  padding: 0;
}

.sidebar-title {
  margin-left: 3.9rem;
  font-size: 2rem;
  font-weight: bold;
  color: var(--accent-color);
}

.kino-vip-logo {
  width: 40px;
  height: auto;
}

.toggle-btn {
  background: var(--accent-color);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.toggle-btn:hover {
  background: #d32f2f;
}

.search-icon-collapsed {
  margin-bottom: 20px;
}

.search-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--text-color);
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}

.search-icon-link:hover {
  background: var(--accent-color);
  color: white;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  align-items: center;
}

.sidebar-link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 1.1rem;
  padding: 12px 24px;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
  width: 80%;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

.sidebar.collapsed .sidebar-link {
  width: 60px;
  padding: 12px;
  justify-content: center;
}

.sidebar-link:hover, .active-link {
  background: var(--accent-color);
  color: #fff;
}

.sidebar-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.main-content {
  width: 70vw;
  padding: 1rem 0rem 0 0;
  border-radius: 5px;
  margin-left: 480px;
  flex: 1;
  min-height: 100vh;
  background: var(--primary-bg);
  padding-left: 32px;
  box-sizing: border-box;
  opacity: 95%;
  transition: margin-left 0.3s ease;
}

.main-content.expanded {
  margin-left: 160px;
}
</style>
