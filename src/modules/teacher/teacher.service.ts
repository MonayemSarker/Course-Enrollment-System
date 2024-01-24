import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Course } from '../course/course.entity';

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
      throw new NotFoundException('No Teacher found with id ' + { id });
    }
    await this.repo.merge(existingTeacher, updateTeacher);
    return this.repo.save(existingTeacher);
  }

  async findTeacher(id: number) {
    const teacher = await this.repo.findOneBy({ id: id });
    return teacher;
  }

  async setCourse(course: Course, id: number) {
    const teacher = await this.repo.findOne({
      where: { id: id },
      relations: ['courses'],
    });
    if (!teacher) {
      throw new NotFoundException('No Teacher found with id' + { id });
    }
    teacher.courses = teacher.courses || [];
    teacher.courses.push(course);
    console.log(teacher);

    return this.repo.save(teacher);
  }
}
