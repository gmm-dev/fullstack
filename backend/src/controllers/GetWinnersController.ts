import { FastifyReply, FastifyRequest } from 'fastify';
import { ticketNumbers } from '../services/CreateCustomerService';
import { GetWinnersService } from '../services/GetWinnersService';

class GetWinnersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    let { chosenNumbers } = request.body as { chosenNumbers: ticketNumbers };

    const getWinnersService = new GetWinnersService();

    const customers = await getWinnersService.filterByTicketNumbers(chosenNumbers);



    return reply.send(customers);
  }
}

export { GetWinnersController };
