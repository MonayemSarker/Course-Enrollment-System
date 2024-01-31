import { PartialType } from '@nestjs/swagger';
import { CreateDemoMigrationDto } from './create-demo-migration.dto';

export class UpdateDemoMigrationDto extends PartialType(CreateDemoMigrationDto) {}
