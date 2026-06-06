import mssql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: mssql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, 
    trustServerCertificate: true, 
    instanceName: process.env.DB_INSTANCE 
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

export async function getConnection(): Promise<mssql.ConnectionPool> {
  try {
    const pool = await mssql.connect(dbConfig);
    return pool;
  } catch (error) {
    console.error('Error al conectar a SQL Server:', error);
    throw error;
  }
}

export { mssql };