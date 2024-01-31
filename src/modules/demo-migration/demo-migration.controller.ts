import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DemoMigrationService } from './demo-migration.service';
import { CreateDemoMigrationDto } from './dto/create-demo-migration.dto';
import { UpdateDemoMigrationDto } from './dto/update-demo-migration.dto';

@Controller('demo-migration')
export class DemoMigrationController {
  constructor(private readonly demoMigrationService: DemoMigrationService) {}

  @Post()
  create(@Body() createDemoMigrationDto: CreateDemoMigrationDto) {
    return this.demoMigrationService.create(createDemoMigrationDto);
  }

  @Get()
  findAll() {
    return this.demoMigrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.demoMigrationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDemoMigrationDto: UpdateDemoMigrationDto) {
    return this.demoMigrationService.update(+id, updateDemoMigrationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.demoMigrationService.remove(+id);
  }
}
