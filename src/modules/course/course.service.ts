import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { Teacher } from '../teacher/teacher.entity';
import { PublishCourseDto } from './dto/publish-course.dto';

@Injectable()
export class CourseService {
  constructor(@InjectRepository(Course) private repo: Repository<Course>) {}

  create(courseDto: CreateCourseDto, teacher: Teacher) {
    const newCourse = new Course();
    newCourse.courseCode = courseDto.courseCode;
    newCourse.courseName = courseDto.courseName;
    newCourse.courseDescription = courseDto.courseDescription;
    newCourse.credit = courseDto.credit;
    newCourse.isPublished = false;
    newCourse.teacher = teacher;

    // console.log(newCourse);

    return this.repo.save(newCourse);
  }

  async findCourse(id: number) {
    const course = await this.repo.findOneBy({ courseCode: id });
    console.log(course);

    return course;
  }

  async publish(course: Course, publishDto: PublishCourseDto) {
    await this.repo.merge(course, publishDto);
    return this.repo.save(course);
  }
}
