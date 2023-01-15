# AngularNestJS_Full-stack 
backend & frontend приложение:
- backend на базе NestJS, в качестве базы данных выступает PostgreSQL, 
для управления базой используется TypeORM, в качестве языка запроса у backend используется GraphQL. 
- frontend на базе Angular.
Все это упаковано в docker-compose!

# Метод установки и запуска:

Скопируйте к себе репозиторий: 
https://github.com/vitalyvitmens/AngularNestJS_Full-stack

# Создайте в корне репозитория .env файл, например:

API_PORT=3001
API_HOST=http://localhost:

TYPEORM_CONNECTION=postgres
TYPEORM_USERNAME=admin
TYPEORM_PASSWORD=123456
TYPEORM_DATABASE=AngularNestJS_Full-stack
TYPEORM_PORT=5432
TYPEORM_HOST=localhost

# Команды для Docker:
docker-compose up
-d - для запуска в фоне
--build - для повторной пересборки контейнеров
docker ps - посмотреть запущенные контейнеры

Backend:
cd backend/
yarn install
yarn start

Frontend:
cd frontend/
yarn install
yarn start
