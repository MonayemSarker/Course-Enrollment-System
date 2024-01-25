import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    nullable: false,
  })
  public name: string;

  @Column({
    unique: true,
    nullable: false,
  })
  public email: string;

  @Column({
    nullable: false,
  })
  public password: string;

  @Column({
    nullable: false,
  })
  public userType: string;

  @Column({
    nullable: true,
    default: null,
  })
  public refreshToken: string;
}
