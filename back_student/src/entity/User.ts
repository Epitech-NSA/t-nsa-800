import { compareSync, hashSync } from 'bcryptjs';
import { IsNotEmpty, Length } from 'class-validator';
import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 20 })
  @Length(4, 20)
  public username: string;

  @Column()
  @Exclude()
  @Length(4, 100)
  public password: string;

  @Column()
  @IsNotEmpty()
  public role: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  public hashPassword(): void {
    this.password = hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
    return compareSync(unencryptedPassword, this.password);
  }
}
