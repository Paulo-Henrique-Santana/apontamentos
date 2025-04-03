import express from 'express';
import { env } from 'process';
import "./database/connection";
import routes from './routes';

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );
  next();
});

app.use(express.json());

app.use(routes);

app.listen(env.PORT, () => {
  console.log('API rodando na porta ' + env.PORT)
});