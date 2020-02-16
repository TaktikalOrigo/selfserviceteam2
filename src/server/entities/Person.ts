import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Application } from "~/server/entities/Application";

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  ssn!: string;

  @Column()
  address!: string;

  @Column()
  spouseSsn!: string;

  @Column()
  spouseName!: string;

  @OneToMany(
    () => Application,
    application => application.person,
    {
      cascade: true,
    },
  )
  applications!: Application[];
}
