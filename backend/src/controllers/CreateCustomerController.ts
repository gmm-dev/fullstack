import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";

class createCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {name, email} = request.body as { name: string, email: string };
    console.log(name, email);
    const customerService = new CreateCustomerService();
    const customer = await customerService.execute();
    return reply.status(201).send(customer);
  }
}

export { createCustomerController };
