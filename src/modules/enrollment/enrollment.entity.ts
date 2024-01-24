import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Course } from '../course/course.entity';
import { Student } from '../student/student.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean;

  @Column({ default: null })
  batch: string;

  @ManyToOne(() => Student, (student) => student.enrollments)
  @JoinColumn({ name: 'StudentID' })
  student: Student;

  @ManyToOne(() => Course, (course) => course.enrollments)
  @JoinColumn({ name: 'CourseCode' })
  course: Course;
}
