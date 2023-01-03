import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const Owner = prismaClient.owner;
const Car = prismaClient.car;

export { Owner, Car };
