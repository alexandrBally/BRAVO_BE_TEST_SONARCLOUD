import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import Section from './Section';

@Entity()
export default class Sport {
  @PrimaryGeneratedColumn()
  public sportId: number;

  @Column({ nullable: true })
  public name: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToOne(() => Section, (sport) => sport.sectionSport)
  public section: Section;
}
