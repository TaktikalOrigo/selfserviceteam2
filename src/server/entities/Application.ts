import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Person } from "~/server/entities/Person";
import { ApplicationTime } from "~/server/entities/ApplicationTime";

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(
    () => Person,
    person => person.applications,
  )
  person!: Person;

  @OneToMany(
    () => ApplicationTime,
    applicationTime => applicationTime.application,
    {
      cascade: true,
    },
  )
  applicationTimes!: ApplicationTime[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  personalTaxBreakRate!: number;

  @Column()
  salary!: number;

  @Column()
  otherSalary!: number;

  @Column()
  pensionOptionalPercentage!: number;

  @Column()
  jobPercentage!: number;

  @Column()
  unionPercentage!: number;

  @Column()
  pensionPercentage!: number;

  @Column()
  expectedDate!: Date;
}
