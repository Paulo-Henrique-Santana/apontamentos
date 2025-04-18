import cors from 'cors';
import express from 'express';
import { env } from 'process';
import "./database/connection";
import routes from './routes/routes';

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));


app.use(express.json());

app.use('/api', routes);

app.listen(env.PORT, () => {
  console.log('API rodando na porta ' + env.PORT)
});