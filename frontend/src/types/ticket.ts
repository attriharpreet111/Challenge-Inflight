export interface Ticket {
  _id: string;
  clientName: string;
  issueMessage: string;
  deadline: Date;
  status?: string;
}