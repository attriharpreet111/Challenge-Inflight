import React, { useState } from "react";
import { Switch, TextField } from "@mui/material";
import { format } from "date-fns";
import { Ticket } from "../../types/ticket";
import { StatusIcon } from "../comman/StatusIcon";
import {
  StyledListItem,
  TopRow,
  TicketNumber,
  ClientName,
  DateBox,
  MessageBox,
  ControlsBox,
} from "./styles";

interface TicketItemProps {
  ticket: Ticket;
  onStatusChange: (ticketId: string, message: string) => void;
  index: number;
}

export const TicketItem: React.FC<TicketItemProps> = ({
  ticket,
  onStatusChange,
  index,
}) => {
  const [message, setMessage] = useState(ticket.issueMessage);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <StyledListItem>
      <TopRow>
        <TicketNumber>{index + 1}.</TicketNumber>
        <ClientName>{ticket.clientName}</ClientName>
        <DateBox>{format(ticket.deadline, "dd/MM/yyyy")}</DateBox>
        <ControlsBox>
          <Switch
            checked={ticket.status === "closed"}
            onChange={() => onStatusChange(ticket._id, message)}
            size="small"
            sx={{
              "& .MuiSwitch-track": {
                backgroundColor: "#bcf5ef",
              },
              "& .MuiSwitch-thumb": {
                backgroundColor:
                  ticket.status === "closed" ? "#999" : "#1ac4b6",
              },
            }}
          />
          <StatusIcon ticket={ticket} />
        </ControlsBox>
      </TopRow>
      <MessageBox>
        <TextField
          fullWidth
          variant="standard"
          value={message}
          onChange={handleMessageChange}
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: "14px",
              color: "#666",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.02)",
              },
            },
          }}
          sx={{
            "& .MuiInputBase-root": {
              padding: 0,
            },
          }}
        />
      </MessageBox>
    </StyledListItem>
  );
};
