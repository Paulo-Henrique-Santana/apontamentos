import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password!: string;
}