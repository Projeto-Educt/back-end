import { PrismaClient } from '@prisma/client';

export class ClientDb extends PrismaClient {
  private static client: PrismaClient | null = null;

  private static async connect(): Promise<void> {
    if (!this.client) {
      this.client = new PrismaClient();
      await this.client.$connect();
    }
  }

  static async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.$disconnect();
      this.client = null;
    }
  }

  static async getClient(): Promise<PrismaClient> {
    if (!this.client) {
      await this.connect();
    }

    return this.client as PrismaClient;
  }
}
