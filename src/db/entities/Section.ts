import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Sport from './Sport';

@Entity()
export default class Section {
  @PrimaryGeneratedColumn()
  public sectionId: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public eventDate: Date;

  @Column()
  public address: string;

  @Column()
  public image: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToOne(() => Sport, (sport) => sport.section)
  @JoinColumn()
  public sectionSport: Sport;
}
