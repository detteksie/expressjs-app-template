import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import e, { ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import createHttpError from 'http-errors';
import morgan from 'morgan';
import path from 'path';
import { router } from './router';
import { errorJson } from './utils/response';

const app = e();

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'pug');

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(e.json());
app.use(e.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(e.static(path.join(__dirname, '..', 'public')));

app.use('/', router);

// catch 404 and forward to error handler
app.use(async (_, __, next) => {
  next(createHttpError(404));
});

// error handler
app.use((async (err, req, res, next) => {
  // set locals, only providing error in development
  // const error = [
  //   {
  //     name: err.name,
  //     msg: err.message,
  //     ...(req.app.get('env') === 'development' ? { stack: err.stack, err } : {}),
  //   },
  // ];
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.locals.err = error;
  res.locals.err = errorJson(req, err);

  // render the error page
  res.status(err.status || 500);
  next();
}) as ErrorRequestHandler);
app.use((_, res) => {
  res.json(res.locals.err);
});

export default app;
