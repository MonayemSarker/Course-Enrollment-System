import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AccessTokenGuard } from '../user/guard/accessToken.guard';

@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateTeacher: UpdateTeacherDto,
  ) {
    const updatedTeacher = this.teacherService.update(id, updateTeacher);
    return updatedTeacher;
  }
}
