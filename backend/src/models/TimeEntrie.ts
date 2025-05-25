import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Project } from './Project';
import { User } from './User';

@Table({
  tableName: 'TimeEntries',
  modelName: 'TimeEntrie'
})
export class TimeEntrie extends Model {
  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  date!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hours!: string;

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