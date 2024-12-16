import React from "react";
import { Ticket } from "../../types/ticket";

interface StatusIconProps {
  ticket: Ticket;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ ticket }) => {
  console.log("StatusIcon ticket", ticket);
  const iconSize = 20;

  if (ticket.status === "closed") {
    return (
      <svg
        width="31"
        height="31"
        viewBox="0 0 31 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="15.5"
          cy="15.5"
          r="11.9167"
          stroke="#00C853"
          stroke-width="2"
        />
        <circle cx="15.5" cy="15.5" r="6.45833" fill="#00C853" />
      </svg>
    );
  }
  return new Date() < new Date(ticket.deadline) ? (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15.5"
        cy="15.5"
        r="11.9167"
        stroke="#FFC107"
        stroke-width="2"
      />
      <circle cx="15.5" cy="15.5" r="6.45833" fill="#FFC107" />
    </svg>
  ) : (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="15.5"
        cy="15.5"
        r="11.9167"
        stroke="#D84315"
        stroke-width="2"
      />
      <circle cx="15.5" cy="15.5" r="6.45833" fill="#D84315" />
    </svg>
  );
};
