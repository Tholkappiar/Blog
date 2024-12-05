import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

let prisma: PrismaClient | null = null;
export const getPrismaClient = (databaseUrl: string) => {
    if (!prisma) {
        if (!databaseUrl) {
            throw new Error(
                "Database URL is required to create a Prisma client."
            );
        }
        //@ts-ignore
        prisma = new PrismaClient({
            datasourceUrl: databaseUrl,
        }).$extends(withAccelerate());
    }
    return prisma;
};
