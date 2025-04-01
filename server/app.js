import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

const port = process.env.PORT_NUMBER;
const app = express();

import { connection, database } from "./database.js";
import setupCollections from "./collections.js";

let server;
connection
  .then(() => setupCollections(database))
  .then(() => {
    console.log("Success: Connected to database!");
    server = app.listen(port, () => console.log(`Listening on port ${port}.`));
  });

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/', router);