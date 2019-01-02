import { HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../decorators/user.decorator';
import { UserEntity } from 'src/modules/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * Offers base CRUD functionality for any service class inherits it
 * @example class CatsService extends CrudService {}
 */
export class CrudService {
  protected repository: any;

  constructor(
    repository: Repository<any>,
  ) {
    this.repository = repository;
  }

  async getAll(whereConditions: any = {}): Promise<any[]> {
    const where = {
      deleted: false,
      ...whereConditions,
    };
    const collection = await this.repository.find({ where });
    return collection.map(entity => this.getSerializedEntity(entity));
  }

  async create(data: any): Promise<any> {
    const item = await this.repository.create({ ...data });
    await this.repository.save(item);
    return item;
  }

  async getOne(id: number): Promise<any> {
    return await this.repository.findOneOrFail({ where: { id, deleted: false } });
  }

  async update(id: number, data: any): Promise<any> {
    await this.repository.findOneOrFail({ where: { id, deleted: false } });
    await this.repository.update(id, data);
    return await this.repository.findOne(id);
  }

  async softDelete(id: number): Promise<any> {
    await this.repository.findOneOrFail({ where: { id } });
    await this.update(id, { deleted: true });
    return;
  }

  async destroy(id: number): Promise<any> {
    await this.repository.findOneOrFail({ where: { id } });
    await this.repository.delete(id);
    return;
  }

  private getSerializedEntity(entity: any) {
    return entity.serialize ? entity.serialize() : entity;
  }
}
