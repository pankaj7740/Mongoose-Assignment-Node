require('dotenv').config()
import express from 'express';
import { appLoader } from './src/loaders/app';
import { databaseLoader } from './src/loaders/database';
import { router } from './src/routers';
const PORT = Number(process.env.PORT) || 3000;

process.on('uncaughtException', err => {
  console.log(' UNCAUGHT EXCEPTION ');
  console.log('[Inside \'uncaughtException\' event] ' + err.stack || err.message);
});
process.on('unhandledRejection',
  (reason, promise) => {
    console.log(' UNHANDLED REJECTION ');
    console.log('Unhandled Rejection at: ', promise, 'REASON: ', reason);
  });

export const app = express();

// databaseLoader()
//   .then(() => appLoader(app, router))
//   .catch(error => {
//     console.log(error);
//     process.exit(1);
//   });
databaseLoader()
.then(()=>{
    app.use("/api",router);
    app.listen(PORT,()=>{
        console.log(`server is running on the port ${PORT}`);
    })
})
.catch((error:Error)=>{
    console.log(`couldn't connected to database something error; ${error}`);
})

//   connectToDatabase()
// .then(()=>{
//     app.use("/api",productRouter);
//     app.listen(port,()=>{
//         console.log(`server is running on the port ${port}`);
//     })
// })
// .catch((error:Error)=>{
//     console.log(`couldn't connected to database something error; ${error}`);
// })

// declare global {
//   namespace Express {
//     interface Request {
//       user?: any;
//     }
//   }
// }







