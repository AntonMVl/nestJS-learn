import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    //Подключение модулей приложения
    UserModule,
    CategoryModule,
    AuthModule,
    TransactionModule,
    //Модуль загружает переменные окружения из файла конфигурации (например, .env). Параметр isGlobal: true указывает, что ConfigModule будет доступен глобально, и его не нужно импортировать в каждом модуле отдельно.
    ConfigModule.forRoot({ isGlobal: true }),
    //Блок кода настраивает подключение к базе данных с использованием TypeOrmModule. Настройка выполняется асинхронно с использованием метода forRootAsync, который позволяет загружать параметры конфигурации динамически
    TypeOrmModule.forRootAsync({
      // imports: [ConfigModule] обеспечивает доступ к ConfigService для получения значений переменных окружения
      imports: [ConfigModule],
      //Функция useFactory получает ConfigService через инъекцию зависимостей и использует его для получения параметров подключения к базе данных из переменных окружения (DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME). Настройки подключения включают тип базы данных (type: 'postgres'), хост, порт, имя пользователя, пароль и имя базы данных.
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        //synchronize: true - параметр указывает TypeORM автоматически синхронизировать схему базы данных с моделями. Это полезно для разработки
        synchronize: true,
        // entities указывает путь к файлам сущностей, которые используются в приложении
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
      // inject: [ConfigService] обеспечивает инъекцию ConfigService в фабричную функцию для доступа к переменным окружения
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
