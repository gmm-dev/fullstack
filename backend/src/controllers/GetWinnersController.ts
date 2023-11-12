import { FastifyReply, FastifyRequest } from 'fastify';
import { ticketNumbers } from '../services/CreateCustomerService';
import { GetWinnersService } from '../services/GetWinnersService';

class GetWinnersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    let { chosenNumbers } = request.body as { chosenNumbers: ticketNumbers };

    chosenNumbers = chosenNumbers.map(ticket => ticket.replace(/[^0-9]/g, ''));

    const getWinnersService = new GetWinnersService();

    const customers = await getWinnersService.filterByTickets(chosenNumbers);



    return reply.send(customers);
  }
}

export { GetWinnersController };
