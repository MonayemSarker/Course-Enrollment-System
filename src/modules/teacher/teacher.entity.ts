import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  designation: string;

  @Column({ nullable: true })
  specialization: string;

  //   @OneToMany(() => Course, (course) => course.teacher)
  //     courses: Course[]
}
