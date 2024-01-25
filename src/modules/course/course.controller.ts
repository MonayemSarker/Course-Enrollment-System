import {
  Body,
  Controller,
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
import { Transaction } from 'typeorm';

@ApiTags('Course')
@Controller('courses')
export class CourseController {
  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() body: CreateCourseDto, @Req() req: Request) {
    const teacherId = req.user['sub'];
    const teacher = await this.teacherService.findTeacher(parseInt(teacherId));

    const course = await this.courseService.create(body, teacher);
    await this.teacherService.setCourse(course, parseInt(teacherId));
    return course;
  }

  @UseGuards(AccessTokenGuard)
  @Patch('publish/:courseId')
  async publish(
    @Param('courseId', ParseIntPipe) id: number,
    @Body() body: PublishCourseDto,
    @Req() req: Request,
  ) {
    const teacherId = req.user['sub'];
    const teacher = await this.teacherService.findTeacher(parseInt(teacherId));

    const course = await this.courseService.findCourse(id);
    // console.log(course.teacher.id);

    if (course.teacher.id != teacher.id) {
      throw new UnauthorizedException('This teacher Has No Permission to Edit');
    }
    await this.courseService.publish(course, body);
  }
}
