import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Project } from './Project';
import { User } from './User';

@Table({
  tableName: 'TimeEntries',
  modelName: 'TimeEntry'
})
export class TimeEntry extends Model {
  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  date!: string;

  @Column({
    type: DataType.DECIMAL(3, 1),
    allowNull: false,
  })
  hours!: number;

  @Column({
    type: DataType.TEXT,
  })
  observations?: string;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idProject!: number;

  @BelongsTo(() => Project)
  project!: Project;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idUser!: number;

  @BelongsTo(() => User)
  user!: User;
}