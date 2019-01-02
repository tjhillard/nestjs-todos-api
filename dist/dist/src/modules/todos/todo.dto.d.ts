export declare class TodoCreateDto {
    description: string;
}
export declare class TodoUpdateDto {
    description?: string;
    completed?: boolean;
}
export declare class TodoResponseObject {
    id: number;
    description: string;
    completed: boolean;
    'created_at': Date;
    'updated_at': Date;
}
