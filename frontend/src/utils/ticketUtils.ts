import { addDays, subDays } from "date-fns";
import { Ticket } from "../types/ticket";

const CLIENT_NAMES = [
  "APPLE",
  "GOOGLE",
  "MICROSOFT",
  "AMAZON",
  "META",
  "NETFLIX",
  "TESLA",
];
const ISSUE_MESSAGES = [
  "Server downtime reported",
  "Database connection error",
  "UI bug in dashboard",
  "Performance issues",
  "Security vulnerability",
  "API integration failure",
  "Data synchronization problem",
];

export const generateRandomTicket = (): Ticket => {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * 5) - 2; // -2 to +2 days

  return {
    _id: Math.random().toString(36).slice(2, 11),
    clientName: CLIENT_NAMES[Math.floor(Math.random() * CLIENT_NAMES.length)],
    issueMessage:
      ISSUE_MESSAGES[Math.floor(Math.random() * ISSUE_MESSAGES.length)],
    deadline:
      randomDays >= 0
        ? addDays(now, randomDays)
        : subDays(now, Math.abs(randomDays)),
    status: "open",
  };
};
