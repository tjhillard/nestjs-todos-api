import { Repository } from 'typeorm';
export declare class CrudService {
    protected repository: any;
    constructor(repository: Repository<any>);
    getAll(whereConditions?: any): Promise<any[]>;
    create(data: any): Promise<any>;
    getOne(id: number): Promise<any>;
    update(id: number, data: any): Promise<any>;
    softDelete(id: number): Promise<any>;
    destroy(id: number): Promise<any>;
    private getSerializedEntity;
}
