import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class PublishCourseDto {
  @ApiProperty()
  @IsBoolean()
  isPublished: boolean;
}
