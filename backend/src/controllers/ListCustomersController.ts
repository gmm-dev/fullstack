import { FastifyReply, FastifyRequest } from "fastify";
import { ListCustomersService } from "../services/ListCustomersService";

class ListCustomersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listCustomersService = new ListCustomersService();
    //espera o retorno da consulta do banco de dados e armazena na variável customers para depois retornar
    const customers = await listCustomersService.execute();

    return reply.send(customers);
  }
}

export { ListCustomersController };
