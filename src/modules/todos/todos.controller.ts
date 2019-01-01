import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, HttpCode, UseGuards } from '@nestjs/common';

import { BaseValidationPipe } from 'src/shared/pipes/base-validation.pipe';

import { AuthGuard } from 'src/shared/guards/auth.guard';
import { TodosService } from './todos.service';
import { TodoCreateDto, TodoUpdateDto, TodoResponseObject } from './todo.dto';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { TodosPolicy } from './todos.policy';

@Controller('todos')
@UseGuards(new AuthGuard(), new RolesGuard(TodosPolicy))
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
  ) { }

  @Get()
  index(): Promise<TodoResponseObject[]> {
    return this.todosService.getAll();
  }

  @Get(':id')
  show(@Param('id') id: number): Promise<TodoResponseObject> {
    return this.todosService.getOne(id);
  }

  @Post()
  @UsePipes(new BaseValidationPipe())
  create(@Body() data: TodoCreateDto): Promise<TodoResponseObject> {
    return this.todosService.create(data);
  }

  @Put(':id')
  @UsePipes(new BaseValidationPipe())
  update(@Param('id') id: number, @Body() data: TodoUpdateDto): Promise<TodoResponseObject> {
    return this.todosService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  destroy(@Param('id') id: number): Promise<void> {
    return this.todosService.softDelete(id);
  }
}
