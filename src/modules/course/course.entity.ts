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
  courseCode: number;

  @Column()
  courseName: string;

  @Column()
  courseDescription: string;

  @Column()
  credit: number;

  @Column({ default: false })
  isPublished: boolean;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}
