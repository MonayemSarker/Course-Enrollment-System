import { Injectable } from '@nestjs/common';
import { CreateDemoMigrationDto } from './dto/create-demo-migration.dto';
import { UpdateDemoMigrationDto } from './dto/update-demo-migration.dto';

@Injectable()
export class DemoMigrationService {
  create(createDemoMigrationDto: CreateDemoMigrationDto) {
    return 'This action adds a new demoMigration';
  }

  findAll() {
    return `This action returns all demoMigration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} demoMigration`;
  }

  update(id: number, updateDemoMigrationDto: UpdateDemoMigrationDto) {
    return `This action updates a #${id} demoMigration`;
  }

  remove(id: number) {
    return `This action removes a #${id} demoMigration`;
  }
}
