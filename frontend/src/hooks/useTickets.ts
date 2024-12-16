import { useState, useCallback, useEffect } from "react";
import { Ticket } from "../types/ticket";
import {
  createTicket,
  updateTicketStatus,
  fetchTickets,
  fetchReport,
} from "../../api/tickets";

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTickets = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchTickets();
      setTickets(data);
      setError(null);
    } catch (err) {
      setError("Failed to load tickets");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTicket = useCallback(async (ticketData: Omit<Ticket, "_id">) => {
    setIsLoading(true);
    try {
      const newTicket = await createTicket(ticketData);
      setTickets((prev) => [...prev, newTicket]);
      setError(null);
      return newTicket;
    } catch (err) {
      setError("Failed to create ticket");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateStatus = useCallback(
    async (ticketId: string, status: "open" | "closed", message: string) => {
      console.log("harpreet ticketid update", ticketId);
      setIsLoading(true);
      try {
        const updatedTicket = await updateTicketStatus(
          ticketId,
          status,
          message
        );
        setTickets((prev) =>
          prev.map((ticket: any) =>
            ticket._id === ticketId ? updatedTicket : ticket
          )
        );
        setError(null);
      } catch (err) {
        setError("Failed to update ticket status");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );
  // Function to download the report
  const downloadReport = useCallback(async () => {
    setIsLoading(true);
    try {
      await fetchReport();
      setError(null);
    } catch (err) {
      setError("Failed to download the report");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  return {
    tickets,
    isLoading,
    error,
    addTicket,
    updateStatus,
    downloadReport,
    refreshTickets: loadTickets,
  };
};
