import prismaClient from "../prisma";
import { ticketNumbers } from './CreateCustomerService';

class FilterCustomersService {
  async filterByTickets(tickets: ticketNumbers[]) {
    return await prismaClient.customer.findMany({
      where: {
        ticket: {
          hasSome: tickets.map(String),
        },
      },
    });
  }
}

export { FilterCustomersService };
