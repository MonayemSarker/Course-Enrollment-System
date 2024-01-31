import { AbstractEntity } from 'src/common/entity/abstractEntity.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class DemoMigration extends AbstractEntity<DemoMigration> {
  @Column()
  name: string;
}
