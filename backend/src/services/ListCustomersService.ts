import prismaClient from "../prisma";

class ListCustomersService {
  async execute() {
    //busca todos clientes
    const customers = await prismaClient.customer.findMany();

    return customers;
  }
}

export { ListCustomersService };
