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

// server.post('/api', async function (req: any, res: any) {
//         let requestId:any = '';
//         let lastKey: any = '';
//         let err: any = null;
      
//         const taskUpdates: any[] = [];
//         const dependencyUpdates: any[] = [];
//         const tasksRemoved: any[] = [];
//         const dependenciesRemoved: any[] = [];
      
//         console.log(
//           `\n${req.method} ${req.url} --> ${JSON.stringify(req.body, `\t`, 2)}`
//         );
      
//         for (const [key, value] of Object.entries<{ [key: string]: any }>(req.body)) {
//           if (key === 'requestId') {
//             requestId = value;
//           }
      
//           if (key === 'tasks') {
//             for (const [changeType, changeValues] of Object.entries<{ [key: string]: Array<any> }>(value)) {
//               if (changeType === 'added') {
                
//                 changeValues.forEach((addObj: any) => taskUpdates.push(addObj));
//                 const val = await createOperation(changeValues[0], 'tasks');
//                 lastKey = val.msg;
//                 err = val.error;
//               }
//               if (changeType === 'updated') {
//                 console.log(`updated tasks...`, changeValues);
//                 changeValues.forEach((updateObj: any) => taskUpdates.push(updateObj));
//                 const val = await updateOperation(changeValues, 'tasks');
//                 lastKey = val.msg;
//                 err = val.error;
//               }
//             }
//           }
      
//           if (key === 'dependencies') {
//             for (const [changeType, changeValues] of Object.entries(value)) {
//               if (changeType === 'added') {
//                 changeValues[0].id = uuid.v4();
//                 changeValues.forEach((addObj: any) => dependencyUpdates.push(addObj));
//                 const val = await createOperation(changeValues[0], 'dependencies');
//                 lastKey = val.msg;
//                 err = val.error;
//               }
      
//               if (changeType === 'updated') {
//                 changeValues.forEach((updateObj: any) => dependencyUpdates.push(updateObj));
//                 const val = await updateOperation(changeValues, 'dependencies');
//                 lastKey = val.msg;
//                 err = val.error;
//               }
      
//               if (changeType === 'removed') {
//                 dependenciesRemoved.push(changeValues[0]);
//                 const val = await deleteOperation(changeValues[0].id, 'dependencies');
//                 lastKey = val.msg;
//                 err = val.error;
//               }
//             }
//           }
//         }
      
//         sendResponse(
//           res,
//           lastKey,
//           requestId,
//           err,
//           taskUpdates,
//           dependencyUpdates,
//           tasksRemoved,
//           dependenciesRemoved
//         );
//       });

// server.get('/data', async (req, res) => {
//         try {
//           const results = await Promise.all([
//             db.query('SELECT * FROM tasks'),
//             db.query('SELECT * FROM dependencies'),
//           ]);
      
//           const tasks = results[0][0],
//             dependencies = results[1][0];
      
//           res.send({
//             success: true,
//             tasks: {
//               rows: tasks,
//             },
//             dependencies: {
//               rows: dependencies,
//             },
//           });
//         } catch (error) {
//           sendResponse(res, 'error', null, error, [], [], [], []);
//         }
//       });
      
server.listen({ port: 8181, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})

// async function createOperation(addObj: any, table: string) {
//     const valArr: any = [];
//     const keyArr: any = [];
//     for (const [key, value] of Object.entries(addObj)) {
//       if (
//         key !== 'baselines' &&
//         key !== 'from' &&
//         key !== 'to' &&
//         key !== '$PhantomId' &&
//         key !== 'segments' &&
//         key !== 'ignoreResourceCalendar'
//       ) {
//         keyArr.push(`\`${key}\``);
//         valArr.push(value);
//       }
//     }
  
//     try {
//       await db.query(
//         `INSERT INTO ${table} (${keyArr.join(', ')}) VALUES (${Array(
//           keyArr.length
//         )
//           .fill('?')
//           .join(',')})`,
//         valArr
//       );
//       return { msg: 'added', error: null };
//     } catch (error) {
//       return { msg: 'error', error };
//     }
//   }
  

//   async function updateOperation(updates, table) {
//     try {
//       await Promise.all(
//         updates.map(({ id, ...update }) => {
//           return db.query(
//             `
//             UPDATE ${table}
//             SET ${Object.keys(update)
//               .map((key) => `${key} = ?`)
//               .join(', ')}
//             WHERE id = ?
//             `,
//             Object.values(update).concat(id)
//           );
//         })
//       );
//       return { msg: 'update', error: null };
//     } catch (error) {
//       return { msg: 'error', error };
//     }
//   }
  
//   async function deleteOperation(id, table) {
//     try {
//       await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
//       return { msg: 'deleted', error: null };
//     } catch (error) {
//       return { msg: 'error', error: error };
//     }
//   }
  

//   function sendResponse(
//     res: any,
//     action: string,
//     requestId: string,
//     error: any,
//     taskUpdates: any[],
//     dependencyUpdates: any[],
//     tasksRemoved: any[],
//     dependenciesRemoved: any[]
//   ) {
//     if (action === 'error') console.log(error);
  
//     const result: any = {
//       success: action === 'error' ? false : true,
//     };
//     if (requestId !== undefined && requestId !== null)
//       result.requestId = requestId;
  
//     // updated tasks
//     result.tasks = {};
//     result.tasks.rows = [];
  
//     if (taskUpdates.length) {
//       result.tasks.rows = [...result.tasks.rows, ...taskUpdates];
//     }
  
//     // deleted tasks
//     result.tasks.removed = [];
  
//     if (tasksRemoved.length) {
//       result.tasks.removed = [...result.tasks.removed, ...tasksRemoved];
//     }
  
//     // updated dependencies
//     result.dependencies = {};
//     result.dependencies.rows = [];
  
//     if (dependencyUpdates.length) {
//       result.dependencies.rows = [
//         ...result.dependencies.rows,
//         ...dependencyUpdates,
//       ];
//     }
  
//     // deleted dependencies
//     result.dependencies.removed = [];
  
//     if (dependenciesRemoved.length) {
//       result.dependencies.removed = [
//         ...result.dependencies.removed,
//         ...dependenciesRemoved,
//       ];
//     }
  
//     res.send(result);
//   }
  
  