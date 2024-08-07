# FastAPI Project Documentation

Добро пожаловать в документацию проекта FastAPI. Этот проект предназначен для управления пользователями и ботами, а также для интеграции с различными сервисами, такими как Telegram. 

## Описание проекта

Проект FastAPI предоставляет API для управления пользователями, ботами и их взаимодействием. Это включает в себя регистрацию и авторизацию пользователей, создание и управление ботами, а также интеграцию с внешними сервисами через вебхуки.

## Цели проекта

Основные цели проекта включают:
- Обеспечение безопасной и надежной системы управления пользователями.
- Предоставление гибких возможностей для создания и управления ботами.
- Обеспечение простой и интуитивно понятной интеграции с внешними сервисами.

## Основные функции

- **Регистрация и авторизация пользователей**: Возможность создания новых учетных записей и входа в систему.
- **Управление ботами**: Создание, обновление и получение информации о ботах.
- **Интеграция с внешними сервисами**: Поддержка вебхуков для интеграции с Telegram.

## Структура API

### Пользовательский модуль
- **POST /user/register**: Регистрация нового пользователя.
- **POST /user/login**: Авторизация пользователя.
- **GET /user/protected**: Получение информации о текущем пользователе.

### Модуль управления ботами
- **POST /bot/create**: Создание нового бота.
- **PATCH /bot/update/{bot_id}**: Обновление информации о боте.
- **GET /bot/get/{bot_id}**: Получение информации о боте по ID.
- **POST /bot/profile**: Создание профиля для пользователя.

### Интеграция с Telegram
- **POST /integration/tg/enable-wh**: Включение вебхука для Telegram.
- **POST /integration/tg/disable-wh**: Отключение вебхука для Telegram.

## Использование приложения

### Регистрация пользователя
Отправьте POST запрос на `/user/register` с параметрами:
<!-- tabs:start -->
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```
<!-- tabs:end -->