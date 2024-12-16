import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { Ticket } from "../models/Ticket";
import ticketsRouter from "../routes/tickets";

const app = express();
app.use(express.json());
app.use("/tickets", ticketsRouter);

beforeAll(async () => {
  const { MongoMemoryServer } = await import("mongodb-memory-server");
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await Ticket.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /tickets", () => {
  it("should retrieve all tickets sorted by deadline in descending order", async () => {
    await Ticket.create([
      {
        status: "open",
        issueMessage: "mock-issue-message",
        clientName: "IBM",
        deadline: new Date("2024-12-10"),
      },
      {
        status: "closed",
        issueMessage: "another-mock-message",
        clientName: "Microsoft",
        deadline: new Date("2024-12-11"),
      },
    ]);

    const res: any = await request(app).get("/tickets");
    console.log(res._body);

    expect(res.status).toBe(200);
    expect(res._body).toHaveLength(2);
    expect(res._body[0].clientName).toBe("Microsoft");
    expect(res._body[1].clientName).toBe("IBM");
  });
  describe("POST /tickets", () => {
    it("should create a new ticket", async () => {
      const newTicket = {
        issueMessage: "This is an issue message",
        clientName: "Inflight Dublin",
        status: "open",
        deadline: new Date("2024-12-15"),
      };

      const res: any = await request(app).post("/tickets").send(newTicket);
      console.log(res._body);

      expect(res.status).toBe(201);
      expect(res._body.clientName).toBe(newTicket.clientName);
      expect(res._body.issueMessage).toBe(newTicket.issueMessage);
      expect(res._body.status).toBe(newTicket.status);
      expect(res._body.deadline).toBe(newTicket.deadline.toISOString());
    });

    it("should return a 400 error if required fields are missing", async () => {
      const res: any = await request(app).post("/tickets").send({});

      expect(res.status).toBe(400);
      expect(res._body.message).toBe("Error creating ticket");
    });
  });

  describe("PUT /tickets/:id", () => {
    it("should update an existing ticket", async () => {
      const ticket = await Ticket.create({
        issueMessage: "This is an issue message",
        clientName: "Inflight Dublin",
        status: "open",
        deadline: new Date("2024-12-15"),
      });

      const updatedData = {
        issueMessage: "Updated Ticket",
        status: "closed",
      };

      const res: any = await request(app)
        .put(`/tickets/${ticket._id}`)
        .send(updatedData);

      expect(res.status).toBe(200);
      expect(res._body.issueMessage).toBe(updatedData.issueMessage);
      expect(res._body.status).toBe(updatedData.status);
    });

    it("should return a 404 error if the ticket is not found", async () => {
      const nonExistentId = new mongoose.Types.ObjectId();
      const res = await request(app).put(`/tickets/${nonExistentId}`).send({});

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Ticket not found");
    });

    it("should return a 400 error if the update data is invalid", async () => {
      const ticket = await Ticket.create({
        issueMessage: "This is an issue message",
        clientName: "Inflight Dublin",
        status: "open",
        deadline: new Date("2024-12-15"),
      });

      const res: any = await request(app)
        .put(`/tickets/${ticket._id}`)
        .send({ status: "pol" });
      expect(res.status).toBe(400);
      expect(res._body.message).toBe("Error updating ticket");
    });
  });
});
