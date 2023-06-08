import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Admin {
  @PrimaryGeneratedColumn()
  public adminId: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ select: false })
  public password: string;

  @Column()
  public email: string;

  @Column({ default: false })
  public isActive: boolean;

  @Column({ default: false })
  public isSuperAdmin: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
