import { Ticket } from "../src/types/ticket";

const API_URL = "http://localhost:3000";

export const createTicket = async (
  ticketData: Omit<Ticket, "_id">
): Promise<Ticket> => {
  const response = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    throw new Error("Failed to create ticket");
  }

  return response.json();
};

export const updateTicketStatus = async (
  ticketId: string,
  status: "open" | "closed",
  message: string
): Promise<Ticket> => {
  const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status, issueMessage: message }),
  });

  if (!response.ok) {
    throw new Error("Failed to update ticket status");
  }

  return response.json();
};

export const fetchTickets = async (): Promise<Ticket[]> => {
  const response = await fetch(`${API_URL}/tickets`);

  if (!response.ok) {
    throw new Error("Failed to fetch tickets");
  }

  return response.json();
};

export const fetchReport = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/tickets/report`);

    if (!response.ok) {
      throw new Error("Failed to fetch the report");
    }

    // Convert the response into a Blob
    const blob = await response.blob();

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = "tickets_report.xlsx"; // File name for download

    // Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up: remove the link and revoke the Blob URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download the report:", error);
  }
};
