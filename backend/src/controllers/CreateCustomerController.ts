import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";

class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {name, cpf, ticket} = request.body as { name: string, cpf: string, ticket: number[]};
    console.log(name, cpf, ticket);
    const customerService = new CreateCustomerService();
    const customer = await customerService.execute({name, cpf, ticket});
    return reply.send(customer);
  }
}

export { CreateCustomerController };
