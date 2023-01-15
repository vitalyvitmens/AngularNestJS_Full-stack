# AngularNestJS_Full-stack

## backend & frontend приложение:

- backend на базе NestJS, в качестве базы данных выступает PostgreSQL,  
  для управления базой используется TypeORM, в качестве языка запроса у backend используется GraphQL.
- frontend на базе Angular.<br/>  
  Все это упаковано в docker-compose!

### Метод установки и запуска:

Скопируйте к себе репозиторий:  
https://github.com/vitalyvitmens/AngularNestJS_Full-stack

### Создайте в корне репозитория .env файл, например:

    API_PORT=3001
    API_HOST=http://localhost:
    TYPEORM_CONNECTION=postgres
    TYPEORM_USERNAME=admin
    TYPEORM_PASSWORD=123456
    TYPEORM_DATABASE=AngularNestJS_Full-stack
    TYPEORM_PORT=5432
    TYPEORM_HOST=localhost

### Команды для Docker:

    docker-compose up
    -d - для запуска в фоне
    --build - для повторной пересборки контейнеров
    docker ps - посмотреть запущенные контейнеры

### Backend:

    cd backend/
    yarn install
    yarn start

### Frontend:

    cd frontend/
    yarn install
    yarn start

## Создать с нуля подобное backend & frontend приложение:

### Устанавливаем NestJS и пакетный менеджер Yarn на комп:

    npm i -g @nestjs/cli
    npm install --global yarn

### Создаём папку с нашим проектом, например AngularNestJS_Full-stack и переходим в нее для создания серверной части приложения (в данном случае это папка backend):

    nest new backend --package-manager=yarn

### Внутри папки backend удаляем скрытую папку git

### Открываем проект в своей среде разработки, например Visual Studio Code и стартуем backend приложение, чтобы проверить его работоспособность на данном этапе:

    cd backend/
    yarn start

В случае успеха, ошибок в терминале не будет, а само приложение можно открыть на http://localhost:3000/<br/>
Чтобы остановить приложение, в терминале нажмите: Ctrl + C

### Настраиваем кофигурацию нашего оборудования, создаём file .env:

    cd ..
    touch .env    //в случае терминала Ubuntu (WSL)
    echo $null >> .env    //в случае терминала powershell

### Заходим в файл .env и прописываем конфигурацию, например:

    API_PORT=3001
    API_HOST=http://localhost:
    TYPEORM_CONNECTION=postgres
    TYPEORM_USERNAME=admin
    TYPEORM_PASSWORD=123456
    TYPEORM_DATABASE=AngularNestJS_Full-stack
    TYPEORM_PORT=5432
    TYPEORM_HOST=localhost

### Добавляем конфигурацию в наше приложение серверной части (backend):

    cd backend/
    yarn add @nestjs/config

### Заходим в файл main.ts создаем переменные: config и port. Примерный код:

    import { ConfigService } from '@nestjs/config';
    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';

    async function bootstrap() {
      const app = await NestFactory.create(AppModule);
      const config = await app.get(ConfigService);
      const port = config.get<number>('API_PORT');
      await app.listen(port || 3000, () => {
        console.log(`App started on port: ${port}`);
      });
    }
    bootstrap();

### Переходим в файл app.module.ts и через imports подключаем ConfigModule:

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),

### Запускаем приложение чтобы убедится, что все работает:

    cd backend/
    nest start --watch

В случае успеха в терминале появится текст:<br/> App started on port: 3001

### Настраиваем базу данных PostgreSQL, которая будет запускаться через Docker:

- в корне проекта создаем файл docker-compose.yml:

  cd ..
  touch docker-compose.yml //в случае терминала Ubuntu (WSL)
  echo $null >> docker-compose.yml //в случае терминала powershell

### Заходим в файл docker-compose.yml и настраиваем его. Примерный код:

    version: '3.8'

    services:
      db:
        container_name: postgres-AngularNestJS_Full-stack
        image: postgres
        restart: always
        environment:
          - POSTGRES_USER=${TYPEORM_USERNAME}
          - POSTGRES_PASSWORD=${TYPEORM_PASSWORD}
          - POSTGRES_DB=${TYPEORM_DATABASE}
        volumes:
          - ./pgdata:/var/lib/postresql/data
        ports:
          - ${TYPEORM_PORT}:${TYPEORM_PORT}
      backend:
        container_name: backend-AngularNestJS_Full-stack
        build:
          context: ./backend
        depends_on:
          - db
        restart: unless-stopped
        ports:
          - '${API_PORT}:3001'
        environment:
          - API_PORT=${API_PORT}
          - API_HOST=${API_HOST}
          - TYPEORM_CONNECTION=${TYPEORM_CONNECTION}
          - TYPEORM_USERNAME=${TYPEORM_USERNAME}
          - TYPEORM_PASSWORD=${TYPEORM_PASSWORD}
          - TYPEORM_DATABASE=${TYPEORM_DATABASE}
          - TYPEORM_PORT=${TYPEORM_PORT}
          - TYPEORM_HOST=db
      frontend:
        container_name: frontend-AngularNestJS_Full-stack
        build:
          context: ./frontend
        depends_on:
          - db
          - backend
        restart: unless-stopped
        ports:
          - '80:80'

### Устанавливаем TypeORM модуль:

    cd backend/
    yarn add @nestjs/typeorm typeorm postgres

### Переходим в файл app.module.ts и через imports подключаем TypeOrmModule:

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'postgres'>('TYPEORM_CONNECTION'),
        host: config.get<string>('TYPEORM_HOST'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        port: config.get<number>('TYPEORM_PORT'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
        dropSchema: true,
      }),
    }),

### Стартуем в фоне файл docker-compose.yml (процесс долгий):

    cd ..
    docker-compose up -d

### Смотрим запущенные контейнеры, которые должны быть в случае удачного запуска файл docker-compose.yml:

    cd ..
    docker ps

В случае успеха в терминале увидим по крайней мере один контейнер запущенный на порту 5432

### Запускаем приложение чтобы убедится, что база данных подключилась:

    cd backend/
    nest start --watch

В случае успеха в терминале увидим query: SELECT \* FROM current_schema() и т.д.

### Устанавливаем GraphQL (если приложение запущено, в начале тормозим его командой в терминале: Ctrl + C):

    cd backend/
    yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express

### Переходим в файл app.module.ts и через imports подключаем GraphQLModule:

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),

### Далее генерируем модуль users (nest автоматически сгенерирует в папке srs папку users и создаст в ней файл users.module.ts):

    cd backend/
    nest g mo users

### Создадаём первую сущность: в папке users создаем папку entities в которой создаем файл user.entity.ts и навешиваем декораторы @ TypeORM & GraphQL. Код имеет следующий вид:

    import {
      Column,
      CreateDateColumn,
      Entity,
      PrimaryGeneratedColumn,
      UpdateDateColumn,
    } from 'typeorm';
    import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

    @ObjectType()
    @Entity('users')
    export class UserEntity {
      @Field(() => ID)
      @PrimaryGeneratedColumn()
      id: number | string;

      @Field()
      @CreateDateColumn()
      createdAt: Date;

      @Field()
      @UpdateDateColumn()
      updatedAt: Date;

      @Field()
      @Column()
      email: string;

      @Field({ nullable: true })
      @Column({ nullable: true })
      name: string;
    }

### Переходим в файл users.module.ts и в импорте указываем набор опций:

    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { UserService } from './services/user/user.service';
    import { UserResolver } from './resolvers/user/user.resolver';
    import { UserEntity } from 'src/users/entities/user.entity';

    @Module({
      imports: [TypeOrmModule.forFeature([UserEntity])],
      providers: [UserService, UserResolver],
    })
    export class UsersModule {}

### В папке users создаем сервис для манипулирования нашими пользователями:

    cd backend/
    nest g s users/services/user

### В папке users создаем папку resolver в которой генерируем файл user.resolver.ts:

    cd backend/
    nest r s users/resolvers/user

user.resolver.ts:
import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';

    describe('UserResolver', () => {
      let resolver: UserResolver;

      beforeEach(async () => {
        const module: TestingModule = await Test.    createTestingModule({
          providers: [UserResolver],
        }).compile();

        resolver = module.get<UserResolver>(UserResolver);
      });

      it('should be defined', () => {
        expect(resolver).toBeDefined();
      });
    });

### В папке users создаем папку inputs в которой создаем два файла:

- create-user.input.ts

  import { Field, InputType } from '@nestjs/graphql';

  @InputType()
  export class CreateUserInput {
  @Field()
  email: string;

      @Field({ nullable: true })
      name: string;

  }

- update-user.input.ts

  import { Field, ID, InputType } from '@nestjs/graphql';

  @InputType()
  export class UpdateUserInput {
  @Field(() => ID)
  id: number;

      @Field({ nullable: true })
      email: string;

      @Field({ nullable: true })
      name: string;

  }

### Открываем файл user.service.ts и наполняем его методами:

    import { Injectable } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { UserEntity } from 'src/users/entities/user.entity';
    import { CreateUserInput } from 'src/users/inputs/create-user.input';
    import { UpdateUserInput } from 'src/users/inputs/update-user.input';
    import { Repository } from 'typeorm';

    @Injectable()
    export class UserService {
      constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
      ) {}

      async createUser(createUserInput: CreateUserInput): Promise<UserEntity> {
        return await this.userRepository.save({ ...createUserInput });
      }

      async getOneUser(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne({
          where: {
            id: id,
          },
        });
      }

      async getAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find();
      }

      async removeUser(id: number): Promise<number> {
        await this.userRepository.delete({ id });
        return id;
      }

      async updateUser(updateUserInput: UpdateUserInput): Promise<UserEntity> {
        await this.userRepository.update(
          { id: updateUserInput.id },
          { ...updateUserInput },
        );
        return await this.getOneUser(updateUserInput.id);
      }
    }

### Пробуем запускаться:

    cd backend/
    docker ps    //проверяем что контейнер запущен иначе docker-compose up -d
    yarn start

В случае успеха в терминале увидим query: CREATE TABLE "users" & App started on port: 3001

### Открываем в браузере две вкладки с адресами:

- http://localhost:3001/
- http://localhost:3001/graphql
