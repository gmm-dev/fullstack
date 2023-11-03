import fastify from "fastify";
import { ListCustomersService } from "../services/ListCustomersService";

class ListCustomersControlller {
  async handle(request: fastify.FastifyRequest, reply: fastify.FastifyReply) {
    const listCustomersService = new ListCustomersService();
    //espera o retorno da consulta do banco de dados e armazena na variavel customers para depois retornar
    const customers = await listCustomersService.execute();

    return reply.send(customers);
  }
}

export { ListCustomersControlller }
