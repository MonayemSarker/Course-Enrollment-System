import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { AccessTokenGuard } from '../user/guard/accessToken.guard';
import { Request } from 'express';
import { TeacherService } from '../teacher/teacher.service';
import { PublishCourseDto } from './dto/publish-course.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EnrollmentService } from '../enrollment/enrollment.service';

@ApiTags('Course')
@Controller('courses')
@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
export class CourseController {
  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
    private enrollmentService: EnrollmentService,
  ) {}

  @Post()
  async create(@Body() body: CreateCourseDto, @Req() req: Request) {
    const teacherId = req.user['sub'];
    // console.log('token id ' + teacherId);
    console.log(body);

    const teacher = await this.teacherService.findTeacher(parseInt(teacherId));

    const course = await this.courseService.create(body, teacher);
    await this.teacherService.setCourse(course, parseInt(teacherId));
    return course;
  }

  @Put('publish/:courseId')
  async publish(
    @Param('courseId', ParseIntPipe) id: number,
    @Body() body: PublishCourseDto,
    @Req() req: Request,
  ) {
    if (req.user['type'] !== 'Teacher') {
      throw new UnauthorizedException('User is not a Teacher');
    }
    const course = await this.courseService.findCourse(id);
    // console.log(course.teacher.id);

    if (course.teacher.id != req.user['sub']) {
      throw new UnauthorizedException('This teacher has no Permission to Edit');
    }
    await this.courseService.publish(course, body);
    return course;
  }

  @Get('published')
  async getPublishedCourses(@Req() req: Request) {
    if (req.user['type'] == 'Student') {
      const courses = await this.courseService.getPublishedCourses();
      if (courses.length == 0) {
        return [];
      }
      return courses;
    } else {
      throw new BadRequestException('User is not a student');
    }
  }

  @Get('published-not-enrolled')
  async getPublishedNotEnrolledCourses(@Req() req: Request) {
    if (req.user['type'] == 'Student') {
      const enrollments = await this.enrollmentService.getStudentEnrollments(
        parseInt(req.user['sub']),
      );
      if (enrollments.length == 0) {
        return [];
      }
      const courses =
        await this.courseService.getPublishedCourseAndStudentNotEnrolled(
          enrollments,
        );
      if (courses.length == 0) {
        return [];
      }
      return courses;
    } else {
      throw new BadRequestException('User is not a student');
    }
  }
}
