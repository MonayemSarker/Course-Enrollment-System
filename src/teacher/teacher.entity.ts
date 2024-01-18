import { Course } from "src/course/course.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from "typeorm";


@Entity()
export class Teacher{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column({default: "Teacher"})
    userType: string;

    @Column()
    designation: string;

    @Column()
    specialization: string;

    @OneToMany(() => Course, (course) => course.teacher)
    courses: Course[];
}