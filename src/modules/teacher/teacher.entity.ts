import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Course } from '../course/course.entity';

@Entity()
export class Teacher {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  specialization: string;

  @OneToMany(() => Course, (course) => course.teacher, { cascade: ['insert'] })
  courses: Course[];
}
