import { Enrollment } from "src/enrollment/enrollment.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";

@Entity()
export class Student{
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

    @Column({ default: "Student"})
    userType: string;

    @Column()
    level: number;

    @Column()
    grade: number;

    @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
    enrollments: Enrollment[];

}