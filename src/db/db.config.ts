import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOption: DataSourceOptions = {
  type: 'mysql', // Use 'mysql' for MySQL
  host: '127.0.0.1',
  port: 3306, // Default MySQL port
  username: 'root',
  password: 'admin',
  database: 'ces',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/**/*.migrations{.ts,.js}'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
