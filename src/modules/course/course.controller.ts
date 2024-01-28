import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course')
@Controller('courses')
@UseGuards(AccessTokenGuard)
export class CourseController {
  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
  ) {}

  @Post()
  async create(@Body() body: CreateCourseDto, @Req() req: Request) {
    const teacherId = req.user['sub'];
    const teacher = await this.teacherService.findTeacher(parseInt(teacherId));

    const course = await this.courseService.create(body, teacher);
    await this.teacherService.setCourse(course, parseInt(teacherId));
    return course;
  }

  @Patch('publish/:courseId')
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
}
