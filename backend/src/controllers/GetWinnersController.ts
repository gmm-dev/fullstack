import { FastifyReply, FastifyRequest } from 'fastify';
import { ticketNumbers } from '../services/CreateCustomerService';
import { GetWinnersService } from '../services/GetWinnersService';

class GetWinnersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { customerNumbers } = request.body as { customerNumbers: ticketNumbers };

    const getWinnersService = new GetWinnersService();

    const customers = await getWinnersService.filterByTickets(customerNumbers);

    return reply.send(customers);
  }
}

export { GetWinnersController };
