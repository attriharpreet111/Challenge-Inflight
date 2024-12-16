import { Paper, Box, List } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#fff",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  minHeight: "90vh",
  maxWidth: "1200px",
  margin: "20px auto",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  position: "relative",
}));

export const TimelineIcon = styled("div")({
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  backgroundColor: "#E3F2FD",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": {
    color: "#1976D2",
    width: "24px",
    height: "24px",
  },
});

export const ButtonContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  display: "flex",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: "8px",
}));

export const StyledList = styled(List)({
  padding: "16px 0",
  width: "100%",
  maxWidth: "800px",
  marginBottom: "80px",
});

export const HeaderContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginBottom: "24px",
  maxWidth: "800px",
  width: "100%",
  paddingLeft: "24px",
});

export const ContentContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  paddingLeft: "24px",
});

export const PrimaryButton = styled(Button)({
  backgroundColor: "#1890FF",
  "&:hover": {
    backgroundColor: "#40A9FF",
  },
});

export const SecondaryButton = styled(Button)({
  backgroundColor: "#1890FF",
  "&:hover": {
    backgroundColor: "#40A9FF",
  },
});
export const ReportButton = styled(Button)({
  backgroundColor: "#1890FF",
  "&:hover": {
    backgroundColor: "#40A9FF",
  },
});
