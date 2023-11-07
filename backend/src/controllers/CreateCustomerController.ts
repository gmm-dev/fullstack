import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";

class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {name, cpf, ticket, email, phone, pixKey} = request.body as { name: string, cpf: string, ticket: number[], email?: string, phone?: string, pixKey?:string};
    const customerService = new CreateCustomerService();
    const customer = await customerService.execute({name, cpf, ticket, email, phone, pixKey});
    return reply.send(customer);
  }
}

export { CreateCustomerController };
