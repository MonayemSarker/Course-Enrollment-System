import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Enrollment } from '../enrollment/enrollment.entity';

@Entity()
export class Student {
  @PrimaryColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column({ nullable: true })
  public phone: string;

  @Column({ nullable: true })
  public level: number;

  @Column({ nullable: true })
  public grade: number;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  public enrollments: Enrollment[];
}
