import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Enrollment } from '../enrollment/enrollment.entity';

@Entity()
export class Student {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  level: number;

  @Column({ nullable: true })
  grade: number;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
