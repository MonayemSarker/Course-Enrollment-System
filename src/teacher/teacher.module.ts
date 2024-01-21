import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTeacherService } from './auth-teacher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [TeacherService, AuthTeacherService]
})
export class TeacherModule {}
