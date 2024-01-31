import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Brackets, EntityManager, Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Course } from '../course/course.entity';
import dataSource from 'src/db/db.config';
import { Enrollment } from '../enrollment/enrollment.entity';

@Injectable()
export class TeacherService {
  constructor(@InjectRepository(Teacher) private repo: Repository<Teacher>) {}

  async create(teacher: CreateTeacherDto) {
    const newTeacher = await this.repo.create(teacher);
    return this.repo.save(newTeacher);
  }

  async update(id: number, updateTeacher: UpdateTeacherDto) {
    const existingTeacher = await this.repo.findOneBy({ id: id });
    if (!existingTeacher) {
      throw new UnauthorizedException('No Teacher found with id ' + { id });
    }
    this.repo.merge(existingTeacher, updateTeacher);
    return this.repo.save(existingTeacher);
  }

  findTeacher(id: number) {
    return this.repo.findOneBy({ id: id });
  }

  async setCourse(course: Course, id: number) {
    const teacher = await this.repo.findOne({
      where: { id: id },
      relations: ['courses'],
    });
    if (!teacher) {
      throw new UnauthorizedException('No Teacher found with id' + { id });
    }
    teacher.courses = teacher.courses || [];
    teacher.courses.push(course);
    // console.log(teacher);

    return this.repo.save(teacher);
  }

  async findTeacherCourses(id: number): Promise<Course[]> {
    const teacher = await this.repo.findOne({
      where: { id: id },
      relations: ['courses'],
    });
    if (!teacher) {
      throw new NotFoundException('No Teacher found with id' + { id });
    }
    return teacher.courses;
  }

  async experiment(id: number) {
    // console.log(id);
    await dataSource.initialize();

    const teacher = await dataSource
      .getRepository(Teacher)
      .createQueryBuilder('teacher') // alias
      .where('teacher.id = :id', { id: id })
      .getOne();

    // console.log('Q1:---' + teacher);

    //another way
    const teacher2 = await dataSource
      .createQueryBuilder()
      .select('teacher')
      .from(Teacher, 'teacher')
      .where('teacher.id = :id', { id: id })
      .getMany();
    // console.log('Q2:---' + teacher2);

    //another way
    const teacher3 = await dataSource.manager
      .createQueryBuilder(Teacher, 'user')
      .where('user.id = :id', { id: id })
      .getOne();

    // console.log('Q3:---' + teacher3);

    //realations
    const courses = await dataSource
      .createQueryBuilder()
      .relation(Teacher, 'courses')
      .of(id)
      .loadMany();

    // console.log('Q4:---' + courses);

    //getOneOrFail
    const teacher4 = await dataSource
      .getRepository(Teacher)
      .createQueryBuilder('teacher')
      .where('teacher.id = :id', { id: 7 })
      .getOneOrFail();

    // console.log('Q5:---' + teacher4);

    //count groupby having
    const countCourse = await dataSource
      .getRepository(Course)
      .createQueryBuilder('courses')
      .select('COUNT(courses.courseCode)', 'Total courses')
      .groupBy('courses.teacherId')
      .having('courses.teacherId = :teacherId', { teacherId: 7 })
      .getRawMany();

    // console.log('Q6:---' + countCourse);

    // using brackets
    const course = await dataSource
      .createQueryBuilder(Enrollment, 'e')
      .where('e.approved = :approved', { approved: false })
      .andWhere(
        new Brackets((qb) => {
          qb.where('e.batch = :batch1', { batch1: 'A' }).orWhere(
            'e.courseCode = :code',
            { code: 123 },
          );
        }),
      )
      // .offset(5)
      // .limit(10)
      .getMany();

    const teacherCourse = await dataSource
      .createQueryBuilder(Teacher, 't')
      .innerJoinAndSelect('t.courses', 'courses') //auto ON
      // .where('t.id = course.teacherId')
      .getMany();

    const courseTeacher = await dataSource
      .createQueryBuilder(Course, 'c')
      .leftJoinAndSelect('c.teacher', 't')
      // .where('c.teacherId = t.id')
      .getMany();

    await dataSource.destroy();
    return courseTeacher;
  }
}
