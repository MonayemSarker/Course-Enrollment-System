import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthTeacherService } from './auth-teacher.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.startegy';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]), PassportModule],
  controllers: [TeacherController],
  providers: [TeacherService, AuthTeacherService, LocalStrategy],
})
export class TeacherModule {}
