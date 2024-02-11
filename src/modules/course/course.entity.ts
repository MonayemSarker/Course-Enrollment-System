import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Teacher } from '../teacher/teacher.entity';
import { Enrollment } from '../enrollment/enrollment.entity';

@Entity()
export class Course {
  @PrimaryColumn()
  public courseCode: number;

  @Column()
  public courseName: string;

  @Column()
  public courseDescription: string;

  @Column()
  public credit: number;

  @Column({ default: false })
  public isPublished: boolean;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses, { cascade: true })
  @JoinColumn({ name: 'teacherId' })
  public teacher: Teacher;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  public enrollments: Enrollment[];
}
