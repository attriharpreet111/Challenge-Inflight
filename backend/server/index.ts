import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import cors from "cors";
import ticketRoutes from "./routes/tickets";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/tickets", ticketRoutes);

async function startServer() {
  const mongod = await MongoMemoryServer.create();
  const mongoUri = mongod.getUri();

  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB Memory Server");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

startServer();
