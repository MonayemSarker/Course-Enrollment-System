import { IsBoolean } from 'class-validator';

export class PublishCourseDto {
  @IsBoolean()
  isPublished: boolean;
}
