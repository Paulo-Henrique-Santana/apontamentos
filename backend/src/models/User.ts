import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { TimeEntrie } from './TimeEntrie';

@Table({
  tableName: 'Users',
  modelName: 'User'
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;

  @HasMany(() => TimeEntrie)
  timeEntries?: TimeEntrie[];
}