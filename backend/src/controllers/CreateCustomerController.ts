import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCustomerProps, CreateCustomerService } from "../services/CreateCustomerService";

class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as CreateCustomerProps;
    const createCustomerService = new CreateCustomerService();
    try {
      const customer = await createCustomerService.execute(data);
      return reply.send(customer);
    } catch (error) {
      return reply.send(error);
    }
  }
}

export { CreateCustomerController };
