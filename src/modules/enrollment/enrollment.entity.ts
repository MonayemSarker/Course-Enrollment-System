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
  public id: number;

  @Column({ default: false })
  public approved: boolean;

  @Column({ default: null })
  public batch: string;

  @ManyToOne(() => Student, (student) => student.enrollments)
  @JoinColumn({ name: 'StudentID' })
  public student: Student;

  @ManyToOne(() => Course, (course) => course.enrollments)
  @JoinColumn({ name: 'CourseCode' })
  public course: Course;
}
