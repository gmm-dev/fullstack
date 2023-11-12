import prismaClient from "../prisma";
import { ticketNumbers } from './CreateCustomerService';

class GetWinnersService {
  async filterByTickets(tickets: ticketNumbers) {
    return await prismaClient.customer.findMany({
      where: {
        ticket: {
          hasSome: tickets,
        },
      },
    });
  }
}

export { GetWinnersService };
