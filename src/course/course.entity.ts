import { Enrollment } from "src/enrollment/enrollment.entity";
import { Teacher } from "src/teacher/teacher.entity";
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from "typeorm";


@Entity()
export class Course{
    @PrimaryColumn()
    courseCode: number;

    @Column()
    courseName: string;

    @Column()
    courseDescription: string;

    @Column()
    credit: number;

    @Column({default: false})
    isPublished: boolean;

    @ManyToOne( () => Teacher, (teacher) => teacher.courses)
    teacher: Teacher;

    @OneToMany( () => Enrollment, (enrollment) => enrollment.course )
    enrollments: Enrollment[]

}