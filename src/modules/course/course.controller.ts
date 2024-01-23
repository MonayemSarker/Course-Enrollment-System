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

@Controller('course')
export class CourseController {
  constructor(
    private courseService: CourseService,
    private teacherService: TeacherService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post('create')
  async create(@Body() body: CreateCourseDto, @Req() req: Request) {
    const teacherId = req.user['sub'];
    const teacher = await this.teacherService.findTeacher(parseInt(teacherId));
    // console.log(teacher);

    const course = await this.courseService.create(body, teacher);
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
    console.log(course);

    if (course[teacherId] != teacher.id) {
      throw new UnauthorizedException('Teacher Has No Permission to Edit');
    }
    await this.courseService.publish(course, body);
  }
}
