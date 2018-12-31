import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, HttpCode } from '@nestjs/common';

import { BaseValidationPipe } from '../shared/pipes/base-validation.pipe';

import { TodosService } from './todos.service';
import { TodoCreateDto, TodoUpdateDto, TodoResponseObject } from './todo.dto';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
  ) { }

  @Get()
  getAllTodos(): Promise<TodoResponseObject[]> {
    return this.todosService.getAll();
  }

  @Get(':id')
  getTodo(@Param('id') id: number): Promise<TodoResponseObject> {
    return this.todosService.getOne(id);
  }

  @Post()
  @UsePipes(new BaseValidationPipe())
  createTodo(@Body() data: TodoCreateDto): Promise<TodoResponseObject> {
    return this.todosService.create(data);
  }

  @Put(':id')
  @UsePipes(new BaseValidationPipe())
  updateTodo(@Param('id') id: number, @Body() data: TodoUpdateDto): Promise<TodoResponseObject> {
    return this.todosService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  destroyTodo(@Param('id') id: number): Promise<void> {
    return this.todosService.softDelete(id);
  }
}
