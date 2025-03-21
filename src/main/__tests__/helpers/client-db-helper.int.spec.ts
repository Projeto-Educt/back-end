import { ClientDb as sut } from '@/main/helpers/client-db-helper';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

describe('Prisma Helper', () => {
  afterAll(async () => {
    await sut.disconnect();
  });

  it('Should reconnect if Prisma down', async () => {
    prisma = await sut.getClient();
    expect(prisma).toBeInstanceOf(PrismaClient);

    await sut.disconnect();
    prisma = await sut.getClient();
    expect(prisma).toBeInstanceOf(PrismaClient);
  });
});
