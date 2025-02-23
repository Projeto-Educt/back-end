import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';
import { execSync } from 'child_process';
import NodeEnvironment from 'jest-environment-node';
import { Client } from 'pg';
import { DATABASE_ENV } from './env';

const baseUrl = DATABASE_ENV.dbUrl;

class CustomEnvironment extends NodeEnvironment {
  private readonly _schema: string | null = null;
  private readonly _connectionString: string | undefined = undefined;

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);
    const randomString = Math.random().toString().substring(2, 10);
    this._schema = `code_schema_${randomString}`;
    this._connectionString = `${baseUrl}?schema=${this._schema}`;
  }

  override async setup(): Promise<void> {
    process.env.DATABASE_URL = this._connectionString;
    this.global.process.env.DATABASE_URL = this._connectionString;

    const client = new Client({
      connectionString: this._connectionString,
    });
    await client.connect();
    await client.query(`CREATE SCHEMA IF NOT EXISTS "${this._schema}"`);
    execSync(`npx prisma migrate deploy`);
    await client.end();
  }

  override async teardown(): Promise<void> {
    const client = new Client({
      connectionString: this._connectionString,
    });
    await client.connect();
    await client.query(`DROP SCHEMA IF EXISTS "${this._schema}" CASCADE`);
    await client.end();
  }
}

export default CustomEnvironment;
