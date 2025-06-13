import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { TimeEntry } from "./TimeEntry";

@Table({
  tableName: "Projects",
  modelName: "Project",
})
export class Project extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @HasMany(() => TimeEntry)
  timeEntries?: TimeEntry[];
}
