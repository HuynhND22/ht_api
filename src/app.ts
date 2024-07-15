import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import path from 'path';
import http from 'http';

import { AppDataSource } from './data-source';
import categoriesRouter from './routes/categories';
import userRouter from './routes/users';
import uploadRouter from './routes/upload';
import postsRouter from './routes/posts';
import booksRouter from './routes/books';
import authRouter from './routes/authentications';
import bodyParser from 'body-parser';
import { Server, Socket } from 'socket.io';


const app: Express = express();

AppDataSource.initialize().then(async () => {
  console.log('Data source was initialized');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.resolve('./public')));

  // use cors
  app.use(cors({ origin: '*' }));

  // app.use(express.json());
  // app.use(express.urlencoded());

  // app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());



  app.use('/categories', categoriesRouter);
  app.use('/auth', authRouter); 
  app.use('/uploads', uploadRouter); 
  app.use('/users', userRouter);
  app.use('/posts', postsRouter);
  app.use('/books', booksRouter);

  // catch 404 and forward to error handler
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.status(404).send('Not found');
    // next(createError(404));
  });

  // error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
});

// export function initSocketIO(httpServer: http.Server) {
//   const io = new Server(httpServer, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"]
//     }
//   });

//   io.on('connection', (socket: Socket) => {
//     console.log('A user connected');
    
//     socket.on('message', (message) => {
//       console.log('Received message:', message);
//       io.emit('message', message);
//     });

//     socket.on('disconnect', () => {
//       console.log('A user disconnected');
//     });
//   });

//   return io;
// }

export default app;
