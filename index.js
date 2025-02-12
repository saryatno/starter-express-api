import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
//import serverless from "serverless-http";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30MB", extended: true}));
app.use(bodyParser.urlencoded({limit: "30MB", extended: true}));
app.use(cors());

const PORT = process.env.PORT || 5000;

try{
    await mongoose.connect(process.env.CONNECTION_URL).then(() => app.listen(PORT, () => console.log('Server running on port : ' + PORT  )));
}catch(error){
    console.log(error);
}


app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.get('/', (req, res) => {
    res.send('hello world')
  });

//module.exports.handlers = serverless(app);
//await mongoose.connect(CONNECTION_URL)
//    .then(() => app.listen(PORT, () => console.log('Server running on port : ${PORT}' )))
//    .catch((error) => console.log(error.massage));
//,{useNewUrlParser: true, useUnifiedTopology: true}
//mongoose.set(useFindAndModify, false);
//mongoose.set('strictQuery', true);
