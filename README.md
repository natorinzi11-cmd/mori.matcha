# 🍃 MORI MATCHA

> More than a drink. It's a moment.

Третий проект — уютный лендинг японского matcha-кафе. Переписано и прокачано с 0 в современный сайт 2026 года.

### 🌸 Что было исправлено
- Починена сломанная HTML-структура (было 6 незакрытых секций, footer оборачивал booking)
- Папка `images` была файлом — теперь настоящая папка с картинками
- Добавлен `script.js` (раньше подключался, но файла не было)
- Полный респонсив для телефона

### ✨ Новые фишки, которые добавил

1. **🛒 Интерактивная корзина**
   - Добавление напитков, изменение количества, подсчет total
   - Сохранение в localStorage, drawer с анимацией

2. **📱 Мобильное меню + Sticky header**
   - Бургер с анимацией, blur-эффект шапки при скролле
   - Активный пункт меню подсвечивается

3. **🎨 Анимации**
   - Loader с листиком
   - Scroll reveal (IntersectionObserver)
   - Float-анимация hero-блока и параллакс на мышку
   - Hover эффекты у карточек

4. **🍓 Фильтр меню**
   - Кнопки All / Classic / Fruity / Seasonal — фильтр без перезагрузки

5. **📅 Рабочая бронь**
   - Валидация (имя, email, дата не в прошлом)
   - Сохранение в localStorage, toast-уведомления

6. **💬 Тост-система, отзывы, story-секция**
   - Красивые уведомления, cozy секция с историей бренда

### 🛠 Стек
- Чистый HTML / CSS / JS (без фреймворков — идеально для обучения)
- CSS переменные, grid, flex, backdrop-filter
- Google Fonts: Poppins + Noto Serif JP

### 🚀 Как запустить
Просто открой `index.html` в браузере. Или задеплой на GitHub Pages:

```bash
git add .
git commit -m "feat: Mori Matcha v2 - cart, filters, booking, responsive"
git push origin arena/019f9344-mori-matcha
```

Затем в настройках репо → Pages → Branch: `arena/019f9344-mori-matcha` / root.

### 📸 Структура
```
/index.html
/style.css
/script.js
/images/
  hero-matcha.png
  strawberry-matcha.png
  coconut-matcha.png
  story-bg.png
```

Дальше можно добавить:
- Темную тему
- Оплату Stripe
- Админку для брони
- Next.js версию

Made with 🍃 in Tokyo 2026
