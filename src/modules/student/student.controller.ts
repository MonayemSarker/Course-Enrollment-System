import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AccessTokenGuard } from '../user/guard/accessToken.guard';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateStudent: UpdateStudentDto,
  ) {
    // console.log(updateStudent);

    const updatedStudent = this.studentService.update(id, updateStudent);
    return updatedStudent;
  }
}
