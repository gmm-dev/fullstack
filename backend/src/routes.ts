import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';
import { CreateCustomerController } from './controllers/CreateCustomerController';
import { DeleteCustomerController } from './controllers/DeleteCustomerController';
import { ListCustomersControlller } from './controllers/ListCustoemrsController';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/test", async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: "test" }
  })

  fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateCustomerController().handle(request, reply);
  })

  fastify.get("/customers", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListCustomersControlller().handle(request, reply);
  })

  fastify.delete("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
    return new DeleteCustomerController().handle(request, reply);
  })
}
