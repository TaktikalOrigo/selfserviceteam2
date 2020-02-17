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

  @Column("float")
  personalTaxBreakRate!: number;

  @Column("int")
  salary!: number;

  @Column("int")
  otherSalary!: number;

  @Column("float")
  pensionOptionalPercentage!: number;

  @Column("float")
  jobPercentage!: number;

  @Column("float")
  unionPercentage!: number;

  @Column("float")
  pensionPercentage!: number;

  @Column()
  expectedDate!: Date;
}
