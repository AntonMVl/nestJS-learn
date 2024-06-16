import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user') // Декоратор, определяющий, что этот класс является контроллером, который будет обрабатывать запросы по пути '/user'
export class UserController {
  constructor(private readonly userService: UserService) {} // Конструктор, в который внедряется UserService для работы с пользователями

  @Post() // Декоратор, указывающий, что этот метод будет обрабатывать POST-запросы
  @UsePipes(new ValidationPipe()) // Декоратор для применения ValidationPipe к этому методу, чтобы валидировать данные перед их обработкой
  create(@Body() createUserDto: CreateUserDto) {
    // Декоратор Body извлекает тело запроса и автоматически маппит его на объект CreateUserDto
    return this.userService.create(createUserDto); // Вызов метода create сервиса UserService для создания нового пользователя
  }

  // @Get()
  // findOne() {
  //   return this.userService.findOne();
  // }
}
