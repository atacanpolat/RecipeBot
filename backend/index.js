import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import fileupload from "express-fileupload";
import bodyParser from "body-parser";
import { Server } from 'http';


import connectDB from "./mongodb/connect.js";
import userRouter from './routes/user.routes.js'
import recipeRouter from './routes/recipe.routes.js';
import errorHandler from './middleware/errorMiddleware.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get("/", (req, res) => {
    res.send({ message: "hello world" });
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/recipes', recipeRouter);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    /*app.get('/', (req, res) => res.send('Please set to production'));*/
    app.get('/', (req, res) => {res.send("user"); });
  }
  
//  app.use(errorHandler);
var http = Server(app);
var io = require('socket.io')(http);
io.on('connection', () =>{
    console.log('a user is connected')
   })

  app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
