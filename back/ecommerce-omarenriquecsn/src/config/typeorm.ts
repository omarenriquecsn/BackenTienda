import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenvConfig({ path: '.env.development' });

const config = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  autoLoadEntities: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  port: process.env.DB_PORT as unknown as number,
  synchronize: true,
  // dropSchema: true,
  // logging: true,
};

export default registerAs('typeorm', () => config);

export const conetionSource = new DataSource(config as DataSourceOptions);

const inicialize = async (): Promise<void> => {
  await conetionSource.initialize();
};

void inicialize();
