# Bot Project

Этот проект представляет собой бота, который можно развернуть на Google Cloud Run.

## Предварительные требования

1. **Google Cloud SDK (gcloud CLI)**
   - Установите [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
   - Выполните аутентификацию: `gcloud auth login`

2. **Docker**
   - Установите [Docker](https://docs.docker.com/get-docker/)

3. **Google Cloud Project**
   - Создайте проект в [Google Cloud Console](https://console.cloud.google.com/)
   - Запомните ID проекта

## Настройка проекта

### 1. Инициализация gcloud

```bash
# Установите проект по умолчанию
gcloud config set project YOUR_PROJECT_ID

# Включите необходимые API
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```bash
# Скопируйте пример конфигурации
cp .env.example .env

# Отредактируйте файл .env с вашими настройками
nano .env
```

### 3. Создание Dockerfile

Убедитесь, что у вас есть `Dockerfile` в корне проекта:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["python", "main.py"]
```

## Локальная разработка

### Запуск локально

```bash
# Установите зависимости
pip install -r requirements.txt

# Запустите приложение
python main.py
```

### Тестирование с Docker

```bash
# Соберите образ
docker build -t bot-app .

# Запустите контейнер
docker run -p 8080:8080 bot-app
```

## Деплой на Google Cloud Run

### 1. Сборка и деплой через gcloud

```bash
# Соберите и разверните в одном командой
gcloud run deploy bot-service --source . --platform managed --region us-central1 --allow-unauthenticated --set-env-vars "ENV=production"
```

### 2. Альтернативный способ через Cloud Build

```bash
# Соберите образ в Container Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/bot-app

# Разверните на Cloud Run
gcloud run deploy bot-service \
  --image gcr.io/YOUR_PROJECT_ID/bot-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### 3. Настройка переменных окружения

```bash
# Установите переменные окружения
gcloud run services update bot-service \
  --region us-central1 \
  --set-env-vars "KEY1=VALUE1,KEY2=VALUE2"
```

### 4. Настройка секретов (рекомендуется)

```bash
# Создайте секрет
echo -n "your-secret-value" | gcloud secrets create bot-secret --data-file=-

# Обновите сервис с секретом
gcloud run services update bot-service \
  --region us-central1 \
  --set-secrets "SECRET_KEY=bot-secret:latest"
```

## Управление развертыванием

### Просмотр информации о сервисе

```bash
# Получите URL сервиса
gcloud run services describe bot-service --region us-central1

# Просмотрите логи
gcloud logs read --service=bot-service --limit=50
```

### Обновление сервиса

```bash
# Обновите код и переразверните
gcloud run deploy bot-service \
  --source . \
  --platform managed \
  --region us-central1
```

### Масштабирование

```bash
# Установите минимальное количество экземпляров
gcloud run services update bot-service \
  --region us-central1 \
  --min-instances 1

# Установите максимальное количество экземпляров
gcloud run services update bot-service \
  --region us-central1 \
  --max-instances 10
```

## Мониторинг и логирование

### Просмотр метрик

```bash
# Откройте Cloud Monitoring
gcloud monitoring dashboards list

# Просмотрите метрики сервиса
gcloud monitoring metrics list --filter="resource.type=cloud_run_revision"
```

### Настройка алертов

```bash
# Создайте политику алертов
gcloud alpha monitoring policies create --policy-from-file=alert-policy.yaml
```

## Удаление

```bash
# Удалите сервис
gcloud run services delete bot-service --region us-central1

# Удалите образ (если использовали Container Registry)
gcloud container images delete gcr.io/YOUR_PROJECT_ID/bot-app --force-delete-tags
```

## Полезные команды

```bash
# Просмотр всех сервисов
gcloud run services list

# Просмотр конфигурации
gcloud config list

# Переключение между проектами
gcloud config set project NEW_PROJECT_ID

# Просмотр доступных регионов
gcloud compute regions list
```

## Troubleshooting

### Частые проблемы

1. **Ошибка аутентификации**
   ```bash
   gcloud auth login
   gcloud auth application-default login
   ```

2. **Недостаточно прав**
   ```bash
   # Убедитесь, что у вас есть роль Cloud Run Admin
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="user:your-email@gmail.com" \
     --role="roles/run.admin"
   ```

3. **Проблемы с Docker**
   ```bash
   # Проверьте Docker
   docker --version
   docker ps
   ```

## Дополнительные ресурсы

- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [gcloud CLI Reference](https://cloud.google.com/sdk/gcloud/reference)
- [Cloud Run Best Practices](https://cloud.google.com/run/docs/best-practices)
