import { PrismaClient } from '@prisma/client';

export let prismaInstance: PrismaClient;

const prismaClientSingleton = () => {
    return new PrismaClient({
        datasources: {
            db: {
                url: process.env.POSTGRES_PRISMA_URL,
            },
        },
    });
};

declare global {
    var prismaGlobal: PrismaClient | undefined;
}

if (process.env.NODE_ENV !== 'production') {
    if (!globalThis.prismaGlobal) {
        globalThis.prismaGlobal = prismaClientSingleton();
    }
    prismaInstance = globalThis.prismaGlobal;
} else {
    prismaInstance = prismaClientSingleton();
}
