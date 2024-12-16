import React from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeaderContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginBottom: "24px",
  maxWidth: "800px",
  width: "100%",
});

const IconWrapper = styled("div")({
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  border: "1px solid rgb(186, 217, 240)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const TimelineHeader: React.FC = () => (
  <HeaderContainer>
    <IconWrapper>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_6069_104739)">
          <path
            d="M12.2865 21.875H5.20833C4.6558 21.875 4.12589 21.6555 3.73519 21.2648C3.34449 20.8741 3.125 20.3442 3.125 19.7917V7.29168C3.125 6.73914 3.34449 6.20924 3.73519 5.81854C4.12589 5.42784 4.6558 5.20834 5.20833 5.20834H17.7083C18.2609 5.20834 18.7908 5.42784 19.1815 5.81854C19.5722 6.20924 19.7917 6.73914 19.7917 7.29168V11.4583"
            stroke="#1D476F"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.7497 22.9167C21.0509 22.9167 22.9163 21.0512 22.9163 18.75C22.9163 16.4488 21.0509 14.5833 18.7497 14.5833C16.4485 14.5833 14.583 16.4488 14.583 18.75C14.583 21.0512 16.4485 22.9167 18.7497 22.9167Z"
            stroke="#1D476F"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.625 3.125V7.29167"
            stroke="#1D476F"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.29199 3.125V7.29167"
            stroke="#1D476F"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.125 11.4583H19.7917"
            stroke="#1D476F"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.75 17.1833V18.75L19.7917 19.7916"
            stroke="#1D476F"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_6069_104739">
            <rect width="25" height="25" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </IconWrapper>
    <Typography variant="h6" sx={{ fontWeight: 500 }}>
      Timeline
    </Typography>
  </HeaderContainer>
);
