import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AccessTokenGuard } from '../user/guard/accessToken.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Teacher')
@ApiBearerAuth()
@UseGuards(AccessTokenGuard)
@Controller('teachers')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateTeacher: UpdateTeacherDto,
  ) {
    return this.teacherService.update(id, updateTeacher);
  }

  @Get('experiment')
  experiment(@Req() req: Request) {
    return this.teacherService.experiment(parseInt(req.user['sub']));
  }

  @Get('courses')
  async teacherCourses(@Req() req: Request) {
    return this.teacherService.findTeacherCourses(parseInt(req.user['sub']));
  }
}
