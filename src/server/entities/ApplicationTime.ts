import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Column,
  ManyToOne,
} from "typeorm";
import { Application } from "~/server/entities/Application";

@Entity()
export class ApplicationTime extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @ManyToOne(
    () => Application,
    application => application.applicationTimes,
  )
  application!: Application;
}
