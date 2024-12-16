import mongoose from "mongoose";
import { Ticket } from "./Ticket";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: any;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Ticket Model", () => {
  it("should create a ticket with valid data", async () => {
    const ticketData = {
      clientName: "mockClientName",
      issueMessage: "System crash on login",
      deadline: new Date("2024-12-15"),
    };

    const ticket = await Ticket.create(ticketData);

    expect(ticket.clientName).toBe(ticketData.clientName);
    expect(ticket.issueMessage).toBe(ticketData.issueMessage);
    expect(ticket.deadline).toBe(ticketData.deadline);
    expect(ticket.status).toBe("open"); // Default value
    expect(ticket).toHaveProperty("createdAt");
    expect(ticket).toHaveProperty("updatedAt");
  });

  it("should validate required fields", async () => {
    const ticketData = {
      clientName: "",
      issueMessage: "System crash on login",
      deadline: new Date("2024-12-15"),
    };

    try {
      await Ticket.create(ticketData);
    } catch (error: any) {
      expect(error.errors.clientName).toBeDefined();
    }
  });

  it('should set default status to "open"', async () => {
    const ticketData = {
      clientName: "inflight dublin",
      issueMessage: "Unable to connect to server",
      deadline: new Date("2024-12-20"),
    };

    const ticket = await Ticket.create(ticketData);
    expect(ticket.status).toBe("open");
  });

  it('should change status to "closed"', async () => {
    const ticketData = {
      clientName: "inflight dublin",
      issueMessage: "Bug on registration page",
      deadline: new Date("2024-12-18"),
    };

    const ticket = await Ticket.create(ticketData);
    ticket.status = "closed";
    await ticket.save();

    expect(ticket.status).toBe("closed");
  });

  it("should enforce correct enum values for status", async () => {
    const ticketData = {
      clientName: "inflight dublin",
      issueMessage: "Issue with payment gateway",
      deadline: new Date("2024-12-22"),
    };

    const ticket: any = await Ticket.create(ticketData);

    ticket.status = "invalid";
    try {
      await ticket.save();
    } catch (error: any) {
      expect(error.errors.status).toBeDefined();
    }
  });
});
