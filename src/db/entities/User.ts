import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserGenderENUM {
  male = 'male',
  female = 'female',
}

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  public userId: number;

  @Column({ nullable: true })
  public firstName: string;

  @Column({ nullable: true })
  public lastName: string;

  @Column({ select: false })
  public password: string;

  @Column()
  public email: string;

  @Column({ default: false })
  public isActive: boolean;

  @Column({ type: 'date', nullable: true, select: true })
  public dateOfBirth: string | null;

  @Column({ type: 'varchar', nullable: true })
  public gender: UserGenderENUM | null;

  @Column({ type: 'varchar', nullable: false, select: false })
  public phone: string;
}
