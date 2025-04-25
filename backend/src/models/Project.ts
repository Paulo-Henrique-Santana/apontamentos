import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'Projects',
  modelName: 'Project'
})
export class Project extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;
}