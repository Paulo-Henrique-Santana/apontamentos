import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'Usuarios',
  modelName: 'Usuario'
})
export class Usuario extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  nome!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  senha!: string;
}