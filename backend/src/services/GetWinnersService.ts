import prismaClient from "../prisma";
import { ticketNumbers } from './CreateCustomerService';

class GetWinnersService {
  async filterByTicketNumbers(tickets: ticketNumbers) {
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
