import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import TicketList from "./components/TicketList/TicketList";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "#F5F5F5",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <TicketList />
      </Box>
    </ThemeProvider>
  );
}

export default App;
