import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/test", async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: "test" }
  })
}
