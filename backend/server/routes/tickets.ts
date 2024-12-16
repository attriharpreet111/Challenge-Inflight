import express from "express";
import { Ticket } from "../models/Ticket";
import XLSX from "xlsx";

const router = express.Router();

// GET /tickets - Retrieve all tickets sorted by deadline desc
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ deadline: -1 }).exec();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
});

// POST /tickets - Create a new ticket
router.post("/", async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: "Error creating ticket" });
  }
});

// PUT /tickets/:id - Update a ticket
router.put("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: "Error updating ticket" });
  }
});

// GET /report - Generate and download XLSX report of tickets
router.get("/report", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    console.log("🚀 ~ tickets :", tickets);

    const data = tickets
      .sort(
        (a, b) =>
          new Date(b.deadline).getTime() - new Date(a.deadline).getTime()
      )
      .map((ticket) => ({
        Client: ticket.clientName,
        Issue: ticket.issueMessage,
        Deadline: new Date(ticket.deadline).toLocaleDateString(),
        Status: ticket.status,
      }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets Report");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="tickets_report.xlsx"'
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ message: "Error generating report" });
  }
});
export default router;
