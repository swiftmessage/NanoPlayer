# 🎬 NanoPlayer

> Лёгкий HTML5-видеоплеер на чистом JavaScript — без зависимостей и без встроенных native controls.

[![npm](https://img.shields.io/npm/v/nanoplayer?style=flat-square&logo=npm)](https://www.npmjs.com/package/nanoplayer)
[![license](https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square)](./LICENSE)
[![Vite](https://img.shields.io/badge/build-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?style=flat-square&logo=javascript&logoColor=111)](https://developer.mozilla.org/docs/Web/JavaScript)

**NanoPlayer** — компактный кастомный видеоплеер для веб-приложений. Он строится поверх обычного HTML5 `<video>`, но предоставляет собственный UI в стиле современных видеоплееров.

---

## ✨ Возможности

- ▶️ Play / Pause
- 🖼️ Poster или автоматический кадр из видео
- 📈 Полоса прогресса и перемотка кликом
- 🔊 Громкость и ползунок громкости
- ⚙️ Выбор скорости воспроизведения
- ℹ️ Информационное меню
- ⛶ Полноэкранный режим
- ⌨️ Управление клавиатурой
- 🎨 Полностью кастомный интерфейс без native controls
- 📦 Без runtime-зависимостей
- 🌐 UMD и ES Module сборки

---

## 🚀 Установка

### npm

```bash
npm install nanoplayer
```

### CDN

#### UMD

```html
<link rel="stylesheet" href="https://unpkg.com/nanoplayer@latest/dist/nanoplayer.css">
<script src="https://unpkg.com/nanoplayer@latest/dist/nanoplayer.umd.js"></script>
```

#### ES Module

```html
<link rel="stylesheet" href="https://unpkg.com/nanoplayer@latest/dist/nanoplayer.css">

<script type="module">
  import NanoPlayer from 'https://unpkg.com/nanoplayer@latest/dist/nanoplayer.es.js'
</script>
```

Можно использовать и jsDelivr:

```text
https://cdn.jsdelivr.net/npm/nanoplayer@latest/dist/nanoplayer.umd.js
https://cdn.jsdelivr.net/npm/nanoplayer@latest/dist/nanoplayer.es.js
https://cdn.jsdelivr.net/npm/nanoplayer@latest/dist/nanoplayer.css
```

---

## ⚡ Быстрый старт

Создайте контейнер:

```html
<div id="player"></div>
```

Подключите стили и UMD-сборку:

```html
<link rel="stylesheet" href="dist/nanoplayer.css">
<script src="dist/nanoplayer.umd.js"></script>
```

Инициализируйте плеер:

```html
<script>
  new NanoPlayer('#player', {
    src: 'video.mp4',
    poster: 'poster.jpg',
    name: 'Моё видео'
  })
</script>
```

### ES Modules

```js
import NanoPlayer from 'nanoplayer'
import 'nanoplayer/dist/nanoplayer.css'

new NanoPlayer('#player', {
  src: 'video.mp4'
})
```

> Для ES-модулей используйте HTTP/HTTPS-сервер. Запуск через `file://` не подходит для браузерных module imports.

---

## ⚙️ Параметры

Плеер создаётся так:

```js
new NanoPlayer(selector, options)
```

Доступные параметры:

| Параметр | Тип | По умолчанию | Описание |
|---|---|---:|---|
| `src` | `string` | `''` | URL или путь к видео |
| `name` | `string` | `''` | Название видео для информационного меню |
| `poster` | `string \| null` | `null` | Изображение-превью |
| `autoplay` | `boolean` | `false` | Автоматически начать воспроизведение |
| `volume` | `number` | `1` | Начальная громкость от `0` до `1` |
| `playbackRates` | `number[]` | `[0.5, 1, 1.5, 2]` | Доступные скорости |

Пример с настройками:

```js
new NanoPlayer('#player', {
  src: 'video.mp4',
  poster: 'poster.jpg',
  name: 'Demo',
  autoplay: false,
  volume: 0.8,
  playbackRates: [0.5, 1, 1.25, 1.5, 2]
})
```

---

## ⌨️ Управление с клавиатуры

| Клавиша | Действие |
|---|---|
| `Space` | Play / Pause |
| `Esc` | Выход из полноэкранного режима |

Пробел не перехватывается внутри `input`, `textarea` и `select`.

---

## 🎨 Стилизация

Все классы плеера используют префикс `nano-`, поэтому NanoPlayer не должен конфликтовать с большинством стилей вашего приложения.

Например:

```css
.nano-player {
  max-width: 900px;
  margin: 0 auto;
}

.nano-controls {
  /* кастомизация панели управления */
}
```

Можно:

- переопределять отдельные CSS-классы;
- создавать собственные темы;
- полностью заменять таблицу стилей;
- встраивать плеер в собственный дизайн.

---

## 🧩 Архитектура

NanoPlayer использует обычный HTML5 `<video>` и поверх него создаёт собственный интерфейс:

```text
nano-player
├── video
├── overlay
│   ├── big play
│   └── info overlay
└── controls
    ├── left
    │   ├── play
    │   └── time
    ├── center
    │   └── progress
    └── right
        ├── volume
        ├── settings
        ├── info
        └── fullscreen
```

Каждое дополнительное меню реализовано как отдельный popover.

---

## 📁 Структура проекта

```text
NanoPlayer/
├── src/
│   ├── NanoPlayer.js   # основная логика плеера
│   ├── index.js        # публичный entry point
│   └── style.css       # стили UI
├── dist/
│   ├── nanoplayer.es.js
│   ├── nanoplayer.umd.js
│   └── nanoplayer.css
├── test/
│   └── demo.html       # демонстрационная страница
├── package.json
├── vite.config.js
├── LICENSE
└── README.md
```

---

## 🛠️ Разработка

Установите зависимости:

```bash
npm install
```

Соберите библиотеку:

```bash
npm run build
```

После сборки артефакты появляются в директории `dist/`.

---

## 🌐 Демо

В репозитории есть простая демонстрационная страница:

**[`test/demo.html`](./test/demo.html)**

Она показывает базовую инициализацию NanoPlayer через CDN.

---

## 📦 Форматы сборки

Vite собирает библиотеку в двух форматах:

- **ES Module** — `dist/nanoplayer.es.js`
- **UMD** — `dist/nanoplayer.umd.js`

Стили поставляются отдельно:

- **CSS** — `dist/nanoplayer.css`

---

## 📝 Лицензия

Проект распространяется по лицензии **Apache License 2.0**.

Полный текст лицензии находится в файле [LICENSE](./LICENSE).

---

## 👨‍💻 Автор

**SWIFTMESSAGE**

- 🌐 [swiftmessage.org](https://swiftmessage.org)
- 💻 [GitHub](https://github.com/swiftmessage)

---

<p align="center">
  Сделано для тех, кому нужен простой кастомный HTML5-плеер без лишних зависимостей.
</p>
