# AngularNestJS_Full-stack 
backend & frontend приложение:  
- backend на базе NestJS, в качестве базы данных выступает PostgreSQL,   
для управления базой используется TypeORM, в качестве языка запроса у backend используется GraphQL.  
- frontend на базе Angular.<br/>  
Все это упаковано в docker-compose!

# Метод установки и запуска:  
Скопируйте к себе репозиторий:  
https://github.com/vitalyvitmens/AngularNestJS_Full-stack

# Создайте в корне репозитория .env файл, например:  
API_PORT=3001<br/>  
API_HOST=http://localhost:<br/>  
TYPEORM_CONNECTION=postgres<br/>  
TYPEORM_USERNAME=admin<br/>  
TYPEORM_PASSWORD=123456<br/>  
TYPEORM_DATABASE=AngularNestJS_Full-stack<br/>  
TYPEORM_PORT=5432<br/>  
TYPEORM_HOST=localhost<br/> 

# Команды для Docker:  
docker-compose up<br/>  
-d - для запуска в фоне<br/>  
--build - для повторной пересборки контейнеров<br/>  
docker ps - посмотреть запущенные контейнеры<br/>  

# Backend:  
cd backend/<br/>  
yarn install<br/>  
yarn start<br/>  

# Frontend:  
cd frontend/<br/>  
yarn install<br/>  
yarn start<br/>  
