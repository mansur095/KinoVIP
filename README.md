# KinoVIP

KinoVIP — это приложение для поиска и просмотра информации о фильмах и сериалах с использованием API Кинопоиска.

## Возможности
- Поиск фильмов и сериалов
- Просмотр подробной информации о фильме/сериале
- Поиск по ключевым словам

## Установка и запуск

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/your-username/KinoVIP.git
   cd KinoVIP
   ```
2. **Установите зависимости:**
   ```bash
   npm install
   ```
3. **Создайте файл `.env` в корне проекта и добавьте ваш API ключ:**
   ```env
   VITE_API_KEY=ВАШ_API_КЛЮЧ
   ```
4. **Запустите проект:**
   ```bash
   npm run dev
   ```

## Структура проекта
- `src/components` — компоненты интерфейса
- `src/views` — основные страницы приложения
- `src/stores` — хранилище состояния (Pinia)
- `src/config` — конфигурация API
- `src/router` — маршрутизация

## Важно
- Для работы приложения необходим API ключ от [Кинопоиска](https://www.kinopoisk.dev/).

---
Автор: [mansur]

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
