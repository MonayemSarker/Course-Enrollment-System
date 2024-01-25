import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Course } from '../course/course.entity';

@Entity()
export class Teacher {
  @PrimaryColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column({ nullable: true })
  public phone: string;

  @Column({ nullable: true })
  public designation: string;

  @Column({ nullable: true })
  public specialization: string;

  @OneToMany(() => Course, (course) => course.teacher)
  public courses: Course[];
}
