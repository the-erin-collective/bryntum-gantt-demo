import fastify from "fastify"
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors'

const prisma = new PrismaClient();
const server = fastify()

server.get("/", function (request, reply) {
        reply.send({ hello: "world" })
    })
  
server.register(cors, { 
        origin: '*'
    })
  
server.get('/dependencies', async (_req: any, _res: any) => {
        const dependencies = await prisma.dependency.findMany();
        return dependencies;
    });
  
server.get('/tasks', async (_req: any, _res: any) => {
        const tasks = await prisma.task.findMany();
        return tasks;
    });

server.get('/resources', async (_req: any, _res: any) => {
        const resources = await prisma.resource.findMany();
        return resources;
    });

server.get('/resourceAssignments', async (_req: any, _res: any) => {
        const resourceAssignments = await prisma.resourceAssignment.findMany();
        return resourceAssignments;
    });
      
server.listen({ port: 8181, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})