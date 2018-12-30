import { Repository, BaseEntity } from 'typeorm';

export class CrudService {
  protected repository: Repository<BaseEntity>;

  constructor(repository: Repository<any>) {
    this.repository = repository;
  }

  async getAll() {
    const collection = await this.repository.find();
    return collection;
  }

  async create(data: any) {
    const todo = await this.repository.create(data);
    await this.repository.save(todo);
    return todo;
  }

  async getOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, data: any) {
    await this.repository.update(id, data);
    return await this.repository.findOne(id);
  }

  async destroy(id: number) {
    await this.repository.delete(id);
    return { deleted: true };
  }
}
