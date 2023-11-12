import { FastifyReply, FastifyRequest } from 'fastify';
import { ticketNumbers } from '../services/CreateCustomerService';
import { FilterCustomersService } from '../services/FilterCustomersService';

class FilterCustomersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { ticket } = request.query as { ticket: ticketNumbers };

    const filterCustomersService = new FilterCustomersService();

    const customers = await filterCustomersService.filterByTickets([ticket]);

    return reply.send(customers);
  }
}

export { FilterCustomersController };
