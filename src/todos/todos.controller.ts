import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes } from '@nestjs/common';

import { TodosService } from './todos.service';
import { TodoCreateDto, TodoUpdateDto } from './todo.dto';
import { BaseValidationPipe } from 'src/shared/base-validation.pipe';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
  ) {}

  @Get()
  getAllTodos() {
    return this.todosService.getAll();
  }

  @Get(':id')
  getTodo(@Param('id') id: number) {
    return this.todosService.getOne(id);
  }

  @Post()
  @UsePipes(new BaseValidationPipe())
  createTodo(@Body() data: TodoCreateDto) {
    return this.todosService.create(data);
  }

  @Put(':id')
  @UsePipes(new BaseValidationPipe())
  updateTodo(@Param('id') id: number, @Body() data: TodoUpdateDto) {
    return this.todosService.update(id, data);
  }

  @Delete('id')
  destroyTodo(@Param('id') id: number) {
    return this.todosService.destroy(id);
  }
}
