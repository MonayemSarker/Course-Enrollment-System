import { Test, TestingModule } from '@nestjs/testing';
import { DemoMigrationService } from './demo-migration.service';

describe('DemoMigrationService', () => {
  let service: DemoMigrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DemoMigrationService],
    }).compile();

    service = module.get<DemoMigrationService>(DemoMigrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
