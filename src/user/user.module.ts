import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //Подключили таблицу БД
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
