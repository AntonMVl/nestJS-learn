import { Category } from 'src/category/entities/category.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';

import {
  Column, // Импорт декоратора Column из typeorm для определения колонок таблицы
  CreateDateColumn, // Импорт декоратора CreateDateColumn для автоматического создания поля даты создания
  Entity, // Импорт декоратора Entity для определения класса как сущности базы данных
  OneToMany, // Импорт декоратора OneToMany для определения отношения "один ко многим"
  PrimaryGeneratedColumn, // Импорт декоратора PrimaryGeneratedColumn для определения первичного ключа с автоматической генерацией значения
  UpdateDateColumn, // Импорт декоратора UpdateDateColumn для автоматического создания поля даты обновления
} from 'typeorm';

@Entity() // Декоратор, определяющий класс как сущность базы данных
export class User {
  @PrimaryGeneratedColumn() // Декоратор, указывающий, что это первичный ключ с автоинкрементом
  id: number; // Поле id является уникальным идентификатором пользователя

  @Column() // Декоратор, указывающий, что это колонка таблицы
  email: string; // Поле email для хранения электронной почты пользователя

  @Column() // Декоратор, указывающий, что это колонка таблицы
  password: string; // Поле password для хранения пароля пользователя

  @OneToMany(() => Category, (category) => category.user, {
    // Декоратор, указывающий на отношение "один ко многим" с сущностью Category
    onDelete: 'CASCADE', // Указывает, что при удалении пользователя все его категории также будут удалены
  })
  categories: Category[]; // Поле categories для хранения списка категорий, связанных с пользователем

  @OneToMany(() => Transaction, (transaction) => transaction.user, {
    onDelete: 'CASCADE',
  })
  transactions: Transaction[];

  @CreateDateColumn() // Декоратор, автоматически создающий и обновляющий поле даты создания записи
  createdAt: Date; // Поле createdAt для хранения даты и времени создания записи

  @UpdateDateColumn() // Декоратор, автоматически обновляющий поле даты обновления записи при каждом изменении
  updatedAt: Date; // Поле updatedAt для хранения даты и времени последнего обновления записи
}
