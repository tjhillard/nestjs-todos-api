import 'dotenv/config';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserResponseObject } from './user.dto';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @CreateDateColumn()
  'created_at': Date;

  @UpdateDateColumn()
  'updated_at': Date;

  @Column({ default: false })
  deleted: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  serialize(options: any = { includeToken: false }) {
    const { id, email, token, created_at, updated_at } = this;
    const serializedUser: UserResponseObject = { id, email, created_at, updated_at };
    if (options.includeToken) { serializedUser.token = token; }
    return serializedUser;
  }

  async comparePassword(given: string) {
    return await bcrypt.compare(given, this.password);
  }

  private get token() {
    const { id, email } = this;
    return jwt.sign(
      { id, email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );
  }
}
