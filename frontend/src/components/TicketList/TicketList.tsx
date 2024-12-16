import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { generateRandomTicket } from "../../utils/ticketUtils";
import { TicketItem } from "../TicketItem/TicketItem";
import { TimelineHeader } from "../Timeline/TimelineHeader";
import { useTickets } from "../../hooks/useTickets";
import { useDebounce } from "../../hooks/useDebounce";
import { CreateTicketDialog } from "../comman/CreateTicketDialog";
import {
  StyledPaper,
  ButtonContainer,
  StyledList,
  ContentContainer,
  PrimaryButton,
  SecondaryButton,
  ReportButton,
} from "./styles";

export const TicketList: React.FC = () => {
  const {
    tickets,
    isLoading,
    error,
    addTicket,
    updateStatus,
    refreshTickets,
    downloadReport,
  } = useTickets();
  console.log("three", tickets, isLoading, error);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const debouncedGenerateTicket = useDebounce(async () => {
    try {
      const randomTicket = generateRandomTicket();
      const { clientName, issueMessage, deadline, status } = randomTicket;
      await addTicket({
        clientName,
        issueMessage,
        deadline,
        status,
      });

      await refreshTickets();
    } catch (error) {
      console.error("Failed to create random ticket:", error);
    } finally {
      setIsGenerating(false);
    }
  }, 500);

  const handleGenerateTicket = () => {
    setIsGenerating(true);
    debouncedGenerateTicket();
  };

  const handleStatusChange = async (ticketId: string, message: string) => {
    const ticket = tickets.find((t: any) => t._id === ticketId);
    if (!ticket) return;

    const newStatus = ticket.status === "open" ? "closed" : "open";
    try {
      await updateStatus(ticketId, newStatus, message);
      refreshTickets();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleCreateTicket = async (newTicket: {
    clientName: string;
    issueMessage: string;
    deadline: Date;
  }) => {
    try {
      await addTicket({
        ...newTicket,
        status: "open",
      });
      await refreshTickets();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to create ticket:", error);
    }
  };
  const handleDownloadReport = async () => {
    try {
      await downloadReport(); // Use the updated fetchReport function
      alert("Report downloaded successfully!");
    } catch (error) {
      console.error("Failed to download report:", error);
    }
  };

  return (
    <StyledPaper>
      <ContentContainer>
        <TimelineHeader />
        <StyledList>
          {tickets.map((ticket, index) => (
            <TicketItem
              key={ticket._id}
              ticket={ticket}
              onStatusChange={handleStatusChange}
              index={index}
            />
          ))}
        </StyledList>
      </ContentContainer>

      <ButtonContainer>
        <PrimaryButton
          variant="contained"
          onClick={handleGenerateTicket}
          disabled={isGenerating}
        >
          Create Randomly
        </PrimaryButton>
        <SecondaryButton
          variant="contained"
          onClick={() => setIsDialogOpen(true)}
          disabled={isGenerating}
        >
          Create New
        </SecondaryButton>
        <ReportButton
          variant="contained"
          onClick={handleDownloadReport}
          disabled={isGenerating}
        >
          Download Report
        </ReportButton>
      </ButtonContainer>

      <CreateTicketDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleCreateTicket}
      />

      <Snackbar open={!!error} autoHideDuration={6000}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </StyledPaper>
  );
};

export default TicketList;
