import { Module } from '@nestjs/common';
import { DemoMigrationService } from './demo-migration.service';
import { DemoMigrationController } from './demo-migration.controller';

@Module({
  controllers: [DemoMigrationController],
  providers: [DemoMigrationService],
})
export class DemoMigrationModule {}
