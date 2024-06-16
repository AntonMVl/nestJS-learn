import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2'; // Импорт библиотеки argon2 для хеширования паролей
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable() // Декоратор, указывающий, что этот класс может быть внедрен в другие классы как зависимость
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>, // Внедрение репозитория User через конструктор
  ) {}

  // Асинхронный метод для создания нового пользователя
  async create(createUserDto: CreateUserDto) {
    // Поиск пользователя с таким же email в базе данных
    const existUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    // Если пользователь с таким email уже существует, выбросить исключение BadRequestException
    if (existUser) throw new BadRequestException('This email already exist');

    // Создание нового пользователя с хешированным паролем и сохранение его в базе данных
    const user = await this.userRepository.save({
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password), // Хеширование пароля с использованием argon2
    });

    // Возврат созданного пользователя
    return { user };
  }

  // findOne(id: number) {
  //   return `This action returns all user`;
  // }
}
