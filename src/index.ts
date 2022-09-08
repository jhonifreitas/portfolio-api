import express from 'express';
import 'express-async-errors';
import { errorHandler } from '@middlewares/error-handler';

import cors from 'cors';
import dotenv from 'dotenv';
import nocache from 'nocache';
import admin from 'firebase-admin';

import routes from '@routes/index';

dotenv.config();
admin.initializeApp();

const app = express();
const port = process.env.PORT || 4444;

app.disable('x-powered-by');

app.use(nocache());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`API Iniciada: ouvindo na porta ${port}`);
});
