import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { TimeEntrie } from "./TimeEntrie";

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

  @HasMany(() => TimeEntrie)
  timeEntries?: TimeEntrie[];
}
