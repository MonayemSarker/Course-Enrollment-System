import { Course } from "src/course/course.entity";
import { Student } from "src/student/student.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";

@Entity()
export class Enrollment{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: false})
    approved: boolean;

    @Column({default: null})
    batch: string;

    @ManyToOne(() => Student, (student)=> student.enrollments)
    @JoinColumn({ name: "StudentID"})
    student: Student;

    @ManyToOne(() => Course, (course)=> course.enrollments)
    @JoinColumn({ name: "CourseCode"})
    course: Course;

}