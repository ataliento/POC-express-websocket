import express, { Express, Request, Response } from 'express';
import morgan from "morgan";
import dotenv from "dotenv";

import { Server as SocketServer } from "socket.io";
import http from "http"

import cors from "cors";

dotenv.config();

const app: Express = express();
const server = http.createServer(app);

const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

app.use(cors()); // cors config
app.use(morgan("dev")); // logger of petitions

// home
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('<div  style="text-align: center;">Express + TypeScript Server</div>');
});

// socket connection
io.on('connection', (socket) => {
  // listening event "message"
  socket.on("message", (message: string) => {
    // emit event to all conections
    socket.broadcast.emit("message", message)
  })
});

server.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${process.env.PORT}`);
});
