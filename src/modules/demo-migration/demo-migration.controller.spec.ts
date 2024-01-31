import { Test, TestingModule } from '@nestjs/testing';
import { DemoMigrationController } from './demo-migration.controller';
import { DemoMigrationService } from './demo-migration.service';

describe('DemoMigrationController', () => {
  let controller: DemoMigrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemoMigrationController],
      providers: [DemoMigrationService],
    }).compile();

    controller = module.get<DemoMigrationController>(DemoMigrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
