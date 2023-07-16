import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
//import fileupload from "express-fileupload";
import bodyParser from "body-parser";
import { Server } from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


import connectDB from "./mongodb/connect.js";
import userRouter from './routes/user.routes.js'
import recipeRouter from './routes/recipe.routes.js';
import reviewRouter from './routes/review.routes.js';
import errorHandler from './middleware/errorMiddleware.js';
import path from "path";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
connectDB();

const app = express();

// Increase the payload size limit to 10MB (for example)
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use('/photos', express.static(path.join(__dirname, 'photos')));
//app.use(fileupload());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with the URL of your React app
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/recipes', recipeRouter);
app.use('/api/v1/review', reviewRouter);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
    //app.get('/', (req, res) => {res.send("user"); });
}
  
app.use(errorHandler);

var http = Server(app);
var io = require('socket.io')(http);
io.on('connection', () =>{
    console.log('a user is connected')
   })

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
