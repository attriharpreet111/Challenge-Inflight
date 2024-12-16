import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { addDays } from "date-fns";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    padding: theme.spacing(2),
  },
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

interface CreateTicketDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (ticket: {
    clientName: string;
    issueMessage: string;
    deadline: Date;
    status: string;
  }) => void;
}

export const CreateTicketDialog: React.FC<CreateTicketDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [clientName, setClientName] = useState("");
  const [issueMessage, setIssueMessage] = useState("");
  const [deadline, setDeadline] = useState(
    addDays(new Date(), 2).toISOString().split("T")[0]
  );
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    onSubmit({
      clientName,
      issueMessage,
      deadline: new Date(deadline),
      status,
    });
    setClientName("");
    setIssueMessage("");
    setDeadline(addDays(new Date(), 2).toISOString().split("T")[0]);
    setStatus("");
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Ticket</DialogTitle>
      <DialogContent>
        <FormField
          fullWidth
          label="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value.toUpperCase())}
        />
        <FormField
          fullWidth
          label="Issue Message"
          multiline
          rows={3}
          value={issueMessage}
          onChange={(e) => setIssueMessage(e.target.value)}
        />
        <FormField
          fullWidth
          type="date"
          label="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!clientName || !issueMessage}
          sx={{
            backgroundColor: "#1890FF",
            "&:hover": {
              backgroundColor: "#40A9FF",
            },
          }}
        >
          Create Ticket
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};
