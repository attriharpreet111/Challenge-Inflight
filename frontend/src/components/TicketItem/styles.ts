import { Box, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1.5),
  backgroundColor: 'rgb(186, 217, 240)',
  borderRadius: '12px',
  marginBottom: theme.spacing(1.5),
  border: '1px solid rgba(186, 231, 255, 0.3)',
  '&:hover': {
    backgroundColor: 'rgb(186, 217, 240)',
  },
  width: '100%',
  maxWidth: '500px',
}));

export const TopRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '10px minmax(5px, 10px) 1fr 100px',
  gap: '8px',
  width: '100%',
  alignItems: 'center',
});

export const TicketNumber = styled(Box)({
  color: '#666',
  fontWeight: 500,
  fontSize: '14px',
});

export const ClientName = styled(Box)({
  fontWeight: 500,
  fontSize: '14px',
  color: 'black',
});

export const DateBox = styled(Box)({
  color: 'black',
  fontSize: '14px',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  justifySelf: 'center',
  gridColumn: '3',
  
});

export const ControlsBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  justifySelf: 'end',
  gridColumn: '4',
});

export const MessageBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginLeft: '-25px',
  width: 'calc(100% - 30px)',
  height:'4rem',
  backgroundColor: 'white',
  padding: theme.spacing(1),
  borderRadius: '8px',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
}));