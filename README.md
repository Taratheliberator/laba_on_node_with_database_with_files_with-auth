
# Product Server with PostgreSQL Database

Этот проект представляет собой сервер для управления товарами и категориями, используя Express и Sequelize для взаимодействия с базой данных PostgreSQL.

## Установка и настройка

### Требования

- Node.js и npm
- PostgreSQL
- Postman (для тестирования API)

### Установка

1. Клонируйте репозиторий и перейдите в папку проекта:

   ```bash
   git clone <URL репозитория>
   cd product-server-baza-dannih
   ```

2. Установите необходимые пакеты:

   ```bash
   npm install
   ```

3. Настройте подключение к базе данных PostgreSQL. В файле `config/database.js` замените параметры на свои:

   ```javascript
   const sequelize = new Sequelize('product_db', 'postgres', 'postgres', {
     host: 'localhost',
     dialect: 'postgres',
     logging: false
   });
   ```

   Замените `product_db`, `postgres`, и `postgres` на название вашей базы данных, имя пользователя и пароль.

4. Создайте базу данных `product_db` в PostgreSQL:

   ```sql
   CREATE DATABASE product_db;
   ```

## Запуск проекта

1. Запустите сервер:

   ```bash
   node app.js
   ```

2. Сервер будет доступен по адресу [http://localhost:3000](http://localhost:3000).

## Использование API

### Маршруты для категорий

- **GET /categories** - Получение всех категорий.
- **POST /categories** - Создание новой категории.

#### Пример запроса для создания категории

URL: `http://localhost:3000/categories`  
Метод: `POST`  
Тело запроса (JSON):

```json
{
  "name": "Электроника"
}
```

### Маршруты для товаров

- **GET /products** - Получение всех товаров.
- **POST /products** - Создание нового товара.

#### Пример запроса для создания товара

URL: `http://localhost:3000/products`  
Метод: `POST`  
Тело запроса (JSON):

```json
{
  "name": "Телефон",
  "price": 500,
  "categoryId": 1
}
```

## Структура проекта

```
project-folder
├── config
│   └── database.js         # Настройки подключения к базе данных
├── controllers
│   ├── categoryController.js # Контроллер для категорий
│   └── productController.js  # Контроллер для товаров
├── models
│   ├── Category.js         # Модель Category
│   └── Product.js          # Модель Product
├── routes
│   ├── categoryRoutes.js   # Маршруты для категорий
│   └── productRoutes.js    # Маршруты для товаров
└── app.js                  # Основной файл приложения
```

## Примечания

- Убедитесь, что у вас установлены и запущены PostgreSQL и pgAdmin для управления базой данных.
- Вы можете проверять записи в таблицах через pgAdmin, перейдя к вашей базе данных `product_db` и открыв таблицы `Product` и `Category`.

## Лицензия

Этот проект не лицензирован. Используйте его по своему усмотрению.
