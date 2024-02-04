import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { Teacher } from '../teacher/teacher.entity';
import { PublishCourseDto } from './dto/publish-course.dto';
import { Enrollment } from '../enrollment/enrollment.entity';

@Injectable()
export class CourseService {
  constructor(@InjectRepository(Course) private repo: Repository<Course>) {}

  create(courseDto: CreateCourseDto, teacher: Teacher) {
    console.log('Dto ' + courseDto);
    console.log('Teacher ' + teacher);

    const newCourse = new Course();
    newCourse.courseCode = courseDto.courseCode;
    newCourse.courseName = courseDto.courseName;
    newCourse.courseDescription = courseDto.courseDescription;
    newCourse.credit = courseDto.credit;
    newCourse.isPublished = false;
    newCourse.teacher = teacher;

    return this.repo.save(newCourse);
  }

  findCourse(id: number) {
    return this.repo.findOne({
      where: { courseCode: id },
      relations: ['teacher'],
    });
  }

  findIfPublishedCourse(id: number) {
    return this.repo.findOne({
      where: { courseCode: id, isPublished: true },
      relations: ['teacher'],
    });
  }

  async getPublishedCourseAndStudentNotEnrolled(
    enrollments: Enrollment[],
  ): Promise<Course[]> {
    return await this.repo.find({
      where: {
        courseCode: Not(
          In(enrollments.map((enrollment) => enrollment.course.courseCode)),
        ),
        isPublished: true,
      },
      relations: ['teacher'],
    });
  }

  publish(course: Course, publishDto: PublishCourseDto) {
    this.repo.merge(course, publishDto);
    return this.repo.save(course);
  }

  getPublishedCourses() {
    return this.repo.find({
      where: { isPublished: true },
      relations: ['teacher'],
    });
  }
}
